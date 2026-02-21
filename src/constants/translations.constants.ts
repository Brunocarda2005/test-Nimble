// Translation constants for English and Spanish
// Allows changing the language of the entire interface dynamically

export const translations = {
  en: {
    // Jobs Page
    availablePositions: "Available Positions",
    applyToPositions: "Apply to open positions with your GitHub repository",
    signOut: "Sign Out",
    jobId: "Job ID",
    githubRepoUrl: "GitHub Repository URL",
    submitApplication: "Submit Application",
    submitting: "Submitting...",
    applicationSuccess: "Application submitted successfully",
    loadingPositions: "Loading available positions...",
    noPositions: "No positions available at the moment",

    // Login Page
    jobApplicationPortal: "Job Application Portal",
    enterEmailAccess: "Enter your email to access available positions",
    emailAddress: "Email Address",
    emailPlaceholder: "your.email@example.com",
    continue: "Continue",
    authenticating: "Authenticating...",

    // Errors
    enterEmail: "Please enter your email",
    invalidEmail:
      "The email you entered is not authorized. Please use a valid email address.",
    authFailed:
      "Failed to authenticate. Please check your email and try again.",
    enterRepoUrl: "Please enter a repository URL",
    invalidGithubUrl:
      "Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)",
    submitFailed: "Failed to submit application",
    loadJobsFailed: "Failed to load jobs",

    // Settings
    theme: "Theme",
    language: "Language",
    dark: "Dark",
    light: "Light",
    english: "English",
    spanish: "Spanish",
  },
  es: {
    // Jobs Page
    availablePositions: "Posiciones Disponibles",
    applyToPositions:
      "Aplica a posiciones abiertas con tu repositorio de GitHub",
    signOut: "Cerrar Sesión",
    jobId: "ID del Trabajo",
    githubRepoUrl: "URL del Repositorio de GitHub",
    submitApplication: "Enviar Aplicación",
    submitting: "Enviando...",
    applicationSuccess: "Aplicación enviada exitosamente",
    loadingPositions: "Cargando posiciones disponibles...",
    noPositions: "No hay posiciones disponibles en este momento",

    // Login Page
    jobApplicationPortal: "Portal de Aplicación de Trabajos",
    enterEmailAccess:
      "Ingresa tu email para acceder a las posiciones disponibles",
    emailAddress: "Dirección de Email",
    emailPlaceholder: "tu.email@ejemplo.com",
    continue: "Continuar",
    authenticating: "Autenticando...",

    // Errors
    enterEmail: "Por favor ingresa tu email",
    invalidEmail:
      "El email ingresado no está autorizado. Por favor usa una dirección de email válida.",
    authFailed:
      "Error al autenticar. Por favor verifica tu email e intenta nuevamente.",
    enterRepoUrl: "Por favor ingresa la URL del repositorio",
    invalidGithubUrl:
      "Por favor ingresa una URL válida de GitHub (ej: https://github.com/usuario/repo)",
    submitFailed: "Error al enviar la aplicación",
    loadJobsFailed: "Error al cargar los trabajos",

    // Settings
    theme: "Tema",
    language: "Idioma",
    dark: "Oscuro",
    light: "Claro",
    english: "Inglés",
    spanish: "Español",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
