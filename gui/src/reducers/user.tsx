import { User } from "../interfaces/user";

const initialState: User = {
    token: '',
    username: ''
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
  }
  return state;
};

export default user;