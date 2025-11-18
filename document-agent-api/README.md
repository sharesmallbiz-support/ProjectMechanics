# Document Agent API

A powerful Python FastAPI backend for automated document generation using AI agents with sophisticated prompt management.

## 🚀 Features

- **5-Step AI Workflow**: SPECIFY → PLAN → DRAFT → CRITIQUE → FINALIZE
- **Pydantic Models**: Full type safety and validation
- **Prompt Management**: Sophisticated prompts stored in `/data/prompts` folder
- **JWT Authentication**: Secure token-based auth
- **Multi-Provider AI**: Supports OpenAI GPT and Anthropic Claude
- **Docker Ready**: Complete containerization support
- **CORS Enabled**: Ready for frontend integration
- **OpenAPI Docs**: Auto-generated interactive API documentation

## 📋 Requirements

- Python 3.11+
- OpenAI API key or Anthropic API key
- (Optional) Docker and Docker Compose

## 🛠️ Installation

### Option 1: Local Development

1. **Clone and navigate to the API directory**
```bash
cd document-agent-api
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment**
```bash
cp .env.example .env
# Edit .env and add your API keys
```

5. **Run the server**
```bash
python -m app.main
# or
uvicorn app.main:app --reload --port 8000
```

### Option 2: Docker

1. **Configure environment**
```bash
cp .env.example .env
# Edit .env and add your API keys
```

2. **Build and run with Docker Compose**
```bash
docker-compose up --build
```

## 📁 Project Structure

```
document-agent-api/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application
│   ├── config.py               # Configuration management
│   ├── models/
│   │   ├── __init__.py
│   │   ├── requests.py         # Pydantic request models
│   │   └── responses.py        # Pydantic response models
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py             # Authentication endpoints
│   │   ├── document.py         # Document generation endpoints
│   │   └── health.py           # Health & version endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ai_service.py       # AI integration (OpenAI/Claude)
│   │   ├── auth_service.py     # JWT authentication
│   │   └── prompt_service.py   # Prompt management
│   ├── middleware/
│   │   ├── __init__.py
│   │   └── auth_middleware.py  # Auth middleware
│   └── utils/
│       ├── __init__.py
│       └── errors.py           # Error handling
├── data/
│   └── prompts/
│       ├── specify.md          # SPECIFY step prompt
│       ├── plan.md             # PLAN step prompt
│       ├── draft.md            # DRAFT step prompt
│       ├── critique.md         # CRITIQUE step prompt
│       └── finalize.md         # FINALIZE step prompt
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔧 Configuration

Edit `.env` file with your settings:

```bash
# Security
JWT_SECRET_KEY="your-secret-key-here"

# AI Services
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
DEFAULT_AI_MODEL="gpt-4"

# Server
HOST="0.0.0.0"
PORT=8000
DEBUG=False
```

## 📚 API Documentation

Once running, access interactive API docs:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## 🔐 Authentication

### 1. Get Access Token

```bash
curl -X POST http://localhost:8000/api/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "demo-api-key"
  }'
```

Response:
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 3600,
  "tokenType": "Bearer"
}
```

### 2. Use Token in Requests

Add the `Authorization` header to all requests:

```bash
Authorization: Bearer <your-access-token>
```

## 🎯 Usage Examples

### Step 1: SPECIFY - Create Document Specification

```bash
curl -X POST http://localhost:8000/api/v1/document/generate-step \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "stepId": "SPECIFY",
    "inputs": {
      "initialPrompt": "Create a comprehensive market analysis report for expanding our cloud services into the European market, focusing on Germany, France, and the UK."
    },
    "options": {
      "temperature": 0.7,
      "maxTokens": 4000,
      "model": "gpt-4"
    }
  }'
```

### Step 2: PLAN - Create Implementation Plan

```bash
curl -X POST http://localhost:8000/api/v1/document/generate-step \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "stepId": "PLAN",
    "inputs": {
      "specDraft": "<output from SPECIFY step>"
    }
  }'
```

### Step 3: DRAFT - Write Document

```bash
curl -X POST http://localhost:8000/api/v1/document/generate-step \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "stepId": "DRAFT",
    "inputs": {
      "specDraft": "<output from SPECIFY step>",
      "planTasks": "<output from PLAN step>"
    }
  }'
```

### Step 4: CRITIQUE - Quality Review

```bash
curl -X POST http://localhost:8000/api/v1/document/generate-step \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "stepId": "CRITIQUE",
    "inputs": {
      "specDraft": "<output from SPECIFY step>",
      "planTasks": "<output from PLAN step>",
      "documentDraft": "<output from DRAFT step>"
    }
  }'
```

### Step 5: FINALIZE - Polish Document

```bash
curl -X POST http://localhost:8000/api/v1/document/generate-step \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "stepId": "FINALIZE",
    "inputs": {
      "documentDraft": "<output from DRAFT step>",
      "critiqueReport": "<output from CRITIQUE step>",
      "critiqueAccepted": true
    }
  }'
```

## 🎨 Prompt Management

All prompts are stored as Markdown files in `/data/prompts/`:

- `specify.md` - Requirements Analyst prompt
- `plan.md` - Strategic Planner prompt
- `draft.md` - Content Writer prompt
- `critique.md` - Quality Reviewer prompt
- `finalize.md` - Document Finalizer prompt

You can customize these prompts to adjust the AI agent behavior without changing code.

## 🔍 Health Check

```bash
curl http://localhost:8000/api/v1/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-18T10:30:00Z",
  "version": "1.0.0"
}
```

## 🧪 Testing

The API includes a demo API key for testing: `demo-api-key`

## 🚢 Deployment

### Docker Deployment

```bash
# Build image
docker build -t document-agent-api .

# Run container
docker run -p 8000:8000 \
  -e OPENAI_API_KEY="your-key" \
  -e JWT_SECRET_KEY="your-secret" \
  document-agent-api
```

### Production Checklist

- [ ] Set strong `JWT_SECRET_KEY` (32+ characters)
- [ ] Configure valid AI API keys
- [ ] Set `DEBUG=False`
- [ ] Configure CORS origins for your frontend
- [ ] Set up SSL/TLS (use reverse proxy like nginx)
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Back up prompt files

## 🔗 Frontend Integration

The API is designed to work with the Document Agent Web frontend:

1. **Update Frontend API URL**
   ```javascript
   // In document-agent-web/src/services/api.js
   const USE_MOCK_API = false;
   const API_BASE_URL = 'http://localhost:8000/api/v1/document';
   ```

2. **Configure CORS**
   ```bash
   # In .env
   CORS_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

3. **Add Authentication**
   - Store JWT token in localStorage or sessionStorage
   - Add Authorization header to all API calls
   - Handle token refresh on 401 responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Issues**: https://github.com/sharesmallbiz-support/ProjectMechanics/issues
- **API Docs**: http://localhost:8000/docs
- **API Specification**: See `/API-SPECIFICATION.md` in project root

## 🎯 Roadmap

- [ ] Rate limiting implementation
- [ ] User management system
- [ ] Document history/versioning
- [ ] Batch processing
- [ ] Webhook support
- [ ] Multiple output formats (PDF, DOCX)
- [ ] Template system
- [ ] Analytics dashboard

---

Built with ❤️ using FastAPI, Pydantic, and AI
