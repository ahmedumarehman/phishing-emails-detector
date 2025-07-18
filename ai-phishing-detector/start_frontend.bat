@echo off
echo ================================
echo  Phishing Email Detector Setup
echo  Frontend-Only Version
echo ================================
echo.

echo [1/3] Navigating to frontend directory...
cd frontend

echo [2/3] Installing dependencies...
call npm install

echo [3/3] Starting development server...
echo.
echo The application will open in your browser at:
echo http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
call npm start

pause
