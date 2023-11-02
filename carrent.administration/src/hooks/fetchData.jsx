import { useEffect, useState } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: options.method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          body: options.method === "POST" ? JSON.stringify(options.body) : null,
        });

        if (!response.ok) {
          throw new Error(`Http error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to mimic component's useEffect

  return { data, loading, error };
}

export default useFetch;

// import { useEffect, useState } from "react";

// function useFetch(url, options = {}) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url, {
//           method: options.method || "GET",
//           headers: {
//             "Content-Type": "application/json",
//             ...options.headers,
//           },
//           body: options.method === "POST" ? JSON.stringify(options.body) : null,
//         });

//         if (!response.ok) {
//           throw new Error(`Http error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setData(data);
//         console.log(data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return { data, loading, error };
// }

// export default useFetch;
