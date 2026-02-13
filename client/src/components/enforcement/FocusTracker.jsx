import { useEffect } from "react";
import useEventLogger from "../../hooks/useEventLogger";
import { EVENT_TYPES } from "../../utils/eventTypes";

export default function FocusTracker({ attemptId, showWarningMessage }) {
  const { logEvent } = useEventLogger(attemptId);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        showWarningMessage(
          "Do not switch tabs or applications during the test.",
        );
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
