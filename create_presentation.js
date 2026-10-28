const pptxgen = require('pptxgenjs');
const path = require('path');
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'DischargeSaathi AI Project';
pptx.subject = 'Healthcare communication prototype using local Ollama';
pptx.title = 'DischargeSaathi AI';
pptx.company = 'Project Assessment';
pptx.lang = 'en-IN';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'en-IN'
};
pptx.defineSlideMaster({
  title: 'MASTER',
  background: { color: 'F5F8F6' },
  objects: [
    { line: { x: 0.55, y: 0.48, w: 0.34, h: 0, line: { color: '167D70', width: 2.4 } } },
    { text: { text: 'DISCHARGESAATHI AI  /  HEALTHCARE COMMUNICATION', options: { x: 1.00, y: 0.36, w: 5.7, h: 0.24, fontFace: 'Aptos', fontSize: 8, bold: true, color: '69847B', charSpacing: 1.2, margin: 0 } } },
    { line: { x: 0.55, y: 7.08, w: 12.22, h: 0, line: { color: 'DDE8E2', width: 0.8 } } },
    { text: { text: 'RESEARCH PROTOTYPE  ·  NOT FOR CLINICAL USE', options: { x: 0.57, y: 7.15, w: 6.0, h: 0.16, fontFace: 'Aptos', fontSize: 7, color: '8FA19A', charSpacing: 0.6, margin: 0 } } },
  ],
  slideNumber: { x: 12.23, y: 7.12, color: '8FA19A', fontFace: 'Aptos', fontSize: 8 }
});

const C = {
  ink: '203C3B', muted: '6F8580', soft: '93A49E', teal: '167D70', tealDark: '105F57',
  mint: 'DFF4ED', mint2: 'EFF8F3', white: 'FFFFFF', bg: 'F5F8F6', line: 'DFE9E3',
  lilac: 'EDEAFB', lilacDark: '8071C4', peach: 'F9EDDE', orange: 'C68A4C',
  navy: '173C38', pale: 'F9FCFA', red: 'B76D5B', warning: 'FFF7E7', warningLine: 'EFE1BF'
};
const W = 13.333, H = 7.5;
const Shape = pptx.ShapeType;

function tx(slide, text, x, y, w, h, opts={}) {
  slide.addText(text, {
    x,y,w,h, fontFace: opts.fontFace || 'Aptos', fontSize: opts.fontSize || 12,
    color: opts.color || C.ink, bold: opts.bold || false, italic: opts.italic || false,
    margin: opts.margin !== undefined ? opts.margin : 0,
    breakLine: false, fit: 'shrink', valign: opts.valign || 'mid',
    align: opts.align || 'left', paraSpaceAfterPt: opts.paraSpaceAfterPt || 0,
    charSpacing: opts.charSpacing || 0, transparency: opts.transparency || 0,
    isTextBox: true, ...(opts.extra || {})
  });
}
function rect(slide, x,y,w,h, fill, radius=0.14, line=C.line, lineWidth=0.8) {
  slide.addShape(Shape.roundRect, {x,y,w,h,rectRadius:radius,fill:{color:fill},line:{color:line,width:lineWidth},radius});
}
function simpleRect(slide,x,y,w,h,fill,line=fill,width=0){
  slide.addShape(Shape.rect,{x,y,w,h,fill:{color:fill},line:{color:line,width}});
}
function line(slide,x1,y1,x2,y2,color=C.line,width=1,dash){
  slide.addShape(Shape.line,{x:x1,y:y1,w:x2-x1,h:y2-y1,line:{color,width,dashType:dash}});
}
function pill(slide, text, x,y,w, fill=C.mint, color=C.tealDark, fs=8){
  slide.addShape(Shape.roundRect,{x,y,w,h:0.28,rectRadius:0.12,fill:{color:fill},line:{color:fill,width:0.5}});
  tx(slide,text,x+0.06,y+0.02,w-0.12,0.22,{fontSize:fs,color,bold:true,align:'center'});
}
function title(slide, eyebrow, headline, subtitle='') {
  tx(slide, eyebrow.toUpperCase(), 0.62, 0.87, 7.8, 0.22, {fontSize:8.5,bold:true,color:C.teal,charSpacing:1.4});
  tx(slide, headline, 0.62, 1.15, 12.0, 0.56, {fontFace:'Aptos Display',fontSize:27,bold:true,color:C.ink});
  if (subtitle) tx(slide, subtitle, 0.62, 1.77, 11.8, 0.36, {fontSize:11,color:C.muted});
}
function card(slide,x,y,w,h,head,body,accent=C.teal,number=null){
  rect(slide,x,y,w,h,C.white,0.14,C.line,0.8);
  simpleRect(slide,x,y,0.055,h,accent,accent,0);
  if(number) tx(slide,number,x+0.2,y+0.18,0.4,0.25,{fontSize:10,bold:true,color:accent});
  tx(slide,head,x+0.22,y+(number?0.50:0.23),w-0.42,0.28,{fontSize:13,bold:true,color:C.ink});
  tx(slide,body,x+0.22,y+(number?0.86:0.62),w-0.45,h-(number?1.02:0.75),{fontSize:10,color:C.muted,valign:'top',extra:{breakLine:false}});
}
function footerSource(slide, text) {
  tx(slide,text,0.62,6.78,11.9,0.18,{fontSize:7,color:'82958E',italic:true});
}

// Slide 1: Cover
{
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  simpleRect(s,0,0,W,H,C.navy,C.navy,0);
  // Decorative rings
  s.addShape(Shape.ellipse,{x:8.15,y:0.55,w:4.65,h:4.65,fill:{color:C.navy,transparency:100},line:{color:'2D645A',width:1.4}});
  s.addShape(Shape.ellipse,{x:8.65,y:1.05,w:3.65,h:3.65,fill:{color:C.navy,transparency:100},line:{color:'2D645A',width:1,dashType:'dash'}});
  pill(s,'HEALTHCARE + LOCAL AI',0.78,0.79,1.95,'25554D','DDF3E9',8);
  tx(s,'DischargeSaathi AI',0.78,1.55,7.1,0.72,{fontFace:'Aptos Display',fontSize:35,bold:true,color:C.white});
  tx(s,'Make the next step\neasier to understand.',0.78,2.35,6.9,1.35,{fontFace:'Aptos Display',fontSize:29,bold:true,color:'B8E9D5',valign:'top'});
  tx(s,'A local-first prototype that turns hospital discharge text into a clearer, source-aware patient guide.',0.81,4.00,5.95,0.75,{fontSize:15,color:'D5E4DF',valign:'top'});
  line(s,0.82,5.07,5.8,5.07,'3B6D62',1.2);
  tx(s,'AI-ASSISTED  ·  OLLAMA  ·  PYTHON + FASTAPI',0.82,5.31,5.9,0.25,{fontSize:9,bold:true,color:'A4C6BA',charSpacing:1.0});
  tx(s,'ASSESSMENT PROJECT  /  OCTOBER 2026',0.82,6.83,5.8,0.2,{fontSize:8,color:'91B1A6',charSpacing:0.8});
  // right mini web app mockup
  rect(s,7.55,1.2,4.65,4.75,'FFFFFF',0.18,'FFFFFF',0.4);
  simpleRect(s,7.55,1.2,4.65,0.48,'F8FBF9','F8FBF9',0);
  tx(s,'✳  discharge',7.78,1.35,1.7,0.18,{fontSize:10,bold:true,color:C.ink});
  pill(s,'LOCAL MODEL READY',10.25,1.33,1.47,'E0F4EA',C.tealDark,6.5);
  tx(s,'Patient guide studio',7.83,1.92,3.6,0.28,{fontSize:16,bold:true,color:C.ink});
  tx(s,'Fictional note  ·  English',7.83,2.23,3.1,0.2,{fontSize:8,color:C.muted});
  rect(s,7.82,2.63,1.88,2.55,'FAFCFB',0.08,'E1EAE5',0.6);
  tx(s,'SOURCE NOTE',7.97,2.79,1.35,0.18,{fontSize:7,bold:true,color:C.teal,charSpacing:0.5});
  for(let i=0;i<7;i++) simpleRect(s,7.97,3.16+i*0.23,1.45-(i%3)*0.17,0.045,'DCE8E2','DCE8E2',0);
  rect(s,9.91,2.63,2.02,2.55,'F9FCFA',0.08,'E1EAE5',0.6);
  tx(s,'PATIENT-FRIENDLY GUIDE',10.07,2.79,1.64,0.18,{fontSize:6.8,bold:true,color:C.teal,charSpacing:0.2});
  const mockRows=[['✓','Plain language','E4F4EC'],['＋','Medication quote','F2F0FC'],['↗','Next steps','FFF1E0']];
  mockRows.forEach((r,i)=>{
    rect(s,10.06,3.16+i*0.53,1.72,0.40,'FFFFFF',0.06,'E6EEE9',0.4);
    tx(s,r[0],10.14,3.25+i*0.53,0.18,0.13,{fontSize:8,bold:true,color:i===1?C.lilacDark:C.teal});
    tx(s,r[1],10.39,3.24+i*0.53,1.27,0.17,{fontSize:7.5,bold:true,color:C.ink});
  });
  rect(s,7.82,5.35,4.1,0.38,'FFF8E9',0.06,'F0E1BF',0.6);
  tx(s,'⚠  Draft only. Clinician review is required.',7.96,5.46,3.82,0.14,{fontSize:8,bold:true,color:'8C713A'});
  tx(s,'Problem: discharge information can be hard to understand.\nApproach: explain the source, never invent the care.',7.65,6.22,4.85,0.52,{fontSize:11,color:'D3E6DE',valign:'top'});
}

// Slide 2: problem and evidence
{
  const s = pptx.addSlide('MASTER');
  title(s,'01 / The healthcare problem','Discharge paperwork can leave patients with unanswered questions','Patients and caregivers may leave hospital with important instructions that are hard to recall, interpret, or act on.');
  rect(s,0.62,2.38,4.0,3.62,C.navy,0.18,C.navy,0.3);
  tx(s,'3%',0.95,2.82,3.1,1.0,{fontFace:'Aptos Display',fontSize:48,bold:true,color:'B8E9D5'});
  tx(s,'recalled receiving all four key areas of verbal discharge information',0.98,3.86,3.0,0.88,{fontSize:17,bold:true,color:C.white,valign:'top'});
  tx(s,'Study of chronic disease patients in three public hospitals in India.',0.98,5.18,3.1,0.47,{fontSize:10,color:'BCD4CB',valign:'top'});
  card(s,4.92,2.38,3.55,1.63,'31%','Only about 31% of discharge notes contained all key items examined, including diagnosis, medicine information, lifestyle advice and follow-up.',C.teal,'A');
  card(s,8.72,2.38,3.95,1.63,'25%','Researchers judged about one-quarter of patients or caregivers to have a good understanding of almost all important details.',C.lilacDark,'B');
  rect(s,4.92,4.28,7.75,1.72,'FFFFFF',0.14,'DFE9E3',0.8);
  tx(s,'Why it matters',5.18,4.52,2.2,0.28,{fontSize:14,bold:true,color:C.ink});
  tx(s,'Health literacy is not just reading. People need information they can understand, evaluate, and use. The aim is to improve clarity without changing the clinician’s instructions.',5.18,4.91,7.05,0.72,{fontSize:12,color:C.muted,valign:'top'});
  footerSource(s,'Sources: PLOS ONE / study of three public hospitals in India (2020); WHO Health Literacy fact sheet (22 Dec 2025).');
}

// Slide 3: solution
{
  const s = pptx.addSlide('MASTER');
  title(s,'02 / The proposed solution','A patient guide built from the existing discharge note','DischargeSaathi AI is a reading and organisation assistant, not a diagnostic chatbot.');
  const cards=[
    {x:0.62,w:2.92,icon:'▤',head:'Simplify the wording',body:'Explain what the source says in clearer, everyday language.',fill:'E3F4EC',accent:C.teal},
    {x:3.77,w:2.92,icon:'＋',head:'Keep medicine text exact',body:'Show medication instructions as quoted in the source, not rewritten doses.',fill:'ECE9FB',accent:C.lilacDark},
    {x:6.92,w:2.92,icon:'✓',head:'Organise next steps',body:'Separate stated follow-up actions and warning signs from other content.',fill:'FFF0DE',accent:C.orange},
    {x:10.07,w:2.60,icon:'?',head:'Expose what is missing',body:'Create questions for the care team instead of guessing.',fill:'E3F4EC',accent:C.teal}
  ];
  cards.forEach(c=>{
    rect(s,c.x,2.65,c.w,2.45,C.white,0.14,'DFE9E3',0.8);
    s.addShape(Shape.roundRect,{x:c.x+0.23,y:2.91,w:0.56,h:0.56,rectRadius:0.12,fill:{color:c.fill},line:{color:c.fill,width:0.2}});
    tx(s,c.icon,c.x+0.23,3.03,0.56,0.22,{fontSize:18,bold:true,color:c.accent,align:'center'});
    tx(s,c.head,c.x+0.23,3.73,c.w-0.45,0.48,{fontSize:13,bold:true,color:C.ink,valign:'top'});
    tx(s,c.body,c.x+0.23,4.29,c.w-0.48,0.57,{fontSize:10.5,color:C.muted,valign:'top'});
  });
  rect(s,0.62,5.45,12.05,0.72,'E8F4EE',0.1,'D9EAE1',0.5);
  tx(s,'Core rule',0.88,5.68,1.1,0.2,{fontSize:10,bold:true,color:C.teal});
  tx(s,'If the source does not say it, the AI should not invent it.',2.02,5.62,9.8,0.31,{fontSize:17,bold:true,color:C.tealDark});
  footerSource(s,'Prototype scope: fictional or properly de-identified text only, with clinician review required for any real-world use.');
}

// Slide 4: workflow
{
  const s = pptx.addSlide('MASTER');
  title(s,'03 / User journey','A short workflow with review built in','The flow starts from an existing note and ends with a draft that remains under human control.');
  const xs=[0.72,3.89,7.06,10.23];
  const heads=['Input source note','Local model','Quote validation','Patient guide draft'];
  const bodies=[
    'Paste fictional discharge text and choose the output language.',
    'Ollama structures the note using a source-only prompt and JSON schema.',
    'Python checks whether each required source quote exists in the original note.',
    'Show the draft, missing details, questions, export and review warning.'
  ];
  const icons=['▤','✦','✓','☷'];
  xs.forEach((x,i)=>{
    rect(s,x,2.8,2.35,2.2,C.white,0.13,'DFE9E3',0.8);
    s.addShape(Shape.ellipse,{x:x+0.76,y:3.08,w:0.8,h:0.8,fill:{color:i===1?C.lilac:(i===2?C.mint:C.mint2)},line:{color:i===1?'D8D0F6':'D8ECE2',width:0.5}});
    tx(s,icons[i],x+0.76,3.25,0.8,0.29,{fontSize:21,bold:true,color:i===1?C.lilacDark:C.teal,align:'center'});
    tx(s,heads[i],x+0.16,4.03,2.03,0.31,{fontSize:12,bold:true,color:C.ink,align:'center'});
    tx(s,bodies[i],x+0.20,4.43,1.95,0.42,{fontSize:9.5,color:C.muted,align:'center',valign:'top'});
    if(i<3){
      line(s,x+2.39,3.88,x+3.00,3.88,'91C6B1',1.8);
      tx(s,'›',x+2.58,3.67,0.3,0.35,{fontSize:21,bold:true,color:C.teal,align:'center'});
    }
  });
  rect(s,0.72,5.43,11.86,0.73,'FFF7E7',0.11,'EFE1BF',0.7);
  tx(s,'Human checkpoint',0.97,5.67,1.55,0.2,{fontSize:10,bold:true,color:'8A713C'});
  tx(s,'Source checks reduce unsupported quotes, but do not prove that the explanation is medically correct.',2.58,5.6,9.5,0.31,{fontSize:12,bold:true,color:'755E30'});
}

// Slide 5: web application screen concept
{
  const s = pptx.addSlide('MASTER');
  title(s,'04 / Web application design','One screen for the note, AI draft, and safety boundary','Designed for a guided demonstration rather than unrestricted medical chat.');
  // app browser frame
  rect(s,0.62,2.31,12.05,4.23,'FFFFFF',0.14,'DDE8E2',0.8);
  simpleRect(s,0.62,2.31,12.05,0.37,'F7FAF8','F7FAF8',0);
  ['E5A99E','E6C88A','9FD1B9'].forEach((c,i)=>s.addShape(Shape.ellipse,{x:0.82+i*0.16,y:2.44,w:0.08,h:0.08,fill:{color:c},line:{color:c,width:0.3}}));
  tx(s,'127.0.0.1:8000  /  Patient guide studio',1.45,2.42,4.4,0.15,{fontSize:7.5,color:C.muted});
  // inner sidebar and header
  simpleRect(s,0.63,2.68,1.55,3.86,'F8FBF9','F8FBF9',0);
  tx(s,'✳ discharge',0.83,2.87,1.22,0.21,{fontSize:10,bold:true,color:C.ink});
  line(s,0.8,3.22,2.0,3.22,'E0E9E4',0.5);
  rect(s,0.77,3.4,1.25,0.38,'E5F4ED',0.06,'E5F4ED',0.2);
  tx(s,'✦ Create guide',0.87,3.51,1.06,0.15,{fontSize:7.6,bold:true,color:C.tealDark});
  tx(s,'◷ How it works',0.87,3.98,1.15,0.15,{fontSize:7.4,color:C.muted});
  tx(s,'♡ Safety',0.87,4.34,1.15,0.15,{fontSize:7.4,color:C.muted});
  rect(s,0.77,5.52,1.25,0.73,'F0F8F4',0.06,'DFEBE4',0.5);
  tx(s,'● Local AI',0.89,5.65,1.0,0.16,{fontSize:7.5,bold:true,color:C.teal});
  tx(s,'Model status',0.89,5.89,1.0,0.12,{fontSize:6.7,color:C.muted});
  // right content header
  tx(s,'Make the next step easier to understand.',2.48,2.89,6.7,0.29,{fontSize:17,bold:true,color:C.ink});
  tx(s,'Paste a discharge note. Generate a source-aware patient guide.',2.5,3.2,6.8,0.18,{fontSize:8.3,color:C.muted});
  // left input
  rect(s,2.48,3.59,4.12,2.24,'FCFDFC',0.09,'E1EAE5',0.6);
  tx(s,'DISCHARGE SUMMARY',2.68,3.77,2.0,0.15,{fontSize:7,bold:true,color:C.teal,charSpacing:0.5});
  for(let i=0;i<6;i++) simpleRect(s,2.68,4.13+i*0.19,3.45-(i%3)*0.45,0.045,'DDE8E2','DDE8E2',0);
  rect(s,2.67,5.43,1.52,0.24,'167D70',0.05,'167D70',0.3);
  tx(s,'✦ Generate patient guide',2.74,5.49,1.38,0.12,{fontSize:6.5,bold:true,color:C.white,align:'center'});
  tx(s,'Fictional data confirmation required',4.35,5.47,1.85,0.16,{fontSize:6.2,color:C.muted});
  // result pane
  rect(s,6.82,3.59,5.47,2.24,'FFFFFF',0.09,'E1EAE5',0.6);
  tx(s,'PATIENT-FRIENDLY GUIDE',7.03,3.77,2.2,0.15,{fontSize:7,bold:true,color:C.teal,charSpacing:0.4});
  const rows=[['01','Plain-language summary'],['02','Medication wording from source'],['03','Next steps and follow-up'],['04','Details to clarify']];
  rows.forEach((r,i)=>{
    rect(s,7.03,4.08+i*0.34,4.98,0.27,i===3?'FFF8E9':'F8FBF9',0.05,i===3?'F0E1BF':'E7EFEA',0.4);
    tx(s,r[0],7.14,4.15+i*0.34,0.28,0.11,{fontSize:6.5,bold:true,color:i===3?'9A7D42':C.teal});
    tx(s,r[1],7.52,4.15+i*0.34,3.85,0.11,{fontSize:7.3,bold:true,color:C.ink});
  });
  rect(s,6.82,5.97,5.47,0.37,'FFF7E7',0.06,'EFE1BF',0.5);
  tx(s,'⚠ Draft only. Clinician review required. Quote checks do not prove medical accuracy.',6.97,6.08,5.1,0.14,{fontSize:7.3,bold:true,color:'826A34'});
}

// Slide 6: local architecture
{
  const s = pptx.addSlide('MASTER');
  title(s,'05 / Technical architecture','Ollama keeps the model call on the local machine','The project does not need a cloud AI key. The local Ollama service hosts the selected model.');
  // flow boxes
  const boxes=[
    {x:0.8,w:2.25,head:'Web UI',sub:'HTML · CSS · JavaScript',body:'Collects fictional text, language and model selection.',fill:'FFFFFF',accent:C.teal},
    {x:3.65,w:2.25,head:'FastAPI backend',sub:'Python · Pydantic',body:'Validates input, builds prompt, handles errors and returns JSON.',fill:'FFFFFF',accent:C.teal},
    {x:6.5,w:2.25,head:'Ollama API',sub:'localhost:11434',body:'Reads installed models and calls /api/chat with JSON schema.',fill:'F1EDFC',accent:C.lilacDark},
    {x:9.35,w:2.95,head:'Safety checks + output',sub:'Python deterministic validation',body:'Checks source quotes, removes unsupported excerpts, and marks clinical review required.',fill:'EAF6F0',accent:C.teal}
  ];
  boxes.forEach((b,i)=>{
    rect(s,b.x,2.63,b.w,2.0,b.fill,0.13,'DEE8E2',0.8);
    simpleRect(s,b.x,2.63,b.w,0.06,b.accent,b.accent,0);
    tx(s,b.head,b.x+0.18,2.91,b.w-0.36,0.27,{fontSize:13,bold:true,color:C.ink,align:'center'});
    tx(s,b.sub,b.x+0.16,3.29,b.w-0.32,0.2,{fontSize:8,bold:true,color:b.accent,align:'center'});
    tx(s,b.body,b.x+0.2,3.72,b.w-0.4,0.57,{fontSize:9.3,color:C.muted,align:'center',valign:'top'});
    if(i<3){line(s,b.x+b.w+0.08,3.58,boxes[i+1].x-0.12,3.58,'8AC7B2',1.9);tx(s,'›',b.x+b.w+0.30,3.38,0.3,0.28,{fontSize:21,bold:true,color:C.teal,align:'center'});}
  });
  rect(s,0.8,5.05,11.5,0.85,C.navy,0.11,C.navy,0.5);
  tx(s,'Privacy by design goal',1.05,5.30,2.0,0.2,{fontSize:10,bold:true,color:'B8E9D5'});
  tx(s,'No analysis result is persisted by this prototype. Keep real identifiable patient information out of the demo.',3.13,5.22,8.65,0.35,{fontSize:12,bold:true,color:C.white});
  footerSource(s,'Technical reference: Ollama API documentation (local base URL http://localhost:11434/api; structured output via /api/chat format schema).');
}

// Slide 7: prompt engineering
{
  const s = pptx.addSlide('MASTER');
  title(s,'06 / Prompt engineering','We constrained the task, not just the tone','A safer result comes from layered instructions, structured output, and checks outside the model.');
  const steps=[
    {n:'01',head:'Define the role',body:'Patient-education assistant, not a doctor.',accent:C.teal,fill:'E5F4EC'},
    {n:'02',head:'Set source-only rules',body:'No new medical facts, medicine details, or warning signs.',accent:C.lilacDark,fill:'F0ECFC'},
    {n:'03',head:'Require quotations',body:'Every extracted instruction must point to exact text in the note.',accent:C.orange,fill:'FFF2E2'},
    {n:'04',head:'Validate structure',body:'JSON schema plus Python quote-matching checks.',accent:C.teal,fill:'E5F4EC'}
  ];
  steps.forEach((st,i)=>{
    const x=0.68+i*3.12;
    rect(s,x,2.6,2.79,1.55,'FFFFFF',0.11,'DFE9E3',0.7);
    pill(s,st.n,x+0.2,2.81,0.47,st.fill,st.accent,8);
    tx(s,st.head,x+0.2,3.22,2.39,0.25,{fontSize:12,bold:true,color:C.ink});
    tx(s,st.body,x+0.2,3.58,2.39,0.38,{fontSize:9.5,color:C.muted,valign:'top'});
    if(i<3){line(s,x+2.82,3.39,x+3.03,3.39,'94CBB8',1.8);tx(s,'›',x+2.83,3.21,0.25,0.25,{fontSize:17,bold:true,color:C.teal,align:'center'});}
  });
  rect(s,0.68,4.53,11.99,1.46,'F0F7F3',0.13,'DDEBE4',0.6);
  tx(s,'Example refinement',0.95,4.77,2.0,0.24,{fontSize:11,bold:true,color:C.teal});
  tx(s,'Broad prompt',0.95,5.16,1.2,0.18,{fontSize:8,bold:true,color:C.soft});
  tx(s,'“Simplify this discharge note.”',2.05,5.12,3.0,0.26,{fontSize:11,color:C.muted,italic:true});
  line(s,5.18,5.07,5.18,5.69,'C9DDD3',1.0);
  tx(s,'Final prompt',5.48,5.16,1.15,0.18,{fontSize:8,bold:true,color:C.teal});
  tx(s,'“Use only the source, quote every item, never invent, and flag missing details.”',6.67,5.08,5.35,0.45,{fontSize:11,bold:true,color:C.ink,valign:'top'});
  footerSource(s,'The final runtime system and user prompts are reproduced in PROMPT_DOCUMENTATION.md.');
}

// Slide 8: safety and limitations
{
  const s = pptx.addSlide('MASTER');
  title(s,'07 / Safety and limitations','AI can make language simpler and still make mistakes','Published research makes safety controls central to the design, not an optional feature.');
  rect(s,0.66,2.42,3.35,3.48,C.navy,0.15,C.navy,0.4);
  tx(s,'18%',0.98,2.83,2.6,0.78,{fontFace:'Aptos Display',fontSize:43,bold:true,color:'B8E9D5'});
  tx(s,'of 100 AI-generated patient-centred discharge instructions were identified with potentially harmful safety issues in one 2024 study.',0.99,3.71,2.65,1.1,{fontSize:13,bold:true,color:C.white,valign:'top'});
  tx(s,'Study used GPT-3.5 and MIMIC-IV discharge summaries. This is evidence of a risk, not a prediction for this prototype.',0.99,5.08,2.63,0.53,{fontSize:9,color:'B7D1C7',valign:'top'});
  const safeguards=[
    ['Exact medication quotes','Do not paraphrase or calculate dose, timing or duration.'],
    ['No invention','Missing or ambiguous details become questions for the care team.'],
    ['Quote validation','Remove entries whose quoted source text does not match.'],
    ['Clinical review','Label every output as a draft and block clinical-use claims.']
  ];
  safeguards.forEach((q,i)=>{
    const y=2.45+i*0.82;
    rect(s,4.36,y,8.1,0.68,'FFFFFF',0.09,'DFE9E3',0.6);
    s.addShape(Shape.ellipse,{x:4.57,y:y+0.18,w:0.29,h:0.29,fill:{color:i===1?'FFF0DD':'E5F4EC'},line:{color:i===1?'F1DFBF':'DCEDE4',width:0.5}});
    tx(s,'✓',4.57,y+0.23,0.29,0.15,{fontSize:9,bold:true,color:i===1?C.orange:C.teal,align:'center'});
    tx(s,q[0],5.04,y+0.12,2.15,0.19,{fontSize:10.5,bold:true,color:C.ink});
    tx(s,q[1],7.22,y+0.12,4.92,0.38,{fontSize:9.5,color:C.muted,valign:'top'});
  });
  footerSource(s,'Source: Stanceski et al., npj Digital Medicine (2024), DOI 10.1038/s41746-024-01336-w.');
}

// Slide 9: demo/evaluation plan
{
  const s = pptx.addSlide('MASTER');
  title(s,'08 / Demonstration plan','Show the working loop, then explain what it cannot guarantee','The assessment demo focuses on hands-on AI use, prompt iteration, technical execution, and responsible boundaries.');
  const items=[
    {n:'1',head:'Run locally',body:'Show Ollama model status and the selected installed model.',accent:C.teal},
    {n:'2',head:'Load fictional note',body:'Use the built-in sample and confirm synthetic data.',accent:C.lilacDark},
    {n:'3',head:'Generate the guide',body:'Review summary, source medication wording, steps, gaps, and questions.',accent:C.orange},
    {n:'4',head:'Export and explain',body:'Show JSON/print, then explain why a clinician must review the draft.',accent:C.teal}
  ];
  items.forEach((it,i)=>{
    const y=2.47+i*0.87;
    s.addShape(Shape.ellipse,{x:0.78,y:y+0.05,w:0.48,h:0.48,fill:{color:it.accent},line:{color:it.accent,width:0.5}});
    tx(s,it.n,0.78,y+0.17,0.48,0.18,{fontSize:12,bold:true,color:C.white,align:'center'});
    tx(s,it.head,1.52,y+0.04,2.3,0.25,{fontSize:13,bold:true,color:C.ink});
    tx(s,it.body,3.9,y+0.04,5.95,0.34,{fontSize:10.5,color:C.muted,valign:'top'});
    if(i<3) line(s,1.02,y+0.55,1.02,y+0.87,'C7DFD4',1.7);
  });
  rect(s,10.15,2.47,2.35,3.44,'EAF5F0',0.14,'D8E9E1',0.6);
  tx(s,'EVALUATION',10.42,2.77,1.7,0.2,{fontSize:8,bold:true,color:C.teal,charSpacing:1.1});
  tx(s,'What success looks like',10.42,3.13,1.8,0.65,{fontSize:16,bold:true,color:C.ink,valign:'top'});
  const checks=['Uses local AI meaningfully','Includes prompt iterations','Shows a real app workflow','Handles missing details','Explains limitations'];
  checks.forEach((t,i)=>{
    tx(s,'✓',10.42,4.0+i*0.3,0.18,0.16,{fontSize:9,bold:true,color:C.teal});
    tx(s,t,10.68,3.99+i*0.3,1.42,0.19,{fontSize:8.1,color:C.muted});
  });
  footerSource(s,'Use PRESENTATION_SCRIPT.md for suggested narration. Record the actual running app and describe only what you personally verified.');
}

// Slide 10: references
{
  const s = pptx.addSlide('MASTER');
  title(s,'09 / References','Research and technical sources','Evidence supports the need for clearer discharge communication and cautions against unreviewed AI-generated instructions.');
  const refs=[
    {n:'01',title:'Investigating discharge communication for chronic disease patients in three hospitals in India',desc:'PLOS ONE / PMC, 2020. Reports gaps in documented and recalled discharge information.',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7159187/'},
    {n:'02',title:'WHO: Health literacy',desc:'World Health Organization, updated 22 December 2025. Defines health literacy as accessing, understanding, appraising and using health information.',url:'https://www.who.int/news-room/fact-sheets/detail/health-literacy'},
    {n:'03',title:'The quality and safety of using generative AI to produce patient-centred discharge instructions',desc:'npj Digital Medicine, 2024. Reports potentially harmful safety issues in 18% of 100 evaluated AI-generated instructions.',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11579500/'},
    {n:'04',title:'Ollama API documentation',desc:'Local API base URL, chat endpoint, and schema-constrained structured output.',url:'https://github.com/ollama/ollama/blob/main/docs/api.md'}
  ];
  refs.forEach((r,i)=>{
    const y=2.35+i*0.98;
    rect(s,0.68,y,11.98,0.82,'FFFFFF',0.1,'DFE9E3',0.6);
    pill(s,r.n,0.88,y+0.24,0.44,i===2?'F0ECFC':'E5F4EC',i===2?C.lilacDark:C.teal,7.5);
    tx(s,r.title,1.52,y+0.11,7.45,0.23,{fontSize:10.6,bold:true,color:C.ink});
    tx(s,r.desc,1.52,y+0.4,8.5,0.21,{fontSize:8.4,color:C.muted});
    tx(s,'OPEN SOURCE ↗',10.28,y+0.28,1.95,0.18,{fontSize:7.4,bold:true,color:C.teal,align:'center',extra:{hyperlink:{url:r.url},underline:true}});
  });
  tx(s,'This prototype has not been clinically validated. Evidence and safety claims refer to the studies above, not to measured outcomes from this application.',0.74,6.45,11.6,0.22,{fontSize:8.5,color:C.muted,italic:true});
}

pptx.writeFile({ fileName: path.join(__dirname, 'DischargeSaathi_AI_Presentation.pptx') });
