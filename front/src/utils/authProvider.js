import { jwtDecode } from "jwt-decode";

const authProvider = {
  login: async ({ username, password, rememberMe }) => {
    const request = new Request("http://localhost:8000/api/login_check", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          const error = new Error(response.statusText);
          error.status = response.status;
          throw error;
        }
        return response.json();
      })
      .then(({ token, refresh_token }) => {
        if (rememberMe) {
          localStorage.setItem("refresh_token", refresh_token);
        }
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        localStorage.setItem("roles", JSON.stringify(decodedToken.roles));
      });
  },
  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("roles");
    return "/login";
  },
  refreshToken: async function() {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) {
      return false;
    }

    try {
      const response = await fetch('http://localhost:8000/api/token/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refresh_token }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refresh_token);
      return true;
    } catch (error) {
      localStorage.removeItem("refresh_token");
      return false;
    }
  },
  checkAuth: () => {
    const token = localStorage.getItem("token");
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");

    if (token && roles.includes("ROLE_ADMIN")) {
      return Promise.resolve();
    }

    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("roles");

    return Promise.reject();
  },
  checkError: async ({ status }) => {
    if (status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("roles");
      return Promise.reject();
    }
    if (status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        const success = await this.refreshToken();
        if (success) {
          return Promise.resolve();
        }
      }
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("roles");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => {
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    return Promise.resolve(roles);
  },
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        if (decodedToken.exp < currentTime) {
          const refreshed = await this.refreshToken();
          return refreshed;
        }
      }

      return true;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("roles");
      return false;
    }
  },
  getUserInfo: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await fetch(
        `http://localhost:8000/api/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
