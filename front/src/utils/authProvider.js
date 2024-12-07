import { jwtDecode } from 'jwt-decode';

const authProvider = {
  login: async ({ username, password }) => {
    const request = new Request('http://localhost:8000/api/login_check', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          const error = new Error(response.statusText);
          error.status = response.status;
          throw error;
        }
        return response.json();
      })
      .then(({ token }) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        localStorage.setItem('roles', JSON.stringify(decodedToken.roles));
      });
  },
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    return '/login';
  },
  checkAuth: () => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    if (token && roles.includes('ROLE_ADMIN')) {
      return Promise.resolve();
    }

    localStorage.removeItem('token');
    localStorage.removeItem('roles');

    return Promise.reject();
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return Promise.resolve(roles);
  },
  isAuthenticated: () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        return false;
      }

      return true;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      return false;
    }
  },
};
  
export default authProvider;