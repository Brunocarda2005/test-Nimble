import { useContext } from "react";
import { CandidateContext } from "@/contexts/candidate.context";
import type { CandidateContextType } from "@/contexts/candidate.context";

// Custom hook to access the candidate context
// Validates that it's being used inside the CandidateProvider
// and returns the complete context with candidate, login and logout
export const useCandidateContext = (): CandidateContextType => {
  const context = useContext(CandidateContext);

  if (context === undefined) {
    throw new Error(
      "useCandidateContext must be used within a CandidateProvider",
    );
  }

  return context;
};
