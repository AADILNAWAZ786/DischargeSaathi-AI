# Research notes: DischargeSaathi AI

## Problem statement

Patients and caregivers may leave a hospital without remembering or fully understanding all key parts of discharge communication, including ongoing treatment, medication details, lifestyle advice, and follow-up plans. DischargeSaathi AI explores whether a local language model can help reorganise an existing note into easier-to-review language while explicitly identifying gaps.

## Evidence used in the presentation

1. **Hospital discharge communication in India.** A study of chronic disease patients in three public hospitals reported that only 3% of participants recalled receiving all four key areas of verbal discharge information. Just under one-third of discharge notes contained all key information items examined, and researchers judged about one-quarter to have a good understanding of important details. These are study-specific results and should not be presented as national estimates.
   - PLOS ONE / PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC7159187/
   - NIHR Evidence summary: https://evidence.nihr.ac.uk/alert/most-patients-leaving-hospital-in-india-are-given-inadequate-medical-information/

2. **Health literacy.** WHO defines health literacy around accessing, understanding, appraising, and using health information and services.
   - WHO fact sheet (22 December 2025): https://www.who.int/news-room/fact-sheets/detail/health-literacy

3. **AI-generated discharge instructions have safety risks.** A 2024 study that evaluated GPT-3.5-generated instructions from 100 discharge summaries identified potentially harmful safety issues in 18% of generated instructions, including hallucinations in 6% and new medications in 3%. These findings apply to that study's model, dataset, and method; they do not estimate this prototype's accuracy.
   - npj Digital Medicine / PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC11579500/

4. **Local Ollama API.** The app uses Ollama's local `/api/tags` endpoint to discover models and `/api/chat` to request schema-constrained structured output.
   - API documentation: https://github.com/ollama/ollama/blob/main/docs/api.md
   - API introduction: https://github.com/ollama/ollama/blob/main/docs/api/introduction.mdx

## What the research does and does not establish

The sources establish that discharge communication can be incomplete or difficult to use and that unreviewed AI-generated instructions can introduce errors. They do not establish that this prototype improves clinical outcomes. A real deployment would require clinician-led validation, privacy and security review, usability testing, translation validation, and relevant regulatory assessment.
