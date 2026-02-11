import { useEffect, useState } from "react";
import { startAttempt } from "../api/attempt.api";

export default function useAttempt() {
  const [attemptId, setAttemptId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await startAttempt();

        setAttemptId(data.attemptId);
        setDuration(data.duration);
      } catch (err) {
        console.error("Failed to start attempt:", err);
        setError("Unable to start assessment.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return {
    attemptId,
    duration,
    loading,
    error,
  };
}
