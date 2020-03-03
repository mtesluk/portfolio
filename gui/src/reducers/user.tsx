import { User } from "../interfaces/user";

const initialState: User = {
    token: localStorage['token'],
    username: '',
    facebook_id: '',
};

interface Action {
  type: string;
  value: string;
};


const user = (state: User = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_TOKEN' :
      state = {
          ...state,
          token: action.value
      };
    break;
    case 'SET_FACEBOOK_ID' :
      state = {
          ...state,
          facebook_id: action.value
      };
    break;
  }
  return state;
};

export default user;