import { useEffect } from "react";

export default function useFullscreen(enabled = true, onExit) {
  useEffect(() => {
    if (!enabled) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // User exited fullscreen
        console.warn("Exited fullscreen");

        if (onExit) onExit();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [enabled, onExit]);
}
