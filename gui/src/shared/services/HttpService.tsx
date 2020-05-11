import axios from 'axios';


interface Filters {
  [name: string]: string | number;
}


class HttpService {
  get(url: string, filters: Filters = {}): Promise<any> {
    return axios.get(url, {params: filters}).then(response => response.data);
  }

  post(url: string, data: {}): Promise<any> {
    return axios.post(url, data).then(response => response.data);
  }

  delete(url: string, id: number): Promise<any> {
    return axios.delete(url).then(response => response.data);
  }

  put(url: string, data: {}): Promise<any> {
    return axios.put(url).then(response => response.data);
  }
}

export default HttpService;