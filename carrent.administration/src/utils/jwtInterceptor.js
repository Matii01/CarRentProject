import axios from "axios";

async function refreshToken() {
  console.log("try to refresh");
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  await axios
    .post(
      `https://localhost:7091/Token/refresh`,
      JSON.stringify({ accessToken, refreshToken }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      localStorage.setItem("accessToken", data.data.token.accessToken);
      localStorage.setItem("refreshToken", data.data.token.refreshToken);
      console.log("token refresed");
      return data.token.accessToken;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

const jwtInterceptor = axios.create({
  baseURL: "https://localhost:7091/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const orginalRequest = error.config;
    if (error.response.status === 401 && !orginalRequest._retry) {
      orginalRequest._retry = true;
      const newToken = await refreshToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
      return jwtInterceptor(request);
    }
    return Promise.reject(error);
  }
);

jwtInterceptor.interceptors.request.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    console.log("Intercepted error:", error);
    console.log("error");
    const request = error.config;
    if (error.response.status === 401) {
      console.log("401, i will try to refresh token");
      const newToken = await refreshToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
      return jwtInterceptor(request);
    }
    return Promise.reject(error);
  }
);

export default jwtInterceptor;

/*
jwtInterceptor.interceptors.request.use(
  (response) => {
    console.log(response);
    console.log(response.status);
    return response;
  },
  async (error) => {
    console.log("Intercepted error:", error);
    console.log("error");
    const request = error.config;
    if (error.response.status === 401) {
      console.log("401, i will try to refresh token");
      const newToken = await refreshToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
      return jwtInterceptor(request);
    }
    return Promise.reject(error);
  }
);
*/
