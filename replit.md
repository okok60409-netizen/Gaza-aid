# Gaza Relief - Charity Directory Platform

## Overview
Gaza Relief is a React-based web application that serves as a directory platform for verified Muslim charities providing humanitarian aid to Gaza. The application features a modern, dark-themed interface built with shadcn/ui components and focuses on connecting donors with legitimate charitable organizations. Updated with simplified donation section and Vercel compatibility.

## User Preferences
- Preferred communication style: Simple, everyday language
- Statistics updated: "5+ Verified Charities" instead of "15+"
- Removed aid categories section for cleaner UI
- Islamic phrase: "Allah S.W.T knows best, and we can only guess"

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development**: Hot reload with Vite integration in development mode
- **Storage**: In-memory storage implementation with interface for future database integration

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (via Neon database service)
- **Schema**: Zod schemas for type-safe data validation
- **Current Implementation**: Static data with in-memory fallback storage

## Key Components

### Client-Side Components
1. **Navigation System**: Fixed navbar with smooth scrolling to sections
2. **Hero Section**: Landing area with call-to-action and simplified statistics (5+ charities, 24/7 support)
3. **Donations Section**: Direct charity listings with donation links (replaces separate categories and featured sections)
4. **About Section**: Information about the platform and mission
5. **Contact Section**: Support and contact information
6. **Footer**: Additional navigation and platform details

### Backend Components
1. **Route Handler**: Minimal API with health check endpoint
2. **Storage Interface**: Abstracted storage layer supporting user management
3. **Vite Integration**: Development server with HMR support
4. **Error Handling**: Global error middleware for API requests

### Data Models
- **Charity Schema**: Organization details, categories, verification status
- **Category Schema**: Aid categories with descriptions and organization counts
- **User Schema**: Basic user model (for future authentication)

## Data Flow

### Static Content Flow
1. Charity and category data is statically defined in `/client/src/data/charities.ts`
2. Components import and render this data directly
3. External donation links redirect users to charity websites
4. No server-side data persistence for charity information currently

### User Interaction Flow
1. Users browse charities through the single-page interface
2. Direct access to donation section with all verified charities
3. Donation actions open external charity websites in new tabs
4. All interactions are client-side with no backend API calls

### Future Database Integration
- Drizzle ORM is configured and ready for PostgreSQL integration
- Database migrations directory exists for schema management
- Storage interface allows easy swapping from in-memory to database storage

## External Dependencies

### Core Dependencies
- **UI Framework**: React with TypeScript support
- **Component Library**: Radix UI primitives via shadcn/ui
- **Styling**: Tailwind CSS with PostCSS processing
- **State Management**: TanStack Query for data fetching
- **Routing**: Wouter for lightweight client-side routing
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Validation**: Zod for schema validation

### Development Tools
- **Build Tool**: Vite with React plugin
- **Development**: tsx for TypeScript execution
- **Database Tools**: Drizzle Kit for migrations
- **Replit Integration**: Runtime error overlay and cartographer plugins

### Third-Party Services
- **Database Hosting**: Neon Database (PostgreSQL)
- **External Donations**: Direct links to charity websites
- **Development**: Replit platform integration

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` starts Vite dev server with Express backend
- **Hot Reload**: Vite HMR for frontend changes
- **Backend Integration**: Express serves API and static files in development

### Production Build
- **Frontend Build**: Vite builds optimized React application
- **Backend Build**: esbuild bundles Express server for Node.js
- **Static Assets**: Frontend builds to `dist/public` directory
- **Server Bundle**: Backend builds to `dist/index.js`

### Production Deployment
- **Start Command**: `npm start` runs the production Express server
- **Static Serving**: Express serves built frontend files
- **API Routes**: Express handles `/api/*` routes
- **Environment**: Requires `DATABASE_URL` for PostgreSQL connection

### Database Management
- **Schema Migrations**: `npm run db:push` applies schema changes
- **Environment Variables**: `DATABASE_URL` required for database connection
- **ORM Configuration**: Drizzle configured for PostgreSQL dialect

### Platform Integration
- **Vercel Compatibility**: Fully optimized for Vercel serverless deployment
  - Serverless function entry point at `/api/index.ts`
  - Static build configuration with `@vercel/static-build`
  - Dynamic CORS handling for Vercel domains
  - Environment-aware routing (development vs production)
  - Optimized build process with proper asset handling
- **Development**: Replit development environment support maintained
- **File System**: Strict file system access controls for security

### Recent Changes (July 26, 2025)
- Updated statistics from "15+" to "5+" verified charities
- Removed aid categories section for simplified UI
- Combined donation categories and featured charities into single donations section
- Updated Islamic phrase to "Allah S.W.T knows best, and we can only guess"
- Added Vercel deployment configuration
- Streamlined component structure for better maintainability
- Removed contact and support sections
- Implemented military-grade security features:
  - IP address masking (xxx.xxx format in logs)
  - Helmet.js security headers
  - Rate limiting (100 requests per 15 minutes)
  - CORS restrictions
  - Server signature removal
  - Content Security Policy
  - Anonymous logging system
- Made fully Vercel-compatible:
  - Added serverless function support
  - Created proper build configuration
  - Implemented environment-aware CORS
  - Added Vercel-specific routing
  - Created deployment documentation
  - Added .vercelignore for optimized builds