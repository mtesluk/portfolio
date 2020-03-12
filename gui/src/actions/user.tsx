import { User } from "../interfaces/user";

export function setUserData(user: User) {
  return {type: 'SET_USER_DATA', data: user};
}
