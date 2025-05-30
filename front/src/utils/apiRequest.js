import authProvider from './authProvider';

async function apiRequest(path, method = 'GET', options = {}) {
  try {
    let url = 'http://localhost:8000/api' + path;
    const response = await fetch(url, {
      method,
      headers: {
        ...options.headers,
      },
      body: method === 'GET' || method === 'DELETE' ? null : JSON.stringify(options.body),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        await authProvider.logout();
        window.location.href = '/login';
      }
      throw new Error(`${response.status}`);
    }

    if (options.responseType === 'blob') {
      const data = await response.blob();
      return { data, error: null };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export default apiRequest;
