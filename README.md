# 🚀 Job Application Portal - Nimble Gravity Test

> A modern, production-ready React application built with TypeScript, featuring authentication, job browsing, and application submission capabilities.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=github)](https://brunocarda2005.github.io/test-Nimble/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vite.dev/)

## 🌐 Live Demo

**[View Live Application →](https://brunocarda2005.github.io/test-Nimble/)**

Try it out! The application is deployed and fully functional on GitHub Pages.

## ✅ Requirements Fulfilled

All the requirements from the technical test have been successfully completed:

1. ✔️ **API Integration** - Full integration with the provided REST API endpoints for authentication and job management
2. ✔️ **User Authentication** - Email-based login system with validation and error handling
3. ✔️ **Job Listing Display** - Dynamic rendering of available job positions fetched from the API
4. ✔️ **Job Application Submission** - Form-based application with GitHub repository URL validation
5. ✔️ **TypeScript Implementation** - 100% TypeScript codebase with strict typing throughout
6. ✔️ **React Best Practices** - Modern functional components, hooks, and component composition
7. ✔️ **Responsive Design** - Mobile-first approach with responsive layouts
8. ✔️ **Error Handling** - Comprehensive error management and user feedback

## 🎯 Additional Features

I decided to go beyond the basic requirements to demonstrate my commitment to delivering high-quality, production-ready code:

### 🌍 Internationalization (i18n)

- **Bilingual Support**: English and Spanish translations throughout the entire application
- **Dynamic Language Switching**: Users can toggle between languages in real-time
- **Translation Key System**: Centralized translation management with type-safe keys

### 🎨 Theme System

- **Dark & Light Modes**: Complete theme switching capability
- **Persistent Preferences**: Theme and language choices are saved in localStorage
- **Dynamic Styling**: CSS variables that update in real-time based on theme selection

### 📱 Advanced UX Features

- **Sticky Navigation**: Candidate info card stays visible while scrolling through jobs
- **Loading States**: Smooth loading indicators with proper ARIA attributes
- **Form Validation**: Real-time URL validation with user-friendly error messages
- **Success Feedback**: Clear visual feedback when applications are submitted successfully
- **Accessibility**: ARIA labels, roles, and landmarks for screen reader compatibility

### 🏗️ Architecture & Code Quality

- **Clean Architecture**: Organized folder structure separating concerns (components, services, contexts, utils)
- **Custom Hooks**: Reusable hooks for authentication, translation, and theme management
- **React Context API**: Global state management without external dependencies
- **Protected Routes**: AuthGuard component to secure authenticated pages
- **Performance Optimizations**: useCallback for memoization, passive event listeners
- **Error Boundaries**: Comprehensive error handling patterns

## 🛠️ Technical Decisions

### Why Axios?

I chose **Axios** over native fetch for several compelling reasons:

1. **Interceptors**: Centralized request/response handling for headers, auth tokens, and error management
2. **Automatic Transformations**: JSON parsing and serialization out of the box
3. **Better Error Handling**: Rich error objects with request/response details
4. **Request Cancellation**: Built-in support for aborting requests
5. **Timeout Configuration**: Easy timeout management for all requests
6. **Industry Standard**: Widely adopted and battle-tested in production environments

### Authentication Flow

```
User enters email → Validate format → API call →
Success: Create candidate object → Store in context → Redirect to jobs →
Error: Display validation message
```

The authentication system:

- Validates email format before making API calls
- Stores candidate data in React Context for global access
- Uses localStorage for session persistence
- Implements proper error handling with translation support

### Login Information Display

The candidate information card:

- Shows user avatar with initials generated from full name
- Displays full name and email for identification
- Includes logout functionality
- **Implements sticky behavior** using scroll event listeners with `useCallback` optimization
- Uses a placeholder element to prevent layout shifts when becoming sticky

### Component Structure

```
App
├── AuthGuard (Protected route wrapper)
├── SettingsBar (Theme & Language controls)
└── Pages
    ├── LoginPage (Public)
    └── JobsPage (Protected)
        ├── JobsHeader
        ├── CandidateInfoCard (Sticky)
        └── JobCard[] (Independent application forms)
```

### State Management Approach

- **React Context**: For global state (auth, theme, language)
- **Local State**: For component-specific data (forms, loading states)
- **Consolidated State Objects**: Using single state objects instead of multiple `useState` calls for better performance

## 🚀 Getting Started

### Prerequisites

Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Create a .env file with:
VITE_API_BASE_URL=your_api_url
VITE_AUTH_EMAIL=test@example.com
VITE_API_TIMEOUT=30000

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 🌐 Deployment

This project is deployed on GitHub Pages:

- **Live URL**: [https://brunocarda2005.github.io/test-Nimble/](https://brunocarda2005.github.io/test-Nimble/)
- **Deployment Command**: `npm run deploy` - Builds and deploys to `gh-pages` branch automatically
- **Build**: Optimized production build with Vite
- **Base Path**: Configured in `vite.config.ts` as `/test-Nimble/` for GitHub Pages subdirectory

To deploy updates, simply run:

```bash
npm run deploy
```

## 📂 Project Structure

```
src/
├── api/              # Axios configuration and API client
├── assets/           # Static assets (images, fonts)
├── components/       # Reusable UI components
│   ├── jobs/        # Job-related components
│   └── SettingsBar/ # Theme & language controls
├── config/          # Environment configuration
├── constants/       # Constants (translations, errors, API)
├── contexts/        # React Context providers
├── guards/          # Route protection (AuthGuard)
├── hooks/           # Custom React hooks
├── models/          # TypeScript interfaces/types
├── pages/           # Page components
├── services/        # API service layer
└── utils/           # Helper functions and validators
```

## 🎨 Technologies Used

- **React 19.2.0** - Latest React with modern features
- **TypeScript 5.9** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Axios** - Promise-based HTTP client
- **CSS3** - Modern styling with CSS variables and animations
- **ESLint** - Code quality and consistency

## 📝 Code Highlights

### Type-Safe Translations

```typescript
type TranslationKey = keyof typeof translations.en;

const t = (key: TranslationKey): string => {
  return translations[currentLanguage][key];
};
```

### GitHub URL Validation

```typescript
export const isValidGitHubUrl = (url: string): ValidationResult => {
  const githubPattern = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/;
  return {
    valid: githubPattern.test(url.trim()),
    message: valid ? "" : errors.INVALID_GITHUB_URL,
  };
};
```

### Protected Routes

```typescript
<AuthGuard>
  <JobsPage />
</AuthGuard>
```

## 💭 Final Thoughts

This project represents my approach to building modern, maintainable React applications. While the basic requirements could have been met with simpler code, I chose to demonstrate:

- **Professional architecture** that scales with project growth
- **Production-ready patterns** used in real-world applications
- **User experience focus** with accessibility and internationalization
- **Code quality** with TypeScript, documentation, and best practices

I'm genuinely excited about the opportunity to work with **Nimble Gravity** and would love to learn more about your team, culture, and the exciting projects you're working on. This test was a pleasure to complete, and I hope it demonstrates my passion for clean code and thoughtful software development.

**[🌐 Try the Live Demo](https://brunocarda2005.github.io/test-Nimble/)**

Looking forward to discussing this project further and exploring how I can contribute to Nimble Gravity's success! 🎯

---

**Built with ❤️ for Nimble Gravity**
