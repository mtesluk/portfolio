import { config } from 'config';
import HttpService from './HttpService';


class UserService {
  _httpService: HttpService = new HttpService();

  getUsers(users: string | number) {
    const url = `${config.endpoints.auth.users}`;
    return this._httpService.get(url, {ids: users}).then(response => response);
  }

  putUser(data: {}) {
    const url = `${config.endpoints.auth.users}`;
    return this._httpService.put(url, data).then(response => response);
  }
}

export default UserService;