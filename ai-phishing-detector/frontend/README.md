# Frontend Development Guide

## Quick Start

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm start
```

3. **Build for production**
```bash
npm run build
```

## Features

### Modern UI Components
- Material-UI design system
- Dark/Light mode toggle
- Responsive design
- Loading states and animations

### Core Functionality
- Email input form (subject + body)
- Real-time analysis with progress indicators
- Detailed results display
- Sample email examples
- API health monitoring

### User Experience
- Intuitive interface
- Clear feedback messages
- Confidence score visualization
- Expandable details section
- Sample emails for testing

## API Integration

The frontend communicates with the backend through:
- `/api/predict` - Single email analysis
- `/api/batch-predict` - Multiple emails
- `/api/health` - API status check

## Firebase Integration

The app is configured to use Firebase for:
- Hosting (current)
- Authentication (future)
- Firestore database (future)
- Analytics (current)

## Development Tips

1. **Environment Variables**: Create a `.env` file for local development
2. **Proxy Setup**: The `package.json` includes a proxy to the backend
3. **API Endpoints**: Update `src/api.js` if backend URL changes
4. **Styling**: Use Material-UI theme system for consistent styling

## Deployment

The app is configured for Firebase Hosting:
```bash
firebase deploy
```

Make sure to build the app first:
```bash
npm run build
```
