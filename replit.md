# Overview

This is a French automotive services application called "MY JANTES" that specializes in aluminum wheel renovation and customization services. The application provides a complete business management system for wheel restoration services including online booking, quote requests, customer management, and service administration. It features a modern responsive web interface with PWA capabilities for mobile users.

**Latest Update (15 août 2025):** ✅ TRANSFORMATION FLUTTER TERMINÉE - Application React entièrement convertie en application Flutter native multi-plateforme (iOS/Android/Web). Inclut tous les écrans, authentification, pages légales RGPD, thème authentique My Jantes, et backend WordPress prêt pour déploiement Hostinger. Structure complète dans flutter_app/ avec guide d'installation détaillé.

# User Preferences

Preferred communication style: Simple, everyday language.
Typography: Roboto font family with Roboto Condensed for headings matching official branding.
Design: Professional aesthetic matching myjantes.fr with authentic logo integration.
Legal Compliance: Complete RGPD-compliant pages for Google Play/App Store validation.

# System Architecture

## Frontend Architecture
- **React + TypeScript** single-page application using Vite as the build tool
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **PWA Features**: Service worker implementation with offline caching and mobile manifest

## Backend Architecture
- **Express.js** server with TypeScript for the REST API
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **API Design**: RESTful endpoints following standard HTTP methods
- **Middleware**: CORS handling, request logging, and authentication middleware
- **Development**: Hot reloading with Vite integration for seamless full-stack development

## Data Storage Solutions
- **Primary Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Fallback**: In-memory storage implementation for development/testing

## Authentication and Authorization
- **JWT Tokens**: Stateless authentication using JSON Web Tokens
- **Password Security**: bcrypt hashing with salt rounds for secure password storage
- **Protected Routes**: Middleware-based route protection on both client and server
- **Session Management**: Token-based sessions with automatic refresh handling

## File Storage and Management
- **Google Cloud Storage**: Primary file storage for images and documents
- **Access Control**: Custom ACL (Access Control List) system for object-level permissions
- **File Upload**: Uppy.js integration with dashboard modal for rich upload experience
- **Direct Upload**: Presigned URL pattern for secure direct-to-cloud uploads

## Business Logic Architecture
The application is structured around core business entities:
- **Users**: Customer registration and profile management
- **Services**: Predefined service catalog (renovation, customization, etc.)
- **Bookings**: Appointment scheduling with vehicle and customer details
- **Quotes**: Estimate requests with photo upload capabilities
- **Invoices**: Billing and payment tracking

## Progressive Web App Features
- **Service Worker**: Offline functionality and resource caching
- **Web App Manifest**: Native app-like installation on mobile devices
- **Responsive Design**: Mobile-first approach with touch-friendly interfaces
- **Performance Optimization**: Code splitting and lazy loading for optimal load times

# External Dependencies

## Flutter/Mobile Dependencies
- **Flutter SDK 3.16+**: Cross-platform mobile development framework
- **Dart SDK 3.0+**: Programming language for Flutter applications
- **Google Fonts**: Roboto and Roboto Condensed typography integration
- **Provider**: State management for Flutter applications
- **GoRouter**: Declarative routing for navigation
- **HTTP Package**: Network requests and API communication
- **Image Picker**: Camera and gallery access for photo uploads
- **Flutter Secure Storage**: Encrypted local data storage
- **Cached Network Image**: Optimized image loading and caching

## Backend/WordPress Dependencies
- **WordPress 6.0+**: Content management system and API backend
- **MySQL Database**: Hostinger database for WordPress
- **Custom REST API**: Endpoint `/wp-json/myjantes/v1/` for mobile app
- **SMTP Configuration**: Email notifications via Hostinger
- **PHP 8.0+**: Server-side processing for WordPress functions

## Original React Dependencies (Legacy)
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database toolkit with automatic migrations
- **Radix UI**: Accessible component primitives for complex UI components
- **TanStack Query**: Server state synchronization and caching
- **Vite**: Fast build tool with HMR and optimized production builds
- **TypeScript**: Static type checking across the entire application
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

## Deployment Platforms
- **Google Play Store**: Android app distribution
- **Apple App Store**: iOS app distribution  
- **Hostinger**: WordPress backend hosting
- **Web Hosting**: Flutter web version deployment