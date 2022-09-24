export const relativeTime = (timestamp: Date | string) => {
  const diffInSeconds = Math.floor((Date.now() - new Date(timestamp).getTime())/1000);
  
  if (diffInSeconds < 60) {
    // Seconds ago
    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 3600) {
    // Minutes ago
    const diffInMinutes = Math.floor(diffInSeconds/60);
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    // Hours ago
    const diffInHours = Math.floor(diffInSeconds/60/60);
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 604800) {
    // Days ago
    const diffInDays = Math.floor(diffInSeconds/60/60/24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2592000) {
    // Weeks ago
    const diffInWeeks = Math.floor(diffInSeconds/60/60/24/7);
    return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 31536000) {
    // Months ago
    const diffInMonths = Math.floor(diffInSeconds/60/60/24/30);
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else {
    // Years ago
    const rawDiffInYears = diffInSeconds/60/60/24/365;
    const diffInYears = Math.floor(rawDiffInYears);
    const remainder = rawDiffInYears - diffInYears;
    const remainderInMonths = Math.floor(remainder * 12);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""}, ${remainderInMonths} month${remainderInMonths > 1 ? "s" : ""} ago`;
  }
};
