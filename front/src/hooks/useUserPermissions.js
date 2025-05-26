import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import store from '../redux/store';

const useUserPermissions = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setPermissions(decodedToken.roles || []);
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
      }
    }
  }, []);

  return permissions;
};

export default useUserPermissions;
