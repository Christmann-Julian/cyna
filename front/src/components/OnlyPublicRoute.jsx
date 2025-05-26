import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import authProvider from '../utils/authProvider';
import Loading from '../pages/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../redux/authSlice';

const OnlyPublicRoute = ({ children, redirectPath = '/account' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await authProvider.isAuthenticated(token);
      if (typeof authStatus === 'string') {
        setIsAuthenticated(true);
        dispatch(setToken(authStatus));
        return;
      }
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
