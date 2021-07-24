function rounding(value) {
  return Math.floor(value);
}

export function friendlyTimestamp(timestamp) {
  return <span><strong>{getRelativeTimeSince(timestamp)}</strong> ({new Date(timestamp).toLocaleString()})</span>;
}

export function getRelativeTimeSince(timestamp) {
  const diffInSeconds = rounding((new Date().getTime() - new Date(timestamp).getTime())/1000);
  
  if (diffInSeconds < 60) {
    // Seconds ago
    return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 3600) {
    // Minutes ago
    const diffInMinutes = rounding(diffInSeconds/60);
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    // Hours ago
    const diffInHours = rounding(diffInSeconds/60/60);
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    // Days ago
    const diffInDays = rounding(diffInSeconds/60/60/24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    // Weeks ago
    const diffInWeeks = rounding(diffInSeconds/60/60/24/7);
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 31536000) {
    // Months ago
    const diffInMonths = rounding(diffInSeconds/60/60/24/30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else {
    // Years ago
    const diffInYears = rounding(diffInSeconds/60/60/24/365);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  }
}
