export const formatDate = timestamp => {
  if (!timestamp) return 'N/A';

  const getFormattedDate = date => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };

  if (timestamp._seconds !== undefined) {
    const date = new Date(timestamp._seconds * 1000);
    return getFormattedDate(date);
  }

  const date = new Date(timestamp);
  if (isNaN(date)) return 'N/A';

  return getFormattedDate(date);
};
