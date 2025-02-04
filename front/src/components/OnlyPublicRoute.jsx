import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import authProvider from "../utils/authProvider";
import Loading from "../pages/Loading";

const OnlyPublicRoute = ({ children, redirectPath = "/account" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await authProvider.isAuthenticated();
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default OnlyPublicRoute;