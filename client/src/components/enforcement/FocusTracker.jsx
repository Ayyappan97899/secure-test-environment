import { useEffect } from "react";
import useEventLogger from "../../hooks/useEventLogger";
import { EVENT_TYPES } from "../../utils/eventTypes";

export default function FocusTracker({ attemptId }) {
  const { logEvent } = useEventLogger(attemptId);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        logEvent(EVENT_TYPES.TAB_SWITCH);
      }
    };

    window.addEventListener("blur", handleVisibilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [logEvent]);

  return null;
}
