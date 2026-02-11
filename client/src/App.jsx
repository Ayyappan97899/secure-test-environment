import { Routes, Route } from "react-router-dom";
import InstructionsPage from "./pages/InstructionsPage";
import AssessmentPage from "./pages/AssessmentPage";
import CompletionPage from "./pages/CompletionPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<InstructionsPage />} />
      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path="/complete" element={<CompletionPage />} />
    </Routes>
  );
}
