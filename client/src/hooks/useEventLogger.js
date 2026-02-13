import { useRef, useEffect, useCallback } from "react";
import { batchLogEvents } from "../api/events.api";
import {
  saveEvents,
  loadEvents,
  clearEvents,
} from "../services/localPersistence.service";
import { getBrowserInfo } from "../utils/browserInfo";

export default function useEventLogger(attemptId) {
  const isEventSending = useRef(false);

  // Stable logEvent
  const logEvent = useCallback((type, metadata = {}) => {
    const event = {
      type,
      metadata: { ...metadata, browserInfo: getBrowserInfo() },
      timestamp: new Date().toISOString(),
    };

    const existing = loadEvents();
    saveEvents([...existing, event]); // just save, no state updates
  }, []);

  // Send offline events to backend
  const eventSends = useCallback(async () => {
    if (!attemptId || isEventSending.current) return;

    const storedEvents = loadEvents();
    if (!storedEvents.length || !navigator.onLine) return;

    isEventSending.current = true;
    try {
      const res = await batchLogEvents({ attemptId, events: storedEvents });
      clearEvents();
      console.log("Event data from backend", res?.data);
    } catch (err) {
      console.warn("Send failed, keeping events");
    } finally {
      isEventSending.current = false;
    }
  }, [attemptId]);

  // Event send to backend on interval (5s)
  useEffect(() => {
    if (!attemptId) return;
    const interval = setInterval(eventSends, 5000);
    return () => clearInterval(interval);
  }, [attemptId, eventSends]);

  // Event send to backend when back online
  useEffect(() => {
    const onlineHandler = () => eventSends();
    window.addEventListener("online", onlineHandler);
    return () => window.removeEventListener("online", onlineHandler);
  }, [eventSends]);

  // Event send to backend before tab close
  useEffect(() => {
    const unloadHandler = () => eventSends();
    window.addEventListener("beforeunload", unloadHandler);
    return () => window.removeEventListener("beforeunload", unloadHandler);
  }, [eventSends]);

  return { logEvent, eventSends };
}
