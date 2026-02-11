export function getBrowserInfo() {
  const ua = navigator.userAgent;

  const getBrowser = () => {
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari")) return "Safari";
    if (ua.includes("Edge")) return "Edge";
    return "Unknown";
  };

  const getOS = () => {
    if (ua.includes("Win")) return "Windows";
    if (ua.includes("Mac")) return "MacOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone")) return "iOS";
    return "Unknown";
  };

  return {
    browser: getBrowser(),
    os: getOS(),
    userAgent: ua,
  };
}
