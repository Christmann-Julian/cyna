import { jwtDecode } from 'jwt-decode';
import store from '../redux/store';
import { logout } from '../redux/authSlice';

let refreshPromise = null;

const authProvider = {
  login: async ({ username, password, locale, rememberMe }) => {
    const request = new Request('http://localhost:8000/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, locale, rememberMe }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include',
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          return response.text().then((responseMessage) => {
            const error = new Error(responseMessage);
            error.status = response.status;
            throw error;
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.twofa_required) {
          return { twofa_required: true, user_id: data.user_id };
        }

        const { token } = data;
        return { token, twofa_required: false };
      });
  },

  verifyTwoFA: async ({ userId, code, rememberMe }) => {
    const request = new Request('http://localhost:8000/api/two-fa', {
      method: 'POST',
      body: JSON.stringify({ user_id: parseInt(userId, 10), code, rememberMe }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include',
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          return response.text().then((responseMessage) => {
            const error = new Error(responseMessage);
            error.status = response.status;
            throw error;
          });
        }
        return response.json();
      })
      .then((data) => {
        const { token } = data;
        return { token };
      });
  },

  logout: async () => {
    try {
      store.dispatch(logout());

      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      return '/login';
    } catch (error) {
      console.error(error);
      return '/login';
    }
  },

  refreshToken: async () => {
    if (!refreshPromise) {
      refreshPromise = fetch('http://localhost:8000/api/token/refresh', {
        method: 'POST',
        credentials: 'include',
      })
        .then(async (response) => {
          if (!response.ok) throw new Error('Failed to refresh token');

          const data = await response.json();
          return data.token;
        })
        .catch((error) => {
          return null;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    return refreshPromise;
  },

  checkAuth: async () => {
    const state = store.getState();
    let token = state.auth.token;

    if (!token) {
      const refreshed = await authProvider.refreshToken();
      if (!refreshed) return Promise.reject();
      token = refreshed.token;
    }

    const decodedToken = jwtDecode(token);
    if (
      !decodedToken.roles.includes('ROLE_ADMIN') &&
      !decodedToken.roles.includes('ROLE_SUPER_ADMIN')
    ) {
      return Promise.reject();
    }

    return Promise.resolve();
  },
  getPermissions: async () => {
    try {
      const state = store.getState();
      const token = state.auth.token;

      if (!token) {
        const refreshedToken = await authProvider.refreshToken();
        if (!refreshedToken) return Promise.reject();
      }

      const decodedToken = jwtDecode(token);

      return Promise.resolve(decodedToken.roles || []);
    } catch (error) {
      return Promise.reject();
    }
  },
  checkError: async ({ status }) => {
    if (status === 403) {
      return Promise.reject();
    }
    if (status === 401) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        return Promise.resolve();
      }
      return Promise.reject();
    }
    return Promise.resolve();
  },

  isAuthenticated: async (token) => {
    if (!token) {
      try {
        const refreshed = await authProvider.refreshToken();
        if (!refreshed) {
          return false;
        }
        return refreshed;
      } catch {
        return false;
      }
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        try {
          const refreshed = await authProvider.refreshToken();
          if (!refreshed) {
            return false;
          }
          return refreshed;
        } catch {
          return false;
        }
      }
      return true;
    } catch {
      return false;
    }
  },

  getUserInfo: async (token) => {
    if (!token) {
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      return null;
    }
  },
};

export default authProvider;
