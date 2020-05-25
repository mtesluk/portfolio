import axios from '../../configAxios';


interface Params {
  [name: string]: string | number | boolean;
}


class HttpService {
  get(url: string, params: Params = {}): Promise<any> {
    return axios.get(url, {params: params}).then(response => response.data);
  }

  post(url: string, data: {}, config: {} = {}): Promise<any> {
    return axios.post(url, data, config).then(response => response.data);
  }

  delete(url: string): Promise<any> {
    return axios.delete(url).then(response => response.data);
  }

  put(url: string, data: {}): Promise<any> {
    return axios.put(url, data).then(response => response.data);
  }
}

export default HttpService;