function convertTimestamp(timestamp) {
  const timeDifference = new Date() - new Date(timestamp);

  const PER_MINUTE = 60 * 1000;
  const PER_HOUR = 60 * PER_MINUTE;
  const PER_DAY = 24 * PER_HOUR;
  const PER_YEAR = 365 * PER_DAY;
  
  if (timeDifference > PER_YEAR) {
    // return time in date DD MM YYYY format
    return new Date(timestamp).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  
  if (timeDifference > PER_DAY) {
    // return time in date DD MM format
    return new Date(timestamp).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  }
  
  if (timeDifference > PER_HOUR) {
    // return time in hours
    return Math.round(timeDifference / (60 * 60 * 1000)) + ' h';
  }
  
  if (timeDifference > PER_MINUTE) {
    // return time in minutes
    return Math.round(timeDifference / (60 * 1000)) + ' m';
  }

  // return time in seconds
  return Math.round(timeDifference / (1000)) + ' s';
}

function getCurrentUsername() {
  const jwt = JSON.parse(localStorage.getItem('jwt'));
  return jwt.username;
}

export {
  convertTimestamp,
  getCurrentUsername,
}