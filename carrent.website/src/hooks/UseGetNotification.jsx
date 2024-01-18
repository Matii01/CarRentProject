import { useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosConfig";

function useGetNotification() {
  const isLogin = useSelector((state) => state.user.isLogin);

  const onFirstRender = () => {
    //retriveData();
    getNotification();
  };

  const everySomeMinutes = () => {
    if (isLogin) {
      getNotification();
    } else {
      console.log("is not log in");
    }
  };

  const timeToWait = () => {
    // 1200000 = 20 min
    return 1200000;
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

  const getNotification = () => {
    axiosInstance
      .get(`https://localhost:7091/Notification/myNotification`)
      .then((data) => {
        console.log(data.data);
        console.log("new data");
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default useGetNotification;
