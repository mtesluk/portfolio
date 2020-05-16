import { AxiosRequestConfig } from 'axios';
import axios from '../../configAxios';
import { config as appConfing } from '../../config';


class TokenInterceptor {
  initInterceptor() {
    axios.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = localStorage.getItem(appConfing.tokenKey);
      let headers = {...config.headers};
      if (token) {
        headers = {
          ...headers,
          'Authorization': `Token ${token}`,
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