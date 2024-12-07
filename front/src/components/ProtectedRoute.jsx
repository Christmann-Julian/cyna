import React from "react";
import { Navigate } from "react-router-dom";
import authProvider from "../utils/authProvider";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authProvider.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
