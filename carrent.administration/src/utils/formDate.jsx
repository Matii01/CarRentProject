export const formatDate = (date) => {
  if (date === null || date === undefined) {
    return date;
  }
  return date.slice(0, 10);
};
