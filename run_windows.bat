@echo off
setlocal
cd /d "%~dp0"
if not exist .venv (
  python -m venv .venv
)
call .venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt
echo.
echo Make sure Ollama is running. In another terminal, use: ollama list
if "%OLLAMA_MODEL%"=="" echo The app will select the first installed Ollama model automatically.
echo Starting DischargeSaathi AI at http://127.0.0.1:8000
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
pause
