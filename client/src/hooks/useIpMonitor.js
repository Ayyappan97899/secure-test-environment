import { useEffect, useRef } from "react";
import { checkIp } from "../api/ipMonitor.api";

export default function useIpMonitor(attemptId, logEvent, intervalMs = 15000) {
  const warnedRef = useRef(false);
  const checkingRef = useRef(false);

  useEffect(() => {
    if (!attemptId) return;

    const check = async () => {
      if (checkingRef.current) return; // skip if previous call running
      checkingRef.current = true;

      try {
        const res = await checkIp(attemptId);

        // Log the IP check (offline-safe)
        logEvent("IP_CHECK_PERFORMED");

        if (res.changed && !warnedRef.current) {
          warnedRef.current = true;
          logEvent("IP_CHANGE_DETECTED", {
            oldIp: res.oldIp,
            newIp: res.newIp,
            classification: res.classification,
          });

          if (res.classification === "POTENTIALLY_SUSPICIOUS") {
            onNetworkChange?.();
          }
        }
      } catch (err) {
        console.warn("IP check failed", err);
      } finally {
        checkingRef.current = false;
      }
    };

    // Initial check
    check();

    // Interval check
    const interval = setInterval(check, intervalMs);

    return () => clearInterval(interval);
  }, [attemptId, intervalMs, logEvent]);
}
