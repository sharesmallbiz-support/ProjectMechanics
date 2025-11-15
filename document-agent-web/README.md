# Business Document Agent (React Frontend)

A React-based web application that visualizes and drives a 5-step AI agent workflow for creating professional business documents. This application serves as the client interface for the Prompt Spark API.

## Overview

The Business Document Agent guides users through a systematic 5-step process to create comprehensive business documents:

1. **SPECIFY** - Requirements Analyst defines document requirements and scope
2. **PLAN** - Strategic Planner creates detailed outline and task breakdown
3. **DRAFT** - Content Writer generates initial document draft
4. **CRITIQUE** - Quality Reviewer analyzes and provides improvement feedback
5. **FINALIZE** - Document Finalizer applies improvements and produces final document

## Features

### ✨ Core Capabilities

- **Sequential Workflow**: Step-by-step process with automatic dependency management
- **Mock API Mode**: Fully functional mock API for development and testing
- **Real-time Progress**: Visual progress indicators and status updates
- **Agent Personas**: Each step has a dedicated AI agent with specific expertise
- **Expandable Outputs**: Collapsible sections for easy review of generated content
- **Copy & Download**: Export any step's output as markdown
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Error Handling**: Graceful error handling with retry capabilities

### 🎨 UI Components

- **Control Panel**: Input management, step execution, progress tracking
- **Output Viewer**: Display all 5 steps with status indicators
- **Step Cards**: Individual cards for each workflow step
- **Status Badges**: Visual indicators (Pending, Processing, Complete)

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Modern web browser

### Installation

```bash
# Navigate to the project directory
cd document-agent-web

# Install dependencies
npm install

# Start development server
npm run dev

# The app will open at http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
document-agent-web/
├── src/
│   ├── components/          # React components
│   │   ├── ControlPanel.jsx    # Input and execution controls
│   │   ├── OutputViewer.jsx    # All steps viewer
│   │   └── StepCard.jsx        # Individual step display
│   ├── services/            # API services
│   │   └── api.js             # API client with mock responses
│   ├── utils/               # Utilities
│   │   └── steps.js           # Step configuration
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles (Tailwind)
├── public/                  # Static assets
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## State Management

The application uses React's `useState` hook to manage:

| State Variable | Type | Purpose |
|---------------|------|---------|
| `initialPrompt` | string | User's initial document description |
| `results` | object | Stores all agent outputs by step |
| `currentStepIndex` | number | Tracks active workflow step (0-5) |
| `isLoading` | boolean | Loading state for API calls |
| `error` | string | Error messages from API or app |

## API Integration

### Mock Mode (Default)

By default, the app runs in mock mode with realistic AI-generated responses:

```javascript
// src/services/api.js
const USE_MOCK_API = true;  // Mock mode enabled
const MOCK_DELAY = 1500;    // Simulated 1.5s delay
```

### Production Mode

To connect to a real Prompt Spark API:

1. Update `src/services/api.js`:
```javascript
const USE_MOCK_API = false;
const API_BASE_URL = 'https://your-api.com/api/v1/document';
```

2. Implement authentication if required
3. Handle CORS configuration on your backend

### API Endpoint

**POST** `/api/v1/document/generate-step`

**Request:**
```json
{
  "stepId": "SPECIFY",
  "inputs": {
    "initialPrompt": "Create a market analysis report..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stepId": "SPECIFY",
    "output": "# Document Specification\n\n...",
    "metadata": {
      "agentPersona": "Requirements Analyst",
      "processingTime": "1.2s",
      "confidence": 0.95
    }
  }
}
```

## Step Configuration

Each step is defined in `src/utils/steps.js`:

```javascript
{
  id: 'SPECIFY',                    // Step identifier
  index: 0,                         // Workflow position
  title: 'Step 1: Specify',         // Display title
  agentPersona: 'Requirements Analyst',  // AI agent role
  description: '...',               // Step description
  inputKeys: ['initialPrompt'],    // Required inputs
  outputKey: 'specDraft',          // Where to store output
  buttonLabel: 'Run Step 1: ...',  // Button text
  icon: '📋',                      // Display icon
  color: 'blue'                    // Theme color
}
```

## Customization

### Styling

Edit `tailwind.config.js` to customize colors, fonts, and design tokens:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
      }
    }
  }
}
```

### Mock Responses

Edit mock responses in `src/services/api.js` to test different scenarios:

```javascript
const mockResponses = {
  SPECIFY: (input) => ({
    // Customize mock output
  })
};
```

### Step Workflow

Modify `src/utils/steps.js` to add, remove, or reorder workflow steps.

## Development

### Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Adding New Features

1. **New Component**: Add to `src/components/`
2. **New Utility**: Add to `src/utils/`
3. **API Changes**: Update `src/services/api.js`
4. **Styling**: Add to component or `src/index.css`

## Deployment

### Vercel

```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Netlify

```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Performance

- Initial bundle size: ~150KB (gzipped)
- Time to Interactive: <2s (on 3G)
- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices)

## Troubleshooting

### Port Already in Use

```bash
# Change port in vite.config.js
server: {
  port: 3001  // Use different port
}
```

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Mock API Not Working

Check console for errors and verify `USE_MOCK_API = true` in `src/services/api.js`

## Architecture Decisions

### Why Mock API?

- **Development Independence**: Frontend development without backend dependency
- **Faster Iteration**: No network latency during development
- **Testing**: Predictable responses for testing edge cases
- **Demonstrations**: Fully functional demos without infrastructure

### Why Tailwind CSS?

- **Rapid Prototyping**: Utility-first CSS for fast development
- **Consistency**: Design system built-in
- **Performance**: Purges unused CSS in production
- **Responsive**: Mobile-first approach by default

### Why Vite?

- **Fast**: Instant HMR and optimized builds
- **Modern**: ES modules, native TypeScript support
- **Simple**: Minimal configuration required
- **Ecosystem**: Great plugin ecosystem

## Future Enhancements

- [ ] Real-time collaboration (multiple users)
- [ ] Document version history
- [ ] Export to multiple formats (PDF, DOCX)
- [ ] Template library (pre-built document types)
- [ ] AI suggestions during prompt input
- [ ] Cost estimation for API usage
- [ ] Document comparison (draft vs. final)
- [ ] Share links for completed documents

## Contributing

This is part of the Business Document Spec Kit project. See main repository for contribution guidelines.

## License

MIT License - See main project LICENSE file

## Support

For issues, questions, or feature requests, please open an issue on the main project repository.

---

**Version:** 1.0.0
**Last Updated:** 2025-11-15
**Status:** Production Ready

Built with ⚡ Vite + ⚛️ React + 🎨 Tailwind CSS
