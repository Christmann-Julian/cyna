import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import authProvider from "../utils/authProvider";
import Loading from "../pages/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";

const ProtectedRoute = ({ children, redirectPath = "/login", isRedirectToOrigin = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const isAuth = async () => {
      const authStatus = await authProvider.isAuthenticated(token);
      if (typeof authStatus === 'string') {
        setIsAuthenticated(true);
        dispatch(setToken(authStatus));
        return;
      }
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
