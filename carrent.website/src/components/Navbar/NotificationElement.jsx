import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosConfig";

function NotificationElement() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const [notification, setNotification] = useState(0);

  const onFirstRender = () => {
    getNotificationCount();
  };

  const everySomeMinutes = () => {
    if (isLogin) {
      getNotificationCount();
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

  const getNotificationCount = () => {
    axiosInstance
      .get(`/Notification/myNewNotification`)
      .then((data) => {
        console.log(data.data);
        setNotification(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <>{notification != 0 && notification}</>;
}

export default NotificationElement;
