import { Element, ElementType } from '../interfaces/blog';
import HttpService from './HttpService';
import axios from '../../configAxios';
import { config } from '../../config';


class UserService {
  _httpService: HttpService = new HttpService();

  getUsers(users: string | number) {
    const url = `${config.endpoints.auth.users}`;
    return this._httpService.get(url, {ids: users}).then(response => response);
  }
}

export default UserService;