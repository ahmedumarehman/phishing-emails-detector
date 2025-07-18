# 🛡️ AI-Powered Phishing Email Detector (Frontend-Only)

A modern, React-based web application that uses heuristic analysis to detect phishing emails and suspicious URLs. This is a frontend-only application that provides real-time analysis without requiring a backend server.

## ✨ Features

- **Email Analysis**: Analyze email subject and body for phishing indicators
- **URL Analysis**: Check URLs for suspicious characteristics  
- **Real-time Detection**: Instant analysis using client-side heuristics
- **Modern UI**: Beautiful Material-UI interface with dark mode support
- **Sample Data**: Pre-loaded examples for testing
- **Pattern Recognition**: Detects common phishing patterns and keywords
- **No Backend Required**: Runs entirely in the browser

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-phishing-detector
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
ai-phishing-detector/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── URLChecker.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── mockAPI.js
│   ├── package.json
│   └── README.md
├── README.md
└── QUICKSTART.md
```

## 🔧 How It Works

### Email Analysis
The application analyzes emails using several heuristic methods:

1. **Keyword Detection**: Scans for common phishing keywords like "urgent", "verify", "suspend"
2. **Pattern Matching**: Identifies suspicious patterns like excessive capitalization
3. **URL Analysis**: Examines embedded URLs for suspicious characteristics
4. **Domain Checking**: Flags known suspicious domains and URL shorteners

### URL Analysis
For individual URL checking:

1. **Structure Analysis**: Examines URL length, subdomain count, special characters
2. **Domain Reputation**: Checks against known suspicious domains
3. **Pattern Detection**: Identifies URL obfuscation techniques

### Scoring System
- Phishing indicators are weighted and combined into a confidence score
- Scores above 50% are flagged as potential phishing
- Multiple factors contribute to the final assessment

## 🎮 Usage

### Email Analysis
1. Select the "Email Analysis" tab
2. Enter the email subject and body text
3. Click "Analyze Email" to get results
4. View the confidence score and detailed analysis

### URL Checking  
1. Select the "URL Checker" tab
2. Enter a URL to analyze
3. Review the safety assessment and feature analysis

### Sample Emails
Use the provided sample emails in the sidebar to test different scenarios.

## 🎨 Features

- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on desktop and mobile
- **Real-time Analysis**: Instant feedback as you type
- **Detailed Reports**: Comprehensive breakdown of analysis factors
- **Sample Data**: Pre-loaded examples for testing

## 🛠️ Technology Stack

- **Frontend**: React 18, Material-UI
- **Analysis**: Client-side JavaScript heuristics
- **Styling**: Material-UI components and theming
- **Build Tool**: Create React App

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔒 Privacy & Security

- **No Data Collection**: All analysis happens locally in your browser
- **No Server Communication**: No emails or URLs are sent to external servers
- **Client-Side Only**: Your data never leaves your device

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in the `build/` directory can be deployed to any static hosting service:
- Netlify
- Vercel  
- GitHub Pages
- AWS S3
- Any web server

## 🔮 Future Enhancements

- Machine learning model integration
- Real-time threat intelligence feeds
- Browser extension version
- Mobile app
- Advanced reporting features
