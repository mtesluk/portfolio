
const initialState = false;

interface Action {
  type: string,
  value: boolean
};

const isOpenLoginDialog = (state: boolean = initialState, action: Action) => {
  switch (action.type) {
    case 'OPEN_LOGIN' :
      state = action.value;
    break;
  }
  return state;
};

export default isOpenLoginDialog;