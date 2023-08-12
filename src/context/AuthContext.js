import React, { useContext, useEffect, useState } from "react";
import http from "../api/http-common";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const addUser = (data) => {
    setUser(data);
  };
  const removeUser = () => {
    setUser(null);
  };
  useEffect(() => {
    setIsloading(true);
    http
      .get("/auth/isAuthenticated")
      .then((res) => {
        res.data.msg === true ? setUser(res.data.user) : setUser(null);
        // console.log(res.data);
        setIsloading(false);
      })
      .catch((error) => {
        setError(error);
        setIsloading(false);
      });
  }, []);

  if (error) {
    if (error.response.status === 401) {
      setUser(null);
      setError(null);
    }

    console.log(error);
  }

  if (!user) {
  }
  return (
    <AuthContext.Provider
      value={{ user, setUser, addUser, removeUser, isLoading, setIsloading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
//custom hook
export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
