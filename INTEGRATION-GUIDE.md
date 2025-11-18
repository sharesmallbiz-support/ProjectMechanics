# Document Agent - Integration Guide

Complete guide for running the Document Agent API with the web frontend.

## 🎯 Quick Start (5 Minutes)

### Prerequisites
- Python 3.11+
- Node.js 18+
- OpenAI API key OR Anthropic API key

### Step 1: Start the Backend API

```bash
# Navigate to API directory
cd document-agent-api

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env

# Edit .env and add your API key
# Required: Set either OPENAI_API_KEY or ANTHROPIC_API_KEY
nano .env  # or use your preferred editor

# Run the API server
python -m app.main
```

The API will start on: **http://localhost:8000**
API docs available at: **http://localhost:8000/docs**

### Step 2: Start the Frontend

```bash
# Open a new terminal
cd document-agent-web

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

The frontend will start on: **http://localhost:5173**

### Step 3: Test the Integration

1. Open browser to **http://localhost:5173**
2. Enter a document request (e.g., "Create a market analysis report")
3. Click "Start Document Generation"
4. Watch the 5-step workflow execute with real AI!

---

## 🔧 Detailed Setup

### Backend API Configuration

#### Environment Variables (.env)

```bash
# Required - AI Service (choose one or both)
OPENAI_API_KEY=sk-your-openai-key-here
# OR
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# Required - Security
JWT_SECRET_KEY=your-secure-random-key-at-least-32-characters

# Optional - Defaults provided
DEFAULT_AI_MODEL=gpt-4                    # or claude-3-opus-20240229
HOST=0.0.0.0
PORT=8000
DEBUG=False
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

#### API Key for Frontend

The demo uses `demo-api-key` by default. This is configured in:
- Backend: `app/services/auth_service.py` (line 37)
- Frontend: `document-agent-web/src/services/api.js` (line 12)

**For production**, create your own API keys:

```python
# In auth_service.py
self._api_keys = {
    "your-custom-key": {
        "user_id": "user1",
        "tier": "pro",
        "name": "User Name"
    }
}
```

### Frontend Configuration

Edit `document-agent-web/src/services/api.js`:

```javascript
// Line 9-12
const USE_MOCK_API = false;                          // false for real API
const API_BASE_URL = 'http://localhost:8000/api/v1'; // Your API URL
const API_KEY = 'demo-api-key';                      // Your API key
```

---

## 🐳 Docker Deployment

### Backend with Docker

```bash
cd document-agent-api

# Create .env file with your keys
cp .env.example .env
nano .env

# Build and run with Docker Compose
docker-compose up --build

# Or with plain Docker
docker build -t document-agent-api .
docker run -p 8000:8000 \
  -e OPENAI_API_KEY="your-key" \
  -e JWT_SECRET_KEY="your-secret" \
  document-agent-api
```

### Frontend with Docker (Optional)

```bash
cd document-agent-web

# Build production version
npm run build

# Serve with any static server
npx serve -s dist -p 5173
```

---

## 🔍 Testing the Integration

### 1. Test API Health

```bash
# Check if API is running
curl http://localhost:8000/api/v1/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2025-11-18T10:30:00Z",
  "version": "1.0.0"
}
```

### 2. Test Authentication

```bash
# Get access token
curl -X POST http://localhost:8000/api/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "demo-api-key"}'

# Expected response:
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 3600,
  "tokenType": "Bearer"
}
```

### 3. Test Document Generation

```bash
# Replace YOUR_TOKEN with the accessToken from previous step
curl -X POST http://localhost:8000/api/v1/document/generate-step \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stepId": "SPECIFY",
    "inputs": {
      "initialPrompt": "Create a business plan for a coffee shop"
    },
    "options": {
      "temperature": 0.7,
      "maxTokens": 2000,
      "model": "gpt-4"
    }
  }'
```

### 4. Test Frontend Integration

1. Open DevTools Console (F12)
2. Start document generation
3. Look for console logs:
   ```
   [API] Authenticating...
   [API] Authentication successful
   [API] Generating step: SPECIFY
   [API] Generated step SPECIFY: {...}
   ```

---

## 🎯 Workflow Overview

### 5-Step Document Generation

```
User Input → SPECIFY → PLAN → DRAFT → CRITIQUE → FINALIZE → Final Document
              ↓          ↓       ↓        ↓          ↓
            Spec      Tasks   Draft    Review    Polished
```

### Step Details

| Step | Agent Persona | Input Required | Output |
|------|--------------|----------------|---------|
| **SPECIFY** | Requirements Analyst | `initialPrompt` | Document specification |
| **PLAN** | Strategic Planner | `specDraft` | Implementation plan |
| **DRAFT** | Content Writer | `specDraft`, `planTasks` | Complete draft |
| **CRITIQUE** | Quality Reviewer | `specDraft`, `planTasks`, `documentDraft` | Quality review |
| **FINALIZE** | Document Finalizer | `documentDraft`, `critiqueReport` (optional) | Final document |

### Data Flow Example

```javascript
// Step 1: SPECIFY
const step1 = await generateStep('SPECIFY', {
  initialPrompt: "Create a market analysis report"
});

// Step 2: PLAN (uses output from step 1)
const step2 = await generateStep('PLAN', {
  specDraft: step1.data.output
});

// Step 3: DRAFT (uses outputs from steps 1 and 2)
const step3 = await generateStep('DRAFT', {
  specDraft: step1.data.output,
  planTasks: step2.data.output
});

// Step 4: CRITIQUE
const step4 = await generateStep('CRITIQUE', {
  specDraft: step1.data.output,
  planTasks: step2.data.output,
  documentDraft: step3.data.output
});

// Step 5: FINALIZE
const step5 = await generateStep('FINALIZE', {
  documentDraft: step3.data.output,
  critiqueReport: step4.data.output,
  critiqueAccepted: true
});
```

---

## 🎨 Customizing Prompts

All AI prompts are stored in `document-agent-api/data/prompts/`:

- `specify.md` - Requirements analysis prompt
- `plan.md` - Planning and task breakdown prompt
- `draft.md` - Document writing prompt
- `critique.md` - Quality review prompt
- `finalize.md` - Final polish prompt

**To customize:**

1. Edit the Markdown files directly
2. Restart the API server
3. Changes take effect immediately

**Example**: Make documents more technical

Edit `data/prompts/draft.md`:
```markdown
## Writing Guidelines

### Tone and Style
- Highly technical and detailed
- Use industry-specific terminology
- Include code examples where relevant
- ...
```

---

## 🔐 Security Best Practices

### For Production

1. **Change JWT Secret**
   ```bash
   # Generate a secure key
   python -c "import secrets; print(secrets.token_urlsafe(32))"

   # Add to .env
   JWT_SECRET_KEY=your-generated-key-here
   ```

2. **Secure API Keys**
   - Never commit `.env` to git
   - Use environment variables in production
   - Implement proper user authentication system

3. **CORS Configuration**
   ```python
   # In app/config.py
   CORS_ORIGINS = [
       "https://yourdomain.com",
       "https://app.yourdomain.com"
   ]
   ```

4. **HTTPS**
   - Use reverse proxy (nginx, Caddy)
   - Enable SSL/TLS certificates
   - Redirect HTTP to HTTPS

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: API won't start
```bash
# Check Python version
python --version  # Should be 3.11+

# Check if port 8000 is in use
lsof -i :8000
# Kill process if needed
kill -9 <PID>
```

**Problem**: Authentication fails
- Verify API key matches between frontend and backend
- Check JWT_SECRET_KEY is set in .env
- Clear localStorage in browser: `localStorage.clear()`

**Problem**: AI generation fails
- Verify OPENAI_API_KEY or ANTHROPIC_API_KEY is valid
- Check API key has credits/quota remaining
- Review API logs for specific error messages

### Frontend Issues

**Problem**: CORS errors
```javascript
// In backend .env, add frontend URL
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Problem**: "Failed to fetch"
- Ensure backend is running on port 8000
- Check `API_BASE_URL` in `api.js` matches backend
- Verify no firewall blocking connections

**Problem**: Token expired
- Frontend auto-refreshes tokens
- Check browser console for auth errors
- Clear localStorage and retry: `localStorage.clear()`

### Network Issues

**Problem**: Cannot connect to API
```bash
# Test API is accessible
curl http://localhost:8000/api/v1/health

# Check if API is listening
netstat -an | grep 8000

# Test from frontend host
ping localhost
```

---

## 📊 Monitoring

### API Logs

```bash
# Run API with detailed logging
python -m app.main

# Watch for:
[INFO] Starting Document Agent API
✓ Prompt service: 5 prompts loaded
✓ Auth service: JWT configured
✓ AI service: Configured with model 'gpt-4'
```

### Frontend Console

Open DevTools Console to see:
- Authentication status
- API calls and responses
- Error messages
- Step execution progress

### Health Monitoring

```bash
# Continuous health check
watch -n 5 'curl -s http://localhost:8000/api/v1/health'
```

---

## 🚀 Performance Tips

### Backend
- Use `gpt-3.5-turbo` for faster/cheaper generation
- Adjust `maxTokens` based on needs (lower = faster)
- Enable caching for prompts (already implemented)
- Use Redis for token storage in production

### Frontend
- Enable production build for deployment: `npm run build`
- Use service workers for offline capability
- Implement request debouncing for edits
- Cache previous step outputs in localStorage

---

## 📚 Additional Resources

- **API Documentation**: http://localhost:8000/docs
- **API Specification**: `/API-SPECIFICATION.md`
- **Backend README**: `/document-agent-api/README.md`
- **Frontend README**: `/document-agent-web/README.md`
- **OpenAI API Docs**: https://platform.openai.com/docs
- **Anthropic API Docs**: https://docs.anthropic.com/

---

## 🆘 Getting Help

1. Check logs in terminal/console
2. Review API documentation at `/docs`
3. Check this guide's troubleshooting section
4. Open an issue on GitHub

---

## ✅ Checklist

Before going to production:

- [ ] Backend API starts without errors
- [ ] Frontend connects to backend
- [ ] Authentication works
- [ ] All 5 steps execute successfully
- [ ] JWT secret changed from default
- [ ] AI API keys configured
- [ ] CORS configured for production domain
- [ ] SSL/TLS enabled
- [ ] Error handling tested
- [ ] Performance acceptable
- [ ] Monitoring in place
- [ ] Backup strategy defined

---

**You're all set!** 🎉

Start building amazing documents with AI agents!
