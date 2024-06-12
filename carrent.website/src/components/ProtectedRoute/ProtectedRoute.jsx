import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  }

  return children;
}

export default ProtectedRoute;
