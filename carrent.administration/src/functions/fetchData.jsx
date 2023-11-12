const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body:
        options.method === "POST" || options.method === "PUT"
          ? JSON.stringify(options.body)
          : null,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (response.status === 201) {
      return 201;
    }
    if (response.status === 204) {
      return 204;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch data:", error);
    throw error;
  }
};

export default fetchData;
