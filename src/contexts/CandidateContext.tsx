import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { JobService } from "@/services";
import type { Candidate } from "@/models";
import { CandidateContext } from "./candidate.context";

// Initial state of the candidate context
const initialState = {
  candidate: null,
  loading: true,
};

interface CandidateProviderProps {
  children: ReactNode;
}

// Provider that wraps the application and provides the candidate state
// This component handles all email authentication logic
// and data persistence in localStorage
export const CandidateProvider: React.FC<CandidateProviderProps> = ({
  children,
}) => {
  const [candidate, setCandidate] = useState<Candidate | null>(
    initialState.candidate
  );
  const [loading, setLoading] = useState(initialState.loading);

  // On app load, checks if there's a saved candidate
  // in localStorage to restore the session
  useEffect(() => {
    const savedCandidate = JobService.getCandidateData();
    if (savedCandidate) {
      setCandidate(savedCandidate);
    }
    setLoading(false);
  }, []);

  // Function to log in with email
  // Calls the API to get the candidate's data
  // and saves it in state and localStorage
  const login = async (email: string) => {
    try {
      const candidateData = await JobService.getCandidateByEmail(email);
      setCandidate(candidateData);
    } catch (error) {
      setCandidate(null);
      throw error;
    }
  };

  // Function to log out
  // Clears the state and localStorage
  const logout = () => {
    JobService.clearCandidateData();
    setCandidate(null);
  };

  return (
    <CandidateContext.Provider value={{ candidate, loading, login, logout }}>
      {children}
    </CandidateContext.Provider>
  );
};
