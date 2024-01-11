export const formatDate = (date) => {
  if (date === null) {
    return date;
  }
  return date.slice(0, 10);
};
