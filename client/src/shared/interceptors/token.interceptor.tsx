import { AxiosRequestConfig } from 'axios';
import axios from 'configAxios';
import { getConfigBlog } from 'config';


class TokenInterceptor {
  initInterceptor() {
    axios.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = localStorage.getItem(getConfigBlog('tokenKey'));
      let headers = {...config.headers};
      if (token) {
        headers = {
          ...headers,
          'Authorization': `Bearer ${token}`,
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