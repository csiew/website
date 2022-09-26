export const relativeTime = (timestamp: Date | string) => {
  const diffInSeconds = Math.floor((Date.now() - new Date(timestamp).getTime())/1000);
  const rawDiffs = {
    seconds: diffInSeconds,
    minutes: diffInSeconds/60,
    hours: diffInSeconds/60/60,
    days: diffInSeconds/60/60/24,
    weeks: diffInSeconds/60/60/24/7,
    months: diffInSeconds/60/60/24/30,
    years: diffInSeconds/60/60/24/365
  };
  const roundedDiffs = Object.entries(rawDiffs).reduce((diffs, [k, v]) => diffs.set(k, Math.floor(v)), new Map<string, number>());
  
  if (diffInSeconds < 60) {
    // Seconds ago
    const seconds = roundedDiffs.get("seconds") ?? 0;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 3600) {
    // Minutes ago
    const months = roundedDiffs.get("months") ?? 0;
    return `${months} minute${months > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    // Hours ago
    const hours = roundedDiffs.get("hours") ?? 0;
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 604800) {
    // Days ago
    const days = roundedDiffs.get("days") ?? 0;
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2592000) {
    // Weeks ago
    const weeks = roundedDiffs.get("weeks") ?? 0;
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 31536000) {
    // Months ago
    const months = roundedDiffs.get("months") ?? 0;
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    // Years ago
    const years = roundedDiffs.get("years") ?? 0;
    const remainder = rawDiffs.years - Math.floor(rawDiffs.years);
    const remainderInMonths = Math.round((remainder * 365) / 30);
    return `${years} year${years > 1 ? "s" : ""}, ${remainderInMonths} month${remainderInMonths > 1 ? "s" : ""} ago`;
  }
};
