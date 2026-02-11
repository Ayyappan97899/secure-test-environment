import { useEffect } from "react";
import useEventLogger from "../../hooks/useEventLogger";
import { EVENT_TYPES } from "../../utils/eventTypes";

export default function FullscreenEnforcer({ attemptId }) {
  const { logEvent } = useEventLogger(attemptId);

  useEffect(() => {
    const handleFullscreenChange = async () => {
      if (!document.fullscreenElement) {
        // Log exit event
        logEvent(EVENT_TYPES.FULLSCREEN_EXIT);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [logEvent]);

  return null;
}
