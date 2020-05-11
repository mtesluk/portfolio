import axios from 'axios';


interface Filters {
  [name: string]: string | number;
}


class HttpService {
  get(url: string, filters: Filters = {}): Promise<any> {
    return axios.get(url, {params: filters}).then(response => response.data);
  }
}

export default HttpService;