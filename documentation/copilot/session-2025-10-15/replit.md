# Project Mechanics

## Overview

Project Mechanics is a 100% static educational website focused on comprehensive project management methodology content. Deployed via GitHub Pages at ProjectMechanics.org, the site emphasizes the "Methodology First, Consulting Second" positioning as a pure educational platform without any interactive features. Built as a React-based static site, it serves as an educational resource for project management professionals.

## User Preferences

Preferred communication style: Simple, everyday language.

## Site Architecture

### Static Site Configuration
- **Type**: 100% Static Educational Website
- **Deployment**: GitHub Pages from `/docs` folder
- **Domain**: ProjectMechanics.org (via CNAME)
- **No Backend**: Pure client-side static content delivery
- **No Database**: All content is pre-built at compile time
- **No Interactivity**: Educational content only, no forms or user input

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter with hash-based navigation for GitHub Pages compatibility
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Output**: Static HTML, CSS, and JavaScript in `/docs` folder

### Content Structure
The site includes comprehensive methodology pages:
- **Home**: Landing page with site overview
- **Methodology Hub**: Central navigation for all methodology sections
- **Project Management**: Core project management concepts and practices
- **Portfolio Management**: PMO structure, account management, skill sets, and processes
- **Change Management**: Change management methodologies and best practices
- **Conflict Management**: Conflict resolution strategies and techniques
- **Leadership**: Leadership principles and practices
- **Glossary**: Comprehensive project management terminology
- **History**: Evolution of Project Mechanics methodology (2002-2019)

### Build and Deployment
- **Build Tool**: Vite with static site generation
- **Build Command**: `npx vite build --outDir ../docs --base ./ --emptyOutDir`
- **Build Script**: `./build-static.sh` for convenient static builds (recommended)
- **Output Directory**: `/docs` folder at project root (GitHub Pages standard)
- **Base Path**: Relative (`./`) for GitHub Pages compatibility
- **Assets**: All assets bundled with relative paths
- **Preview Server**: Minimal Express server (`server/index.ts`) serves /docs folder for local testing

### GitHub Pages Configuration
- **Publishing Source**: `/docs` folder on main branch
- **Custom Domain**: ProjectMechanics.org (configured via CNAME file)
- **Jekyll Processing**: Disabled via `.nojekyll` file
- **Routing**: Hash-based (#/) for SPA compatibility on GitHub Pages

## Development Tools

### Build and Development
- **Replit Platform**: Development environment
- **Vite**: Build tool with development server and HMR
- **TypeScript**: Type safety and enhanced developer experience

### UI and Component Libraries
- **Radix UI**: Unstyled, accessible UI primitives
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **Google Fonts**: Typography (Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter)

### Routing
- **Wouter**: Lightweight routing library with hash location support for static hosting