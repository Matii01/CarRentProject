import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  });

  const navigate = useNavigate();
  const login = async (payload) => {
    await axios.post("", payload, {
      withCredentials: true,
    });
    let apiResponse = await axios.get("");
    localStorage.setItem("userProfile", JSON.stringify(a));
  };
}

export default AuthContextProvider;
