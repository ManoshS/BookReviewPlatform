import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(

  (response) => response,
  (error) => {


    if (error.response.status === 403) {
      alert("You are not allow to access this resource ")
      
    }
    if (error.response.status === 401) {
      alert("Login First")
    }

    return Promise.reject(error);
  }
);
export default api;