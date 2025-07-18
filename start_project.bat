@echo off
echo Starting AI Phishing Detector...

echo.
echo [1/3] Starting Backend Server...
start cmd /k "cd /d d:\DATA\CAREER\INTERNSHIPS\EMRChains Internship NSTP\PROJECTS\phishing-emails\ai-phishing-detector\backend && set VIRUSTOTAL_API_KEY=12b5f3af3d2cda562d20133880586241dc2ccbe2c840349275f7a07c1e204b4a && uvicorn main:app --host 127.0.0.1 --port 8001 --reload"

echo.
echo [2/3] Waiting for backend to start...
timeout /t 10 /nobreak

echo.
echo [3/3] Starting Frontend Server...
start cmd /k "cd /d d:\DATA\CAREER\INTERNSHIPS\EMRChains Internship NSTP\PROJECTS\phishing-emails\ai-phishing-detector\frontend && npm start"

echo.
echo Done! Check your browser at http://localhost:3000
pause