import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useGlobalContext } from "../context/AuthContext";
// import auth from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
