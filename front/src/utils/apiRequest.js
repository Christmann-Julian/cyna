
async function apiRequest(path, method = "GET", options = {}) {
  try {
    let url = "http://localhost:8000/api" + path;
    const response = await fetch(url, {
      method,
      headers: {
        ...options.headers,
      },
      body: method === "GET" || method === "DELETE" ? null : JSON.stringify(options.body),
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export default apiRequest;
