const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric"
    };
  
    // Check if the input dateString includes a time component
    if (dateString.includes(":")) {
      return date.toLocaleDateString("en-US", options);
    } else {
      return date.toLocaleDateString("en-US", options) + " - " + date.toLocaleTimeString("en-US", options);
    }
  };
  
  module.exports = formatDate;
  