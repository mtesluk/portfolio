import { User, Profile } from "shared/interfaces/user";


const profile: Profile = {
  location: '',
  facebook_id: '',
  facebook_name: '',
}

const initialState: User = {
    username: '',
    profile: profile,
};

interface Action {
  type: string;
  data: User;
};


const user = (state: User = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_USER_DATA' :
      state = {...action.data};
    break;
  }
  return state;
};

export default user;