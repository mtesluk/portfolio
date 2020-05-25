import { AxiosResponse, AxiosError } from 'axios';
import axios from 'configAxios';


class ErrorResponseInterceptor {
  staticMessages = {
    504: 'Problem with server connection',
    0: 'Unrecognized error',
  }

  initInterceptor(notifyError: (msg: string) => void) {
    axios.interceptors.response.use((config: AxiosResponse) => {
      return config;
    }, (error: AxiosError) => {
      const status = error.response?.status || 0;
      let msg = this.staticMessages[status];
      const data = error.response?.data;
      msg = msg || data.message || (data.non_field_errors && data.non_field_errors[0]) || this.staticMessages['0'];
      console.log('[ERROR]', msg);
      if (msg.length) {
        notifyError(msg);
        throw new Error(msg);
      }
    })
  }
}

export default ErrorResponseInterceptor;