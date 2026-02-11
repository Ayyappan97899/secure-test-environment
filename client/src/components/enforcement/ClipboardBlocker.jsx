import { useEffect } from "react";
import useEventLogger from "../../hooks/useEventLogger";
import { EVENT_TYPES } from "../../utils/eventTypes";

export default function ClipboardBlocker({ attemptId }) {
  const { logEvent } = useEventLogger(attemptId);

  useEffect(() => {
    const handleCopy = (e) => {
      e.preventDefault();
      logEvent(EVENT_TYPES.COPY_ATTEMPT);
    };

    const handlePaste = (e) => {
      e.preventDefault();
      logEvent(EVENT_TYPES.PASTE_ATTEMPT);
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
    };
  }, [logEvent]);

  return null;
}
