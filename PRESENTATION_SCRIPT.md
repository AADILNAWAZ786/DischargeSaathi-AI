# DischargeSaathi AI: Video Presentation Script

Target length: about 3 minutes. Use this as narration while sharing the running local web app. Only say you tested a feature if you have run it on your own computer.

## 0:00–0:25 | Problem

“Hello, this is DischargeSaathi AI, a local-first healthcare communication prototype. I chose the hospital discharge communication problem because a patient can leave hospital with a document that is medically detailed but difficult to understand. A study in three Indian public hospitals reported that only 3% of patients recalled receiving all four key areas of verbal discharge information. This is a real communication gap, but the solution must be designed carefully because healthcare instructions are safety-critical.”

## 0:25–0:50 | What the application does

“The goal is not to diagnose or treat a patient. The application takes a discharge note and creates a more readable draft with separate sections for the plain-language summary, exact medication wording, next steps, warning signs that appear in the source, missing details, and questions to ask the care team.”

## 0:50–1:20 | AI tools and architecture

“I used Python with FastAPI for the backend, HTML, CSS and JavaScript for the web interface, and Ollama to run a language model locally. The browser calls the local backend, and the backend calls Ollama on localhost. This avoids needing a cloud AI API for the model request. The app detects the available local models and lets me choose one. I used structured JSON output so the interface can display each kind of information separately.”

## 1:20–1:55 | Prompt engineering

“My first prompt was broad: simplify the discharge note. I then refined it to restrict the model to the source text, prohibit new medical advice, and treat missing information as a question rather than a guess. The final prompt requires verbatim source quotes for summaries, next steps and warning signs, and exact quotes for medication information. I also ask the model to ignore instructions embedded in the source text, because uploaded text is data, not trusted instructions.”

## 1:55–2:25 | Demo

“Here I load the fictional example, confirm that the data is fictional, select my installed Ollama model, and generate the guide. I can review source excerpts, questions for the care team, and missing information. The result can be exported as JSON or printed. The app does not persist the note or result in a database.”

## 2:25–2:50 | Challenges and safeguards

“The central challenge is that a language model can make a discharge instruction sound clearer while accidentally changing its meaning. The server therefore checks that each quoted source excerpt exists in the original note and removes unsupported items. That safeguard is limited: it cannot prove that the explanation is accurate, so the app clearly requires clinician review and cannot be used for real patient care.”

## 2:50–3:05 | Final outcome

“The outcome is a working local-first prototype that shows a specific use of AI, iterative prompt design, structured extraction, deterministic validation, and an explicit safety boundary. Next steps would be usability testing with clinicians, testing translations, formal risk assessment, and validation with a qualified healthcare team before any real deployment.”

## Before you record

- Make sure Ollama is running and `ollama list` shows at least one model.
- Start the FastAPI app using the README instructions.
- Click **Load fictional sample** and generate the guide once before recording so the model is ready.
- Use only the synthetic sample in the recording.
- Do not say the app is clinically validated. It is not.
