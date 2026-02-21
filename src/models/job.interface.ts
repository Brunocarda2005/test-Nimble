// Model representing an available job in the platform
export interface Job {
  id: string; // Unique job identifier
  title: string; // Job title
}

// Model representing a registered candidate in the system
export interface Candidate {
  uuid: string; // Unique candidate identifier
  candidateId: string; // Candidate ID
  applicationId: string; // Current application ID
  firstName: string; // Candidate's first name
  lastName: string; // Candidate's last name
  email: string; // Email used for authentication
}

// DTO used to send an application to a job
// Requires unique uuid, candidate and job IDs, and repo URL
export interface ApplyToJobDto {
  uuid: string; // UUID generated on the client
  jobId: string; // UUID of the job being applied to
  candidateId: string; // ID of the candidate applying
  repoUrl: string; // Repository URL with the test code
}

// Server response when applying to a job
export interface ApplyToJobResponse {
  ok: boolean; // Operation success indicator
}

export interface CandidateInfoCardProps {
  candidate: Candidate;
  onLogout: () => void;
}
