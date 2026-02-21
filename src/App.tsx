import "./App.css";
import { useCandidateContext } from "@/hooks";
import { CandidateLoginPage, JobsPage } from "@/pages";
import { SettingsBar } from "@/components";

// Main application component
// Handles the authentication flow by showing:
// - SettingsBar always visible at the top
// - CandidateLoginPage if there's no authenticated candidate
// - JobsPage if the candidate is already authenticated
// - Loading spinner while verifying the initial session
function App() {
  const { candidate, loading } = useCandidateContext();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <SettingsBar />
      {!candidate ? <CandidateLoginPage /> : <JobsPage />}
    </div>
  );
}

export default App;
