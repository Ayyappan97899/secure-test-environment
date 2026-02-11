exports.classifyIpChange = (oldIp, newIp) => {
  if (!oldIp || !newIp) return "UNKNOWN";

  const oldPrefix = oldIp.split(".")[0];
  const newPrefix = newIp.split(".")[0];

  if (oldPrefix === newPrefix) {
    return "LIKELY_BENIGN";
  }

  return "POTENTIALLY_SUSPICIOUS";
};
