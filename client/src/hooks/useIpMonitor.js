import { useEffect, useRef } from "react";
import { checkIp } from "../api/ipMonitor.api";

export default function useIpMonitor(
  attemptId,
  onNetworkChange,
  intervalMs = 15000,
) {
  const checkingRef = useRef(false);

  useEffect(() => {
    if (!attemptId) return;

    const check = async () => {
      if (checkingRef.current) return;
      checkingRef.current = true;

      try {
        const res = await checkIp(attemptId);

        console.log("IP check result", res);

        if (res.changed && res.classification === "POTENTIALLY_SUSPICIOUS") {
          onNetworkChange?.(res);
        }
      } catch (err) {
        console.warn("IP check failed", err);
      } finally {
        checkingRef.current = false;
      }
    };

    check(); // initial
    const interval = setInterval(check, intervalMs);

    return () => clearInterval(interval);
  }, [attemptId, intervalMs, onNetworkChange]);
}
