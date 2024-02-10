import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";

async function refreshToken() {
  console.log("try to refresh");
  // const refreshToken = localStorage.getItem("refreshToken");
  // const accessToken = localStorage.getItem("accessToken");

  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  await axios
    .post(
      `${config.API_URL}Token/refresh`,
      JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }),
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

const getRefreshToken = () => {
  const refrshToken = localStorage.getItem("refreshToken");
  return refrshToken;
};

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

const jwtInterceptor = axios.create({
  baseURL: config.API_URL,
});

jwtInterceptor.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried
      try {
        const newToken = getAccessToken();
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return jwtInterceptor(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    if (error.response.status === 403 && !originalRequest._retry) {
      toast.error("brak uprawnień");
      console.log("brak uprawnień");
    }
    return Promise.reject(error);
  }
);

// jwtInterceptor.interceptors.request.use(
//   (response) => {
//     console.log(response);
//     return response;
//   },
//   async (error) => {
//     // console.log("Intercepted error:", error);
//     // console.log("error");
//     // const request = error.config;
//     // if (error.response.status === 401) {
//     //   console.log("401, i will try to refresh token");
//     //   const newToken = await refreshToken();
//     //   axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
//     //   return jwtInterceptor(request);
//     // }
//     // if (error.response.status === 403) {
//     //   toast.error("Brak uprawnień");
//     //   return jwtInterceptor(request);
//     // }
//     return Promise.reject(error);
//   }
// );

export default jwtInterceptor;

// jwtInterceptor.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const orginalRequest = error.config;
//     if (error.response.status === 401 && !orginalRequest._retry) {
//       orginalRequest._retry = true;
//       const newToken = await refreshToken();
//       axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
//       return jwtInterceptor(request);
//     }
//     return Promise.reject(error);
//   }
// );
