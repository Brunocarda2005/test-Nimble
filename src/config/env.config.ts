interface EnvConfig {
  api: {
    baseUrl: string;
    timeout: number;
  };
  auth: {
    email: string;
  };
}

const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const envConfig: EnvConfig = {
  api: {
    baseUrl: getEnvVar("VITE_API_BASE_URL"),
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  },
  auth: {
    email: getEnvVar("VITE_AUTH_EMAIL"),
  },
};
