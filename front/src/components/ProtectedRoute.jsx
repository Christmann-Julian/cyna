import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import authProvider from "../utils/authProvider";
import Loading from "../pages/Loading";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const isAuth = async () => {
      const authStatus = await authProvider.isAuthenticated();
      setIsAuthenticated(authStatus);
    };

    isAuth();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
