import axios, { AxiosRequestConfig } from 'axios';


class TokenInterceptor {
  initInterceptor() {
    axios.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = localStorage['token'];
      let headers = {...config.headers};
      if (token) {
        headers = {
          ...headers,
          'Authorization': `Token ${token}`
        }
        config = {
          ...config,
          headers
        }
      }
      return config;
    });
  }
}

export default TokenInterceptor;