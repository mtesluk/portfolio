import axios, { AxiosResponse, AxiosError } from 'axios';


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
      console.log(data)
      msg = msg || data.message || data.non_field_errors[0];
      if (msg) {
        notifyError(msg);
        throw new Error(msg);
      }
    })
  }
}

export default ErrorResponseInterceptor;