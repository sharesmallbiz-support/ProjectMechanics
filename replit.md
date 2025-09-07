# Project Mechanics

## Overview

Project Mechanics is a comprehensive project management platform that combines methodology education with practical PMO tools and content management capabilities. The application integrates the theoretical "art and science" of project management with real-world application through three core domains: methodology documentation, PMO dashboard functionality, and a blog engine for knowledge sharing. Built as a full-stack TypeScript application, it serves as both an educational resource and a working project management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with centralized error handling
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas shared between client and server
- **Development**: Hot module replacement via Vite middleware integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database serverless
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Data Models**: Users, Programs, Projects, Tasks, Blog Posts, Comments, and Media entities
- **Relationships**: Hierarchical structure (Programs → Projects → Tasks) with user assignments

### Authentication and Authorization
- **Current State**: Basic user schema with role-based access control structure
- **User Roles**: Support for different user types (user, admin, manager)
- **Session Management**: Prepared for cookie-based authentication

### Media Management
- **Cloud Storage**: Google Cloud Storage integration for file uploads
- **File Upload**: Uppy.js components for drag-and-drop functionality
- **External APIs**: YouTube API integration for video embedding and Unsplash API for stock photography
- **Rich Content**: Support for multimedia content in blog posts and project documentation

### Content Management
- **Blog Engine**: Full CRUD operations for blog posts with rich text editing
- **Publishing Workflow**: Draft and published states for content
- **Category System**: Organized content categorization
- **Comment System**: Threaded commenting on blog posts
- **SEO**: Slug-based URLs for blog posts

### Project Management Features
- **Hierarchical Structure**: Programs contain Projects which contain Tasks
- **Status Tracking**: Comprehensive status management across all entities
- **Progress Monitoring**: Progress bars and completion tracking
- **Assignment System**: User assignment to projects and tasks
- **Priority Management**: Task prioritization system

### Development and Deployment
- **Build Process**: Vite for frontend bundling and esbuild for server compilation
- **Environment**: Development and production configurations with Replit integration
- **Code Quality**: TypeScript strict mode with comprehensive type safety
- **Component Library**: Extensive UI component library with consistent design system

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Database toolkit and query builder

### Cloud Storage
- **Google Cloud Storage**: File and media storage service

### Third-Party APIs
- **YouTube Data API**: Video search and embedding functionality
- **Unsplash API**: Stock photography integration

### Development Tools
- **Replit Platform**: Development environment with specialized plugins
- **Vite**: Build tool with development server and HMR

### UI and Component Libraries
- **Radix UI**: Unstyled, accessible UI primitives
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **Uppy**: File upload library with cloud storage support

### Form and Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation library
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Styling and Design
- **Tailwind CSS**: Utility-first CSS framework
- **Autoprefixer**: CSS vendor prefixing
- **Google Fonts**: Typography (Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter)

### State Management
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing library