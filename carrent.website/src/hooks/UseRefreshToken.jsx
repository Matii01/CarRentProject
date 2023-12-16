import { useEffect } from "react";
import SetLocalStorage from "./SetLocalStorage";
import { useSelector } from "react-redux";

function useRefreshToken() {
  const [setLocalStorage] = SetLocalStorage();
  const isLogin = useSelector((state) => state.user.isLogin);

  const onFirstRender = () => {
    retriveData();
  };

  const everySomeMinutes = () => {
    if (isLogin) {
      console.log("try to refresh token");
      refreshToken();
    } else {
      console.log("is not log in");
    }
  };

  const timeToWait = () => {
    return 10 * 60 * 1000;
  };

  useEffect(() => {
    onFirstRender();

    const seconds = timeToWait();

    const interval = setInterval(() => {
      console.log(seconds);
      console.log("called every 10s");
      everySomeMinutes();
    }, seconds);

    //Clear the interval on component unmount
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = () => {
    const url = "https://localhost:7091/token/refresh";
    fetchData(url);
  };

  const isTokensSet = () => {
    const item = localStorage.getItem("refreshToken");
    if (item) {
      return true;
    }
    console.log("token null");
    return false;
  };

  const retriveData = () => {
    console.log("try to retrive data from token");

    if (isTokensSet()) {
      const url = "https://localhost:7091/token/retrieve";
      fetchData(url);
    }
  };

  const fetchData = (url) => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken, refreshToken }),
    })
      .then((respose) => {
        if (!respose.ok) {
          throw new Error("retrive data error");
        }
        return respose.json();
      })
      .then((data) => {
        setLocalStorage(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default useRefreshToken;
