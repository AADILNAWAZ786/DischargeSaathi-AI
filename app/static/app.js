const SAMPLE_NOTE = `FICTIONAL DEMONSTRATION NOTE — NOT REAL PATIENT ADVICE

Reason for discharge: Recovery after a minor outpatient procedure.

Medication listed in this fictional example: DemoMed 10 mg; take 1 tablet at 9 AM daily for 3 days, as written in this sample note. This is a fictional medicine name and fictional instruction for software demonstration only.

Follow-up: Contact the clinic to confirm the review appointment date and time. Bring this discharge note to the appointment.

Care instructions: Follow the written care instructions provided by your healthcare team. The specific wound-care steps are not included in this sample note.

When to seek help: This sample note does not list specific warning signs. Ask the care team which symptoms need urgent attention and which contact number to use after hours.

Questions to clarify: Confirm the review appointment, who to contact outside clinic hours, and whether any additional written care instructions apply.`;

const $ = (id) => document.getElementById(id);
const state = { lastResponse: null, health: null };

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}

function setConnection(health) {
  state.health = health;
  const dot = $('status-dot');
  const available = Boolean(health.ollama_available && health.models?.length);
  dot.classList.toggle('ready', available);
  dot.classList.toggle('error', !available);
  $('connection-title').textContent = available ? 'Local AI is ready' : 'Local AI is not ready yet';
  $('connection-subtitle').textContent = health.message || '';
  $('sidebar-health').textContent = health.message || 'Check the local model server.';
  const select = $('model-select');
  select.innerHTML = '';
  if (health.models?.length) {
    health.models.forEach((model) => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      if (model === health.default_model) option.selected = true;
      select.appendChild(option);
    });
    select.disabled = false;
  } else {
    const option = document.createElement('option');
    option.textContent = 'No local model found';
    select.appendChild(option);
    select.disabled = true;
  }
}

async function refreshHealth() {
  $('refresh-models').disabled = true;
  try {
    const response = await fetch('/api/health');
    const health = await response.json();
    setConnection(health);
  } catch (error) {
    setConnection({ollama_available:false, models:[], message:'App server could not be reached. Refresh the page.'});
  } finally {
    $('refresh-models').disabled = false;
  }
}

function showView(view) {
  $('empty-state').classList.toggle('hidden', view !== 'empty');
  $('loading-state').classList.toggle('hidden', view !== 'loading');
  $('error-state').classList.toggle('hidden', view !== 'error');
  $('results-content').classList.toggle('hidden', view !== 'results');
}

function listSection(title, symbol, items, {quotes = true, plainOnly = false} = {}) {
  const body = items.length ? items.map((item) => {
    const line = typeof item === 'string' ? item : (item.plain_language || item.source_quote || '');
    const source = !plainOnly && typeof item === 'object' ? item.source_quote : '';
    return `<div class="result-item">${quotes && source ? `<div class="source-quote">Source: “${escapeHtml(source)}”</div>` : ''}<p class="result-explanation">${escapeHtml(line)}</p></div>`;
  }).join('') : '<p class="result-empty">No items identified in this section. Check the original note and ask the care team about anything unclear.</p>';
  return `<section class="result-section"><div class="result-section-head"><span>${symbol}</span><h4>${title}</h4><small class="result-count">${items.length} item${items.length === 1 ? '' : 's'}</small></div><div class="result-list">${body}</div></section>`;
}

function buildResults(data) {
  const result = data.result || {};
  const rejected = data.safety?.rejected_items || [];
  const reviewMessage = rejected.length
    ? `The source-quote check removed ${rejected.length} item(s) whose quoted text did not match the original note. Review the original note before relying on any output.`
    : 'Source quotes were checked against the original text. This check does not verify medical accuracy, so a qualified healthcare professional must review the draft.';
  const content = `
    <div class="review-alert"><span>⚠</span><div><b>Clinician review required before any real-world use</b>${escapeHtml(reviewMessage)}</div></div>
    <div class="results-toolbar"><span>Generated with ${escapeHtml(data.model)} · ${escapeHtml(data.language)}</span><div class="small-actions"><button type="button" id="download-json">↓ JSON</button><button type="button" id="print-guide">Print guide</button></div></div>
    ${listSection('Plain-language summary','✦',result.patient_friendly_summary || [])}
    ${listSection('Medication wording from the source','＋',result.medication_instructions || [],{quotes:false})}
    ${listSection('Next steps','✓',result.next_steps || [])}
    ${listSection('Warning signs stated in the note','!',result.warning_signs || [])}
    <section class="result-section"><div class="result-section-head"><span>?</span><h4>Details to clarify</h4><small class="result-count">${(result.unclear_or_missing||[]).length}</small></div><ul class="plain-items">${(result.unclear_or_missing||[]).length ? result.unclear_or_missing.map(x=>`<li>${escapeHtml(x)}</li>`).join('') : '<li>No gaps identified by the model. This does not mean the source note is complete.</li>'}</ul></section>
    <section class="result-section"><div class="result-section-head"><span>↗</span><h4>Questions for the care team</h4><small class="result-count">${(result.questions_for_care_team||[]).length}</small></div><ul class="plain-items">${(result.questions_for_care_team||[]).length ? result.questions_for_care_team.map(x=>`<li>${escapeHtml(x)}</li>`).join('') : '<li>Ask your care team to clarify anything you do not understand.</li>'}</ul></section>
    <div class="validation-note">${escapeHtml(data.safety?.data_storage || 'This demo does not save analysis results on the server.')} The app cannot guarantee clinical correctness.</div>
  `;
  $('results-content').innerHTML = content;
  $('download-json').addEventListener('click', () => downloadResult(data));
  $('print-guide').addEventListener('click', () => window.print());
}

async function generateGuide() {
  const text = $('discharge-text').value.trim();
  if (text.length < 80) {
    showError('Please enter at least 80 characters of fictional or de-identified discharge text.');
    return;
  }
  if (!$('confirm-demo').checked) {
    showError('Please confirm that you are using fictional or properly de-identified text and will not use the prototype for real patient care.');
    return;
  }
  if (!state.health?.ollama_available || !state.health?.models?.length) {
    showError('Ollama is not ready. Start Ollama, install a local model, then click the refresh button beside the model selector.');
    return;
  }
  showView('loading');
  $('generate-button').disabled = true;
  try {
    const response = await fetch('/api/analyze', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        discharge_text:text,
        language:$('language-select').value,
        model:$('model-select').value,
        demo_data_confirmed:$('confirm-demo').checked
      })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.detail || 'The request could not be completed.');
    state.lastResponse = payload;
    buildResults(payload);
    showView('results');
  } catch (error) {
    showError(error.message || 'An unexpected error occurred.');
  } finally {
    $('generate-button').disabled = false;
  }
}

function showError(message) {
  $('error-message').textContent = message;
  showView('error');
}

function downloadResult(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'dischargesaathi-patient-guide-draft.json';
  document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
}

$('load-sample').addEventListener('click', () => {
  $('discharge-text').value = SAMPLE_NOTE;
  $('char-count').textContent = `${SAMPLE_NOTE.length.toLocaleString()} / 20,000 characters`;
  $('confirm-demo').checked = true;
  $('discharge-text').focus();
});
$('discharge-text').addEventListener('input', () => {
  $('char-count').textContent = `${$('discharge-text').value.length.toLocaleString()} / 20,000 characters`;
});
$('generate-button').addEventListener('click', generateGuide);
$('refresh-models').addEventListener('click', refreshHealth);

refreshHealth();
