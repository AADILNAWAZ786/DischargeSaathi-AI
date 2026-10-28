# DischargeSaathi AI

**AI-assisted patient discharge explanation prototype powered by local Ollama.** Requires Python 3.10 or later and an installed/running Ollama model. The app takes a fictional or properly de-identified discharge note and drafts a plain-language guide, highlights source text, lists details to clarify, and creates questions for the care team.

> **Important:** This is an assessment prototype, not a medical device or clinical service. It must not be used to make real care decisions. It does not diagnose, prescribe, recommend treatment, or replace a qualified healthcare professional. Use only fictional or properly de-identified data. Any hypothetical output must be reviewed by a qualified clinician before real-world use.

## What it demonstrates

- A web UI for entering source text and selecting a language and local Ollama model.
- Local model discovery through Ollama's `GET /api/tags` endpoint.
- AI generation through Ollama's `POST /api/chat` endpoint, with a JSON schema in `format`.
- Prompt engineering that instructs the model to quote the input source and flag gaps rather than guess.
- Server-side source-quote checks that remove output items whose quoted source text does not match the input.
- Clearly labelled clinician-review warnings, a fictional demo note, print output, and JSON export.
- Automated tests for quote validation and invalid AI response structures.

## Architecture

```text
Browser (HTML/CSS/JS)
    |  POST /api/analyze
    v
FastAPI backend (Python)
    |  POST http://localhost:11434/api/chat
    v
Ollama local model
    |
    v
Structured JSON -> server-side quote checks -> patient guide draft
```

The browser communicates with the local FastAPI backend. The backend communicates with the Ollama server on the same computer. The app does not persist the entered note or generated result in a database or file. Local processing lowers the need to transmit data to a cloud model, but does not itself guarantee privacy or clinical correctness. Keep identifiable health data out of this prototype.

## Windows setup

### 1. Check Ollama

Open PowerShell:

```powershell
ollama --version
ollama list
```

Make sure the Ollama desktop app/server is running. The app expects the local API at `http://localhost:11434` by default.

If `ollama list` does not show a model, install one appropriate for your computer first. For example, `ollama pull llama3.2` is one possible choice, but model size and quality vary by machine. Use a model already installed on your system if you have one. Do not assume every model has equal instruction-following or structured-output capability.

### 2. Run DischargeSaathi AI

Extract the project folder and run:

```powershell
cd dischargesathi_ai
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Alternatively, double-click `run_windows.bat`. It creates a virtual environment if needed, installs dependencies, and starts the app.

### 3. Open the web app

Visit **http://127.0.0.1:8000** in your browser. Click **Load fictional sample**, verify that a local model is selected at the top, and click **Generate patient guide**. On a first model load, generation can take some time. You can change the language before generating.

To check the backend health in your browser, visit `http://127.0.0.1:8000/api/health`.

### 4. Configure a model or server URL (optional)

The app discovers installed models via `ollama list` API output. It will select `OLLAMA_MODEL` if that value matches an installed model, otherwise the first reported model.

PowerShell example for the current terminal session:

```powershell
$env:OLLAMA_MODEL="your-installed-model-name"
$env:OLLAMA_BASE_URL="http://localhost:11434"
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Use the exact name shown by `ollama list`. Alternatively, use the model dropdown in the UI.

## Run automated tests

```powershell
pytest -q
```

The tests cover conservative quote matching and removal of output entries whose quoted text cannot be found in the original source. They do **not** establish medical accuracy, language quality, or safety for real patients.

## Demo flow for a video

1. Open the app and show the local Ollama status and model selector.
2. Click **Load fictional sample**. Explain that the input is synthetic.
3. Generate the guide and walk through the plain-language summary, medication wording, next steps, warning signs, missing details, and questions for the care team.
4. Point out the review warning and the source text attached to each extracted item.
5. Show JSON export or print preview.
6. Explain that source-quote validation catches some unsupported excerpts but cannot prove that a paraphrase is accurate. Clinical review remains mandatory.

## Current limitations

- This is a prototype, not a validated patient-safety product.
- Quote checks validate that a source excerpt exists; they do not prove the adjacent explanation is faithful.
- Model output can vary by model, quantisation, context length, and Ollama version.
- Translations may be inaccurate and should not be relied on for care without qualified review.
- The prototype does not support hospital-system integrations, login, audit logs, encrypted persistence, or regulated clinical workflows.
- There is no OCR or PDF upload in this version. Paste synthetic text into the input field.

## Project files

- `app/main.py`: FastAPI endpoints, Ollama integration, prompt, JSON schema, and quote checks.
- `app/static/index.html`: page structure.
- `app/static/styles.css`: responsive UI styling.
- `app/static/app.js`: UI behaviour, model status, generation, print, and export.
- `tests/test_safety.py`: automated tests for quote checks.
- `PROMPT_DOCUMENTATION.md`: project brief, prompt iterations, and runtime prompts.
- `PRESENTATION_SCRIPT.md`: suggested narration for the assessment video.
- `run_windows.bat`: Windows setup and launch shortcut.

## Rebuilding the presentation (optional)

The presentation deck is included in this folder. To regenerate it from source, install Node.js, run `npm install`, then `npm run build:presentation`.

## Ollama API references

- [Ollama API introduction](https://github.com/ollama/ollama/blob/main/docs/api/introduction.mdx)
- [Ollama chat API and structured outputs](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [Ollama OpenAI compatibility](https://github.com/ollama/ollama/blob/main/docs/api/openai-compatibility.mdx)
