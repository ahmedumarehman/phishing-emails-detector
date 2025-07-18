# 🚀 QUICKSTART - Frontend-Only Phishing Detector

This guide will help you set up and run the frontend-only version of the AI-Powered Phishing Email Detector.

## ⚡ Quick Setup (Automated)

### Windows Users
1. Open Command Prompt or PowerShell
2. Navigate to the project directory
3. Run the setup script:
   ```cmd
   start_frontend.bat
   ```

### Manual Setup (All Platforms)

## 📋 Prerequisites
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

## 🛠️ Installation Steps

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

### 4. Open Your Browser
The application will automatically open at:
```
http://localhost:3000
```

## 🎯 First Steps

Once the application is running:

1. **Try Email Analysis**:
   - Click on sample emails in the sidebar
   - Or enter your own email subject and body
   - Click "Analyze Email" to see results

2. **Test URL Checker**:
   - Switch to the "URL Checker" tab
   - Enter a URL like `http://suspicious-link.com/verify`
   - View the safety assessment

3. **Explore Features**:
   - Toggle dark/light mode
   - View detailed analysis breakdowns
   - Test different phishing scenarios

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

This creates a `build/` directory with optimized files ready for deployment.

## 🚀 Deployment Options

The built application can be deployed to:

- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use GitHub Actions
- **Any Web Server**: Upload `build` folder contents

## 🔧 Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
npm start -- --port 3001
```

### Permission Issues (Linux/Mac)
```bash
sudo npm install
```

### Clear Cache
```bash
npm start -- --reset-cache
```

## 🎨 Customization

### Change Port
Edit `package.json`:
```json
"scripts": {
  "start": "react-scripts start --port 3001"
}
```

### Environment Variables
Create `.env` file in frontend directory:
```env
REACT_APP_TITLE=My Phishing Detector
REACT_APP_VERSION=1.0.0
```

## 📱 Testing

### Sample Phishing Email
```
Subject: URGENT: Your account will be suspended
Body: Click here to verify your account: http://suspicious-link.com/verify
```

### Sample Safe Email
```
Subject: Weekly Newsletter
Body: Thank you for subscribing to our newsletter. Here are this week's updates...
```

## 🔍 Features Overview

✅ **Real-time Analysis**: Instant phishing detection  
✅ **Dark Mode**: Toggle between light and dark themes  
✅ **Responsive Design**: Works on desktop and mobile  
✅ **No Backend Required**: Runs entirely in browser  
✅ **Privacy Focused**: No data sent to external servers  

## 📊 How It Works

The application uses client-side JavaScript to:

1. **Analyze Keywords**: Scans for phishing terms
2. **Check Patterns**: Identifies suspicious formatting
3. **Examine URLs**: Analyzes link characteristics
4. **Score Risk**: Combines factors for confidence rating

## 🤝 Need Help?

- Check browser console for error messages
- Ensure Node.js is properly installed
- Try clearing browser cache
- Restart the development server

## 🚀 Next Steps

Once running, you can:
- Customize the detection algorithms in `mockAPI.js`
- Add new phishing patterns and keywords
- Modify the UI components
- Deploy to your preferred hosting platform

---

**Ready to start?** Run `start_frontend.bat` (Windows) or follow the manual steps above!
