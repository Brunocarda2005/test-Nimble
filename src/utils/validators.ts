import { errors } from "@/constants/error.constants";

const GITHUB = /^https:\/\/github\.com\/[\w-]+\/[\w-]+\/?$/;

// Validates that the URL is a valid GitHub repository
// Expected format: https://github.com/username/repository
export const isValidGitHubUrl = (
  url: string,
): { valid: boolean; message: string } => {
  const message = errors.INVALID_GITHUB_URL;
  const githubUrlPattern = GITHUB;
  const valid = githubUrlPattern.test(url);
  return { valid, message };
};

export const isError = (err: unknown): err is Error => err instanceof Error;
