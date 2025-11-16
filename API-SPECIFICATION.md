# Document Agent API Specification

**Version:** 1.0.0
**Last Updated:** 2025-11-16
**Status:** Draft

---

## Table of Contents

1. [Overview](#overview)
2. [Base URL & Versioning](#base-url--versioning)
3. [Authentication](#authentication)
4. [Common Patterns](#common-patterns)
5. [Endpoints](#endpoints)
6. [Data Models](#data-models)
7. [Workflow Description](#workflow-description)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)
10. [Security Considerations](#security-considerations)
11. [Changelog](#changelog)

---

## Overview

The Document Agent API provides an AI-powered document generation service that follows a structured 5-step workflow to create professional business documents. The API is designed to support an iterative, agent-based approach where each step builds upon the previous outputs.

### Key Features

- **Multi-step Workflow**: 5-stage document creation process (Specify → Plan → Draft → Critique → Finalize)
- **Stateless Design**: Each request is independent; client manages workflow state
- **Rich Metadata**: Responses include agent personas, confidence scores, and processing metrics
- **Markdown Output**: All document content returned in Markdown format
- **Edit Support**: Clients can modify outputs and feed edited versions to subsequent steps

### Workflow Stages

| Stage | Agent Persona | Purpose | Input Requirements |
|-------|---------------|---------|-------------------|
| **SPECIFY** | Requirements Analyst | Define document requirements and scope | Initial user prompt |
| **PLAN** | Strategic Planner | Create detailed outline and task breakdown | Specification draft |
| **DRAFT** | Content Writer | Generate initial document draft | Spec + Plan |
| **CRITIQUE** | Quality Reviewer | Analyze and provide improvement feedback | Spec + Plan + Draft |
| **FINALIZE** | Document Finalizer | Apply improvements and produce final document | All previous outputs |

---

## Base URL & Versioning

### Production Base URL
```
https://api.documentagent.example.com/api/v1
```

### API Versioning Strategy

- **URL-based versioning**: `/api/v1/`, `/api/v2/`, etc.
- **Breaking changes**: New major version (v1 → v2)
- **Backward-compatible changes**: Same version with optional fields
- **Deprecation policy**: Minimum 6 months notice before version sunset

---

## Authentication

### Authentication Method

The API uses **Bearer Token Authentication** with JWT tokens.

### Request Headers

```http
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

### Obtaining a Token

```http
POST /auth/token
Content-Type: application/json

{
  "apiKey": "your_api_key",
  "apiSecret": "your_api_secret"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "refresh_token_here"
}
```

### Token Refresh

```http
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "your_refresh_token"
}
```

---

## Common Patterns

### Request Structure

All POST requests follow this general pattern:

```json
{
  "stepId": "STEP_NAME",
  "inputs": {
    "key1": "value1",
    "key2": "value2"
  },
  "options": {
    "temperature": 0.7,
    "maxTokens": 4000
  }
}
```

### Response Structure

All successful responses follow this pattern:

```json
{
  "success": true,
  "data": {
    "stepId": "STEP_NAME",
    "output": "# Markdown content...",
    "metadata": {
      "agentPersona": "Agent Role",
      "processingTime": "2.3s",
      "confidence": 0.95,
      "timestamp": "2025-11-16T10:30:45Z"
    }
  }
}
```

### Error Response Structure

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional context"
    },
    "timestamp": "2025-11-16T10:30:45Z",
    "requestId": "req_abc123xyz"
  }
}
```

---

## Endpoints

### 1. Generate Document Step

**Endpoint:** `POST /document/generate-step`

**Description:** Executes a single step in the document generation workflow. This is the primary endpoint for all workflow stages.

#### Request

```http
POST /api/v1/document/generate-step
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "stepId": "SPECIFY|PLAN|DRAFT|CRITIQUE|FINALIZE",
  "inputs": {
    "initialPrompt": "string (required for SPECIFY)",
    "specDraft": "string (required for PLAN+)",
    "planTasks": "string (required for DRAFT+)",
    "documentDraft": "string (required for CRITIQUE+)",
    "criticReport": "string (required for FINALIZE)"
  },
  "options": {
    "temperature": 0.7,
    "maxTokens": 4000,
    "model": "gpt-4",
    "language": "en"
  }
}
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `stepId` | string | Yes | One of: SPECIFY, PLAN, DRAFT, CRITIQUE, FINALIZE |
| `inputs` | object | Yes | Input data for the step (varies by stepId) |
| `options` | object | No | Generation options (temperature, maxTokens, etc.) |

#### Input Requirements by Step

**SPECIFY:**
```json
{
  "inputs": {
    "initialPrompt": "Create a market analysis report for a new SaaS product targeting small businesses in the retail sector."
  }
}
```

**PLAN:**
```json
{
  "inputs": {
    "specDraft": "# Document Specification\n\n..."
  }
}
```

**DRAFT:**
```json
{
  "inputs": {
    "specDraft": "# Document Specification\n\n...",
    "planTasks": "# Implementation Plan\n\n..."
  }
}
```

**CRITIQUE:**
```json
{
  "inputs": {
    "specDraft": "...",
    "planTasks": "...",
    "documentDraft": "# Market Analysis Report\n\n..."
  }
}
```

**FINALIZE:**
```json
{
  "inputs": {
    "specDraft": "...",
    "planTasks": "...",
    "documentDraft": "...",
    "criticReport": "# Quality Review Report\n\n..."
  }
}
```

#### Response

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "stepId": "SPECIFY",
    "output": "# Document Specification\n\n## Overview\nThis document outlines...",
    "metadata": {
      "agentPersona": "Requirements Analyst",
      "processingTime": "1.2s",
      "confidence": 0.95,
      "modelUsed": "gpt-4",
      "tokensUsed": 1247,
      "timestamp": "2025-11-16T10:30:45Z"
    }
  }
}
```

#### Step-Specific Metadata

**SPECIFY Metadata:**
```json
{
  "agentPersona": "Requirements Analyst",
  "processingTime": "1.2s",
  "confidence": 0.95,
  "sectionsIdentified": 5
}
```

**PLAN Metadata:**
```json
{
  "agentPersona": "Strategic Planner",
  "processingTime": "1.8s",
  "confidence": 0.92,
  "estimatedTasks": 12,
  "estimatedHours": 40
}
```

**DRAFT Metadata:**
```json
{
  "agentPersona": "Content Writer",
  "processingTime": "3.5s",
  "confidence": 0.88,
  "wordCount": 3247,
  "sectionsComplete": 8
}
```

**CRITIQUE Metadata:**
```json
{
  "agentPersona": "Quality Reviewer",
  "processingTime": "2.1s",
  "confidence": 0.94,
  "overallScore": 82,
  "criticalIssues": 3,
  "importantIssues": 7,
  "minorIssues": 12
}
```

**FINALIZE Metadata:**
```json
{
  "agentPersona": "Document Finalizer",
  "processingTime": "2.8s",
  "confidence": 0.96,
  "finalScore": 94,
  "wordCount": 9247,
  "pageCount": 32,
  "sectionsComplete": 15
}
```

#### Error Responses

**400 Bad Request** - Invalid input
```json
{
  "success": false,
  "error": {
    "code": "INVALID_STEP_ID",
    "message": "stepId must be one of: SPECIFY, PLAN, DRAFT, CRITIQUE, FINALIZE",
    "details": {
      "receivedStepId": "INVALID_STEP"
    },
    "timestamp": "2025-11-16T10:30:45Z",
    "requestId": "req_abc123xyz"
  }
}
```

**400 Bad Request** - Missing required inputs
```json
{
  "success": false,
  "error": {
    "code": "MISSING_REQUIRED_INPUT",
    "message": "Missing required input: specDraft",
    "details": {
      "stepId": "PLAN",
      "requiredInputs": ["specDraft"],
      "receivedInputs": []
    },
    "timestamp": "2025-11-16T10:30:45Z",
    "requestId": "req_abc123xyz"
  }
}
```

**401 Unauthorized** - Invalid or missing token
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired authentication token",
    "timestamp": "2025-11-16T10:30:45Z",
    "requestId": "req_abc123xyz"
  }
}
```

**429 Too Many Requests** - Rate limit exceeded
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please retry after 60 seconds.",
    "details": {
      "limit": 100,
      "remaining": 0,
      "resetAt": "2025-11-16T10:31:45Z"
    },
    "timestamp": "2025-11-16T10:30:45Z",
    "requestId": "req_abc123xyz"
  }
}
```

**500 Internal Server Error** - Server error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred while processing your request",
    "timestamp": "2025-11-16T10:30:45Z",
    "requestId": "req_abc123xyz"
  }
}
```

**503 Service Unavailable** - AI model unavailable
```json
{
  "success": false,
  "error": {
    "code": "AI_MODEL_UNAVAILABLE",
    "message": "The AI model is temporarily unavailable. Please retry.",
    "details": {
      "estimatedRetryAfter": 30
    },
    "timestamp": "2025-11-16T10:30:45Z",
    "requestId": "req_abc123xyz"
  }
}
```

---

### 2. Health Check

**Endpoint:** `GET /health`

**Description:** Check API health and status.

#### Request

```http
GET /api/v1/health
```

No authentication required for health check.

#### Response

**Success Response (200 OK):**

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-11-16T10:30:45Z",
  "services": {
    "api": "operational",
    "database": "operational",
    "aiModel": "operational"
  },
  "uptime": 86400
}
```

**Degraded Response (200 OK):**

```json
{
  "status": "degraded",
  "version": "1.0.0",
  "timestamp": "2025-11-16T10:30:45Z",
  "services": {
    "api": "operational",
    "database": "operational",
    "aiModel": "degraded"
  },
  "uptime": 86400,
  "issues": [
    "AI model response time elevated"
  ]
}
```

**Unhealthy Response (503 Service Unavailable):**

```json
{
  "status": "unhealthy",
  "version": "1.0.0",
  "timestamp": "2025-11-16T10:30:45Z",
  "services": {
    "api": "operational",
    "database": "operational",
    "aiModel": "unavailable"
  },
  "uptime": 86400,
  "issues": [
    "AI model connection failed"
  ]
}
```

---

### 3. Get API Version Info

**Endpoint:** `GET /version`

**Description:** Retrieve detailed API version information.

#### Request

```http
GET /api/v1/version
```

#### Response

**Success Response (200 OK):**

```json
{
  "version": "1.0.0",
  "apiVersion": "v1",
  "buildDate": "2025-11-15T12:00:00Z",
  "features": {
    "workflowSteps": ["SPECIFY", "PLAN", "DRAFT", "CRITIQUE", "FINALIZE"],
    "supportedLanguages": ["en", "es", "fr", "de"],
    "supportedModels": ["gpt-4", "gpt-3.5-turbo", "claude-3"]
  },
  "deprecations": [],
  "changelog": "https://api.documentagent.example.com/changelog"
}
```

---

## Data Models

### Step Configuration

Each workflow step has a defined configuration:

```typescript
interface StepConfig {
  id: 'SPECIFY' | 'PLAN' | 'DRAFT' | 'CRITIQUE' | 'FINALIZE';
  index: number;
  title: string;
  agentPersona: string;
  description: string;
  inputKeys: string[];
  outputKey: string;
  buttonLabel: string;
  icon: string;
  color: string;
}
```

**Example:**
```json
{
  "id": "SPECIFY",
  "index": 0,
  "title": "Step 1: Specify",
  "agentPersona": "Requirements Analyst",
  "description": "Define document requirements and scope",
  "inputKeys": ["initialPrompt"],
  "outputKey": "specDraft",
  "buttonLabel": "Run Step 1: Specify Requirements",
  "icon": "📋",
  "color": "blue"
}
```

### Generation Options

```typescript
interface GenerationOptions {
  temperature?: number;      // 0.0 to 1.0, default: 0.7
  maxTokens?: number;        // Max tokens to generate, default: 4000
  model?: string;            // AI model to use, default: "gpt-4"
  language?: string;         // Output language, default: "en"
  format?: 'markdown' | 'html' | 'plain';  // Output format, default: "markdown"
}
```

### Request Models

#### GenerateStepRequest

```typescript
interface GenerateStepRequest {
  stepId: 'SPECIFY' | 'PLAN' | 'DRAFT' | 'CRITIQUE' | 'FINALIZE';
  inputs: {
    initialPrompt?: string;
    specDraft?: string;
    planTasks?: string;
    documentDraft?: string;
    criticReport?: string;
    [key: string]: string | undefined;
  };
  options?: GenerationOptions;
}
```

### Response Models

#### GenerateStepResponse

```typescript
interface GenerateStepResponse {
  success: true;
  data: {
    stepId: string;
    output: string;  // Markdown content
    metadata: StepMetadata;
  };
}
```

#### StepMetadata

```typescript
interface StepMetadata {
  agentPersona: string;
  processingTime: string;
  confidence: number;
  modelUsed?: string;
  tokensUsed?: number;
  timestamp: string;  // ISO 8601

  // Step-specific fields
  sectionsIdentified?: number;     // SPECIFY
  estimatedTasks?: number;         // PLAN
  estimatedHours?: number;         // PLAN
  wordCount?: number;              // DRAFT, FINALIZE
  sectionsComplete?: number;       // DRAFT, FINALIZE
  overallScore?: number;           // CRITIQUE, FINALIZE
  criticalIssues?: number;         // CRITIQUE
  importantIssues?: number;        // CRITIQUE
  minorIssues?: number;            // CRITIQUE
  finalScore?: number;             // FINALIZE
  pageCount?: number;              // FINALIZE
}
```

#### ErrorResponse

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;  // ISO 8601
    requestId: string;
  };
}
```

### Workflow State Management

The client is responsible for managing workflow state. Here's a recommended state model:

```typescript
interface WorkflowState {
  currentStepIndex: number;  // 0-4
  results: {
    [key: string]: string;  // Original AI outputs
  };
  editedResults: {
    [key: string]: string;  // User-edited outputs
  };
  savedSteps: Set<string>;  // Which steps have been saved
  versionHistory: VersionHistoryEntry[];
}

interface VersionHistoryEntry {
  stepId: string;
  version: number;
  content: string;
  timestamp: string;
  editType: 'ai' | 'user';
}
```

---

## Workflow Description

### Complete Workflow Example

This section demonstrates a complete end-to-end workflow for creating a business document.

#### 1. SPECIFY Phase

**User Input:**
```
"Create a market analysis report for a new SaaS product targeting small businesses in the retail sector. Include competitive analysis, market sizing, and go-to-market recommendations."
```

**API Request:**
```http
POST /api/v1/document/generate-step
Authorization: Bearer <token>
Content-Type: application/json

{
  "stepId": "SPECIFY",
  "inputs": {
    "initialPrompt": "Create a market analysis report for a new SaaS product targeting small businesses in the retail sector. Include competitive analysis, market sizing, and go-to-market recommendations."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stepId": "SPECIFY",
    "output": "# Document Specification\n\n## Overview\n\n### Document Type\nMarket Analysis Report...",
    "metadata": {
      "agentPersona": "Requirements Analyst",
      "processingTime": "1.2s",
      "confidence": 0.95,
      "sectionsIdentified": 5
    }
  }
}
```

#### 2. PLAN Phase

**API Request:**
```http
POST /api/v1/document/generate-step

{
  "stepId": "PLAN",
  "inputs": {
    "specDraft": "# Document Specification\n\n## Overview\n\n### Document Type\nMarket Analysis Report..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stepId": "PLAN",
    "output": "# Implementation Plan\n\n## Task Breakdown\n\n### Phase 1: Market Research...",
    "metadata": {
      "agentPersona": "Strategic Planner",
      "processingTime": "1.8s",
      "confidence": 0.92,
      "estimatedTasks": 12,
      "estimatedHours": 40
    }
  }
}
```

#### 3. DRAFT Phase

**API Request:**
```http
POST /api/v1/document/generate-step

{
  "stepId": "DRAFT",
  "inputs": {
    "specDraft": "...",
    "planTasks": "..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stepId": "DRAFT",
    "output": "# Market Analysis Report\n\n## Executive Summary\n\nThe retail SaaS market...",
    "metadata": {
      "agentPersona": "Content Writer",
      "processingTime": "3.5s",
      "confidence": 0.88,
      "wordCount": 3247,
      "sectionsComplete": 8
    }
  }
}
```

#### 4. CRITIQUE Phase

**API Request:**
```http
POST /api/v1/document/generate-step

{
  "stepId": "CRITIQUE",
  "inputs": {
    "specDraft": "...",
    "planTasks": "...",
    "documentDraft": "..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stepId": "CRITIQUE",
    "output": "# Quality Review Report\n\n## Overall Assessment\nScore: 82/100...",
    "metadata": {
      "agentPersona": "Quality Reviewer",
      "processingTime": "2.1s",
      "confidence": 0.94,
      "overallScore": 82,
      "criticalIssues": 3,
      "importantIssues": 7,
      "minorIssues": 12
    }
  }
}
```

#### 5. FINALIZE Phase

**API Request:**
```http
POST /api/v1/document/generate-step

{
  "stepId": "FINALIZE",
  "inputs": {
    "specDraft": "...",
    "planTasks": "...",
    "documentDraft": "...",
    "criticReport": "..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stepId": "FINALIZE",
    "output": "# Market Analysis Report\n\n*Final Version - Quality Score: 94/100*...",
    "metadata": {
      "agentPersona": "Document Finalizer",
      "processingTime": "2.8s",
      "confidence": 0.96,
      "finalScore": 94,
      "wordCount": 9247,
      "pageCount": 32,
      "sectionsComplete": 15
    }
  }
}
```

### Handling Edits

Users can edit outputs between steps. The client should:

1. Store original AI output in `results[stepId]`
2. Store user edits in `editedResults[stepId]`
3. When calling the next step, use edited version if available:

```javascript
const inputValue = editedResults[outputKey] || results[outputKey];
```

### Critique Accept/Reject Flow

The CRITIQUE step has special handling:

1. User reviews critique report
2. User either:
   - **Accepts** → Proceeds to FINALIZE with critique report
   - **Rejects** → Returns to DRAFT step to re-generate draft

This is a client-side decision; no special API call needed.

---

## Error Handling

### Error Codes

| Code | HTTP Status | Description | Retry? |
|------|-------------|-------------|--------|
| `INVALID_STEP_ID` | 400 | stepId is not one of the allowed values | No |
| `MISSING_REQUIRED_INPUT` | 400 | Required input field missing for this step | No |
| `INVALID_INPUT_FORMAT` | 400 | Input data is malformed or invalid | No |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication token | No |
| `FORBIDDEN` | 403 | Valid token but insufficient permissions | No |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests, rate limit exceeded | Yes, after delay |
| `INTERNAL_ERROR` | 500 | Unexpected server error | Yes, with backoff |
| `AI_MODEL_UNAVAILABLE` | 503 | AI model service is unavailable | Yes, after delay |
| `TIMEOUT` | 504 | Request processing timeout | Yes, with backoff |

### Retry Strategy

Recommended retry logic for transient errors:

```javascript
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 || error.status >= 500) {
        const delay = Math.min(1000 * Math.pow(2, i), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;  // Don't retry client errors
      }
    }
  }
  throw new Error('Max retries exceeded');
}
```

### Input Validation

The API validates:

1. **Step ID**: Must be one of the 5 valid step IDs
2. **Required Inputs**: Each step requires specific inputs
3. **Input Format**: Inputs must be non-empty strings
4. **Token Length**: Inputs cannot exceed 100,000 characters combined
5. **Options**: temperature (0-1), maxTokens (1-10000)

**Validation Error Example:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT_FORMAT",
    "message": "Input validation failed",
    "details": {
      "errors": [
        {
          "field": "inputs.initialPrompt",
          "message": "Must be a non-empty string",
          "received": ""
        },
        {
          "field": "options.temperature",
          "message": "Must be between 0 and 1",
          "received": 1.5
        }
      ]
    }
  }
}
```

---

## Rate Limiting

### Rate Limit Tiers

| Tier | Requests/Minute | Requests/Hour | Requests/Day |
|------|-----------------|---------------|--------------|
| **Free** | 10 | 100 | 1,000 |
| **Pro** | 60 | 1,000 | 10,000 |
| **Enterprise** | 300 | 5,000 | 50,000 |

### Rate Limit Headers

All responses include rate limit information in headers:

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1700136645
```

### Rate Limit Response

When limit is exceeded:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1700136645

{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please retry after 60 seconds.",
    "details": {
      "limit": 60,
      "remaining": 0,
      "resetAt": "2025-11-16T10:31:45Z"
    }
  }
}
```

### Best Practices

1. **Check Headers**: Always check rate limit headers before making next request
2. **Implement Backoff**: Use exponential backoff for retries
3. **Cache Results**: Cache outputs to avoid redundant API calls
4. **Batch Operations**: Minimize API calls by batching when possible
5. **Monitor Usage**: Track your rate limit consumption

---

## Security Considerations

### Authentication & Authorization

1. **JWT Tokens**: Use secure JWT tokens with reasonable expiration times (1 hour)
2. **HTTPS Only**: All API communication must use HTTPS
3. **Token Storage**: Store tokens securely (encrypted storage, not localStorage)
4. **Token Refresh**: Implement automatic token refresh before expiration

### Data Privacy

1. **Input Data**: All user inputs are treated as confidential
2. **Output Data**: Generated documents are private to the user
3. **No Retention**: Inputs/outputs are not stored longer than necessary for processing
4. **Encryption**: All data encrypted in transit (TLS 1.3) and at rest (AES-256)

### Input Sanitization

1. **Markdown Injection**: Outputs are sanitized to prevent malicious markdown
2. **XSS Prevention**: All HTML rendering must escape user content
3. **Length Limits**: Maximum input lengths enforced to prevent abuse
4. **Content Filtering**: Inappropriate content is filtered/blocked

### API Security

1. **CORS**: Properly configured CORS headers for web clients
2. **CSRF Protection**: CSRF tokens for state-changing operations
3. **Request Validation**: All inputs validated and sanitized
4. **Audit Logging**: All API calls logged for security auditing

### Recommended Client Implementation

```javascript
// Secure API client example
class DocumentAgentAPI {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.token = null;
    this.refreshToken = null;
  }

  async authenticate(apiKey, apiSecret) {
    const response = await fetch(`${this.baseURL}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, apiSecret })
    });
    const data = await response.json();
    this.token = data.access_token;
    this.refreshToken = data.refresh_token;
  }

  async generateStep(stepId, inputs, options = {}) {
    // Auto-refresh token if needed
    await this.ensureValidToken();

    const response = await fetch(`${this.baseURL}/document/generate-step`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stepId, inputs, options })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(error);
    }

    return await response.json();
  }

  async ensureValidToken() {
    // Check if token is about to expire and refresh if needed
    // Implementation details omitted for brevity
  }
}
```

---

## Changelog

### Version 1.0.0 (2025-11-16)

**Initial Release**

- 5-step document generation workflow
- POST `/document/generate-step` endpoint
- GET `/health` endpoint
- GET `/version` endpoint
- JWT authentication
- Rate limiting
- Comprehensive error handling
- Markdown output format
- Step-specific metadata

### Planned Future Enhancements

**Version 1.1.0** (Planned Q1 2026)
- Add support for document templates
- Add batch processing endpoint
- Add webhook notifications for long-running operations
- Add document export formats (PDF, DOCX)

**Version 2.0.0** (Planned Q2 2026)
- Breaking: New authentication mechanism (OAuth 2.0)
- Add support for custom agent personas
- Add collaborative editing features
- Add document versioning API
- Add analytics endpoints

---

## Appendix A: Complete cURL Examples

### Health Check

```bash
curl -X GET https://api.documentagent.example.com/api/v1/health
```

### Authentication

```bash
curl -X POST https://api.documentagent.example.com/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "your_api_key",
    "apiSecret": "your_api_secret"
  }'
```

### SPECIFY Step

```bash
curl -X POST https://api.documentagent.example.com/api/v1/document/generate-step \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stepId": "SPECIFY",
    "inputs": {
      "initialPrompt": "Create a market analysis report for a new SaaS product targeting small businesses in the retail sector."
    },
    "options": {
      "temperature": 0.7,
      "maxTokens": 4000
    }
  }'
```

### PLAN Step

```bash
curl -X POST https://api.documentagent.example.com/api/v1/document/generate-step \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stepId": "PLAN",
    "inputs": {
      "specDraft": "# Document Specification\n\n..."
    }
  }'
```

### DRAFT Step

```bash
curl -X POST https://api.documentagent.example.com/api/v1/document/generate-step \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stepId": "DRAFT",
    "inputs": {
      "specDraft": "...",
      "planTasks": "..."
    }
  }'
```

### CRITIQUE Step

```bash
curl -X POST https://api.documentagent.example.com/api/v1/document/generate-step \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stepId": "CRITIQUE",
    "inputs": {
      "specDraft": "...",
      "planTasks": "...",
      "documentDraft": "..."
    }
  }'
```

### FINALIZE Step

```bash
curl -X POST https://api.documentagent.example.com/api/v1/document/generate-step \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stepId": "FINALIZE",
    "inputs": {
      "specDraft": "...",
      "planTasks": "...",
      "documentDraft": "...",
      "criticReport": "..."
    }
  }'
```

---

## Appendix B: TypeScript Type Definitions

```typescript
// Complete TypeScript definitions for the API

export type StepId = 'SPECIFY' | 'PLAN' | 'DRAFT' | 'CRITIQUE' | 'FINALIZE';

export interface GenerationOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
  language?: string;
  format?: 'markdown' | 'html' | 'plain';
}

export interface GenerateStepRequest {
  stepId: StepId;
  inputs: {
    initialPrompt?: string;
    specDraft?: string;
    planTasks?: string;
    documentDraft?: string;
    criticReport?: string;
    [key: string]: string | undefined;
  };
  options?: GenerationOptions;
}

export interface StepMetadata {
  agentPersona: string;
  processingTime: string;
  confidence: number;
  modelUsed?: string;
  tokensUsed?: number;
  timestamp: string;
  sectionsIdentified?: number;
  estimatedTasks?: number;
  estimatedHours?: number;
  wordCount?: number;
  sectionsComplete?: number;
  overallScore?: number;
  criticalIssues?: number;
  importantIssues?: number;
  minorIssues?: number;
  finalScore?: number;
  pageCount?: number;
}

export interface GenerateStepResponse {
  success: true;
  data: {
    stepId: string;
    output: string;
    metadata: StepMetadata;
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId: string;
  };
}

export type APIResponse = GenerateStepResponse | ErrorResponse;

export interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  timestamp: string;
  services: {
    api: string;
    database: string;
    aiModel: string;
  };
  uptime: number;
  issues?: string[];
}

export interface VersionResponse {
  version: string;
  apiVersion: string;
  buildDate: string;
  features: {
    workflowSteps: StepId[];
    supportedLanguages: string[];
    supportedModels: string[];
  };
  deprecations: any[];
  changelog: string;
}

export interface AuthTokenRequest {
  apiKey: string;
  apiSecret: string;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}
```

---

## Support & Contact

For API support, questions, or feedback:

- **Documentation**: https://docs.documentagent.example.com
- **API Status**: https://status.documentagent.example.com
- **Support Email**: api-support@documentagent.example.com
- **Developer Forum**: https://forum.documentagent.example.com

---

**End of API Specification**
