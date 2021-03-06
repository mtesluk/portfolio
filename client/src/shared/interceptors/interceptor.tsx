import ErrorResponseInterceptor from "./response_error.interceptor";
import TokenInterceptor from "./token.interceptor";

class Interceptor {
  private _errInterceptor: ErrorResponseInterceptor = new ErrorResponseInterceptor();
  private _tokenInterceptor: TokenInterceptor = new TokenInterceptor();

  initInterceptors(notifyError: (msg: string) => void, setToken: (token: string) => void) {
    this._errInterceptor.initInterceptor(notifyError, setToken);
    this._tokenInterceptor.initInterceptor();
  }
}

export default Interceptor;