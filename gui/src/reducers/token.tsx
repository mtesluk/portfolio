const initialState: string = '';

interface Action {
  type: string;
  value: string;
};

const token = (state: string = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_TOKEN' :
      state = action.value
    break;
  }
  return state;
};

export default token;