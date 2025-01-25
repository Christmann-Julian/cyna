import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import authProvider from "../utils/authProvider";
import Loading from "../pages/Loading";

const ProtectedRoute = ({ children, redirectPath = "/login", isRedirectToOrigin = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

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

  if (!isAuthenticated && isRedirectToOrigin) {
    return <Navigate to={redirectPath} state={{ from: { pathname: location.pathname, search: location.search } }} />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ProtectedRoute;
