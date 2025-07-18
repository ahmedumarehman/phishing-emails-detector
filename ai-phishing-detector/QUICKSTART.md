# 🚀 Quick Start Guide

## Prerequisites
- Python 3.11+ installed
- Node.js 18+ installed
- Git installed

## Option 1: Automated Setup (Windows)

1. **Clone and navigate to the project**
```bash
git clone <repository-url>
cd ai-phishing-detector
```

2. **Run the automated setup**
```bash
setup.bat
```

This will automatically:
- Install all Python dependencies
- Train the ML model
- Start the backend server
- Install Node.js dependencies
- Start the frontend development server

## Option 2: Manual Setup

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python train_model.py
python main.py
```

### Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm start
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Test the API

Run the test suite:
```bash
cd backend
python test_api.py
```

## Environment Variables

Set your VirusTotal API key:
```bash
# Windows
set VIRUSTOTAL_API_KEY=12b5f3af3d2cda562d20133880586241dc2ccbe2c840349275f7a07c1e204b4a

# Linux/Mac
export VIRUSTOTAL_API_KEY=12b5f3af3d2cda562d20133880586241dc2ccbe2c840349275f7a07c1e204b4a
```

## Deploy to Production

Use the deployment scripts:
```bash
# Windows
powershell -ExecutionPolicy Bypass -File deploy.ps1

# Linux/Mac
./deploy.sh
```

## Troubleshooting

### Backend Issues
- Ensure Python 3.11+ is installed
- Check if all dependencies are installed correctly
- Make sure the CSV dataset is in the backend directory
- Verify the ML model is trained (check for .pkl files)

### Frontend Issues
- Ensure Node.js 18+ is installed
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### API Issues
- Check if the backend server is running on port 8000
- Verify the VirusTotal API key is set correctly
- Test the health endpoint: `curl http://localhost:8000/health`

## Sample Test Data

Try these sample emails in the frontend:

**Phishing Email:**
- Subject: "URGENT: Your account will be suspended"
- Body: "Click here to verify your account: http://suspicious-link.com/verify"

**Safe Email:**
- Subject: "Weekly Newsletter"
- Body: "Thank you for subscribing to our newsletter. Here are this week's updates..."

## Need Help?

- Check the README.md for detailed documentation
- Review the backend/README.md for backend-specific info
- Review the frontend/README.md for frontend-specific info
- Run the test suite to verify everything is working correctly
