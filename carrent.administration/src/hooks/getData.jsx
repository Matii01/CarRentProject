import { useEffect, useState } from "react";

function useFetchGet(url, setData) {
  //const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log("and i will set data");
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(setLoading(false));
  }, [url]);

  return { loading, error };
}

export default useFetchGet;
