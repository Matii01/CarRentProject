function transformObjectToQueryString(object) {
  const obectToString = Object.entries(object)
    .map(([key, value]) => {
      if (key !== null && value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          return value.map((x) => `${key}=${x}&`).join("");
        } else {
          return `${key}=${value}&`;
        }
      }
      return "";
    })
    .join("");
  return obectToString.slice(0, obectToString.length - 1);
}

export default transformObjectToQueryString;
