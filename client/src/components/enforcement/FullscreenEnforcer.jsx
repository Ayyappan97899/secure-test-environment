import { useEffect } from "react";
import useEventLogger from "../../hooks/useEventLogger";
import { EVENT_TYPES } from "../../utils/eventTypes";

export default function FullscreenEnforcer({ attemptId, showWarningMessage }) {
  const { logEvent } = useEventLogger(attemptId);

  useEffect(() => {
    const handleFullscreenChange = async () => {
      if (!document.fullscreenElement) {
        showWarningMessage("Do not exit fullscreen mode.");
        logEvent(EVENT_TYPES.FULLSCREEN_EXIT);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [logEvent]);

  return null;
}
