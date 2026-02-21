import { createContext } from "react";
import type { Candidate } from "@/models";

// Type that defines the candidate context structure
// Contains the current candidate and functions for login/logout
export interface CandidateContextType {
  candidate: Candidate | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

// Creates the context that will be shared across the entire application
// Initially undefined until provided by CandidateProvider
export const CandidateContext = createContext<CandidateContextType | undefined>(
  undefined,
);
