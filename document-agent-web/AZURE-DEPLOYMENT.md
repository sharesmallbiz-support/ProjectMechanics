# Azure App Service Deployment Guide

This guide explains how to deploy the unified Project Mechanics site to Azure App Service (Linux).

## Prerequisites

- Azure subscription
- Azure CLI installed (`az cli`)
- Node.js 18+ installed locally
- Git repository access

## Architecture

The unified site includes:
- **Project Mechanics Methodology** - Static content pages with SEO optimization
- **Document Agent Tool** - Interactive 5-step document generation workflow
- **FastAPI Backend** - Document generation API (deployed separately)

## Build Configuration

The application is configured for Azure App Service with:
- **React Router** - Client-side routing with history mode
- **web.config** - IIS URL rewriting for SPA routing
- **SEO** - Sitemap.xml, robots.txt, and meta tags
- **Compression** - Gzip compression for static assets

## Deployment Steps

### 1. Build the Application

```bash
cd document-agent-web
npm install
npm run build
```

This will:
- Build the React application to `dist/`
- Generate `sitemap.xml` automatically
- Copy `web.config` and `robots.txt` to `dist/`

### 2. Create Azure App Service

```bash
# Login to Azure
az login

# Create resource group (if needed)
az group create --name project-mechanics-rg --location eastus

# Create App Service Plan (Linux, Node.js)
az appservice plan create \
  --name project-mechanics-plan \
  --resource-group project-mechanics-rg \
  --is-linux \
  --sku B1

# Create Web App
az webapp create \
  --name project-mechanics \
  --resource-group project-mechanics-rg \
  --plan project-mechanics-plan \
  --runtime "NODE:18-lts"
```

### 3. Configure App Settings

```bash
# Set deployment configuration
az webapp config appsettings set \
  --name project-mechanics \
  --resource-group project-mechanics-rg \
  --settings \
    SCM_DO_BUILD_DURING_DEPLOYMENT=true \
    WEBSITE_NODE_DEFAULT_VERSION=18-lts
```

### 4. Deploy Using Git

#### Option A: Local Git Deployment

```bash
# Get deployment credentials
az webapp deployment user set \
  --user-name <username> \
  --password <password>

# Get Git URL
az webapp deployment source config-local-git \
  --name project-mechanics \
  --resource-group project-mechanics-rg

# Add Azure remote
git remote add azure <git-url-from-previous-command>

# Deploy
git push azure claude/unify-frontends-api-01LiWoNfZLqwzHzxKN3hgL1u:master
```

#### Option B: GitHub Actions Deployment

Create `.github/workflows/azure-deploy.yml`:

```yaml
name: Deploy to Azure App Service

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install and Build
        run: |
          cd document-agent-web
          npm ci
          npm run build

      - name: Deploy to Azure
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'project-mechanics'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: document-agent-web/dist
```

#### Option C: ZIP Deployment

```bash
# Build locally
npm run build

# Create ZIP file
cd dist
zip -r ../dist.zip *
cd ..

# Deploy ZIP
az webapp deployment source config-zip \
  --name project-mechanics \
  --resource-group project-mechanics-rg \
  --src dist.zip
```

### 5. Configure Custom Domain (Optional)

```bash
# Add custom domain
az webapp config hostname add \
  --webapp-name project-mechanics \
  --resource-group project-mechanics-rg \
  --hostname projectmechanics.com

# Enable HTTPS
az webapp config ssl bind \
  --name project-mechanics \
  --resource-group project-mechanics-rg \
  --certificate-thumbprint <thumbprint> \
  --ssl-type SNI
```

## Backend API Configuration

The Document Agent tool requires the FastAPI backend. Deploy it separately:

### Deploy Backend to Azure App Service

```bash
# Create Web App for Python
az webapp create \
  --name project-mechanics-api \
  --resource-group project-mechanics-rg \
  --plan project-mechanics-plan \
  --runtime "PYTHON:3.11"

# Deploy from document-agent-api directory
cd document-agent-api
az webapp up \
  --name project-mechanics-api \
  --resource-group project-mechanics-rg
```

### Update Frontend API URL

Update `/home/user/ProjectMechanics/document-agent-web/src/services/api.js`:

```javascript
const API_BASE_URL = 'https://project-mechanics-api.azurewebsites.net/api/v1';
```

## Environment Variables

Set these in Azure App Service Configuration:

### Frontend
```
NODE_ENV=production
```

### Backend
```
OPENAI_API_KEY=<your-key>
CORS_ORIGINS=https://project-mechanics.azurewebsites.net,https://projectmechanics.com
```

## Monitoring & Troubleshooting

### View Logs
```bash
az webapp log tail \
  --name project-mechanics \
  --resource-group project-mechanics-rg
```

### Enable Application Insights
```bash
az monitor app-insights component create \
  --app project-mechanics-insights \
  --location eastus \
  --resource-group project-mechanics-rg

# Link to Web App
az webapp config appsettings set \
  --name project-mechanics \
  --resource-group project-mechanics-rg \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=<key>
```

### Common Issues

**Issue: 404 on page refresh**
- Ensure `web.config` is in the dist/ folder
- Verify URL rewriting rules are active

**Issue: API calls fail**
- Check CORS configuration in backend
- Verify API URL in frontend code
- Check network security groups

**Issue: Build fails**
- Check Node.js version (must be 18+)
- Verify all dependencies are installed
- Check build logs in Azure Portal

## Performance Optimization

1. **Enable CDN**
```bash
az cdn profile create \
  --name project-mechanics-cdn \
  --resource-group project-mechanics-rg \
  --sku Standard_Microsoft
```

2. **Configure Caching**
- Static assets cached via `web.config`
- Browser caching headers set automatically

3. **Compression**
- Gzip enabled in `web.config`
- Brotli supported by Azure App Service

## Security

1. **HTTPS Only**
```bash
az webapp update \
  --name project-mechanics \
  --resource-group project-mechanics-rg \
  --https-only true
```

2. **Security Headers**
- Already configured in `web.config`
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

## Cost Optimization

- **B1 Basic Plan**: ~$13/month
- **Free Plan**: Available for testing (limited performance)
- **Auto-scaling**: Configure based on traffic

## Support

For issues or questions:
- Check Azure Portal logs
- Review `AZURE-DEPLOYMENT.md`
- Contact: Mark Hazleton
