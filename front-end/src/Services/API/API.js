/**
 * @description This module should be used for any HTTP requests to our backend. It automatically injects the auth header on each request.
 */
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mydomain.com/api/v1/',
});

window.API = API;

let authInterceptor = null;

export function handleTokenChange(token) {
  // remove existing interceptor (if any)
  if (authInterceptor !== null) {
    API.interceptors.request.eject(authInterceptor);
  }

  // Inject a new interceptor to set the auth header
  if (token) {
    authInterceptor = API.interceptors.request.use(config => {
      // TODO: Change this to represent the actual auth header format
      config.headers = { ...config.headers, Authorization: 'Bearer ' + token };
      return config;
    });
  } else {
    authInterceptor = null;
  }
}

export default API;
