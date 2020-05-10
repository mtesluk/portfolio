import axios, { AxiosResponse, AxiosError } from 'axios';


class ErrorResponseInterceptor {
  messages = {
    504: 'Problem with server connection',
    500: 'Error occured on server side',
    0: 'Unrecognized error',
  }

  initInterceptor(notifyError: (msg: string) => void) {
    axios.interceptors.response.use((config: AxiosResponse) => {
      return config;
    }, (error: AxiosError) => {
      const status = error.response?.status || 0;
      notifyError(this.messages[status]);
    })
  }
}

export default ErrorResponseInterceptor;