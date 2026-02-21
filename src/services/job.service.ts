import { apiClient } from "@/api";
import { API_ENDPOINTS, STORAGE_KEYS } from "@/constants";
import type {
  Job,
  Candidate,
  ApplyToJobDto,
  ApplyToJobResponse,
} from "@/models";

// Service that handles all operations related to jobs and candidates
// Includes methods to get jobs, authenticate candidates and apply to positions
export class JobService {
  // Gets the complete list of available jobs from the API
  static async getJobsList(): Promise<Job[]> {
    const response = await apiClient.get<Job[]>(API_ENDPOINTS.JOBS.GET_LIST);
    return response.data;
  }

  // Authenticates a candidate by email and gets their data from the API
  // Automatically saves the data to localStorage for persistence
  static async getCandidateByEmail(email: string): Promise<Candidate> {
    const response = await apiClient.get<Candidate>(
      API_ENDPOINTS.CANDIDATE.GET_BY_EMAIL(email),
    );
    this.saveCandidateData(response.data);
    return response.data;
  }

  // Sends a candidate's application to a specific job
  // Requires uuid, candidateId, jobId and the GitHub repository URL
  static async applyToJob(data: ApplyToJobDto): Promise<ApplyToJobResponse> {
    const response = await apiClient.post<ApplyToJobResponse>(
      API_ENDPOINTS.CANDIDATE.APPLY_TO_JOB,
      data,
    );
    return response.data;
  }

  // Saves the candidate's data to localStorage
  // Used to maintain the candidate's session between page reloads
  static saveCandidateData(candidate: Candidate): void {
    localStorage.setItem(
      STORAGE_KEYS.CANDIDATE_DATA,
      JSON.stringify(candidate),
    );
  }

  // Gets the candidate's data saved in localStorage
  // Returns null if there's no saved data
  static getCandidateData(): Candidate | null {
    const data = localStorage.getItem(STORAGE_KEYS.CANDIDATE_DATA);
    return data ? JSON.parse(data) : null;
  }

  // Removes the candidate's data from localStorage
  // Used when logging out
  static clearCandidateData(): void {
    localStorage.removeItem(STORAGE_KEYS.CANDIDATE_DATA);
  }
}
