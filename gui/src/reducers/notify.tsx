import { Notification } from 'shared/interfaces/notification.interface';


const initialState = {
  type: 'INFO',
  msg: 'INFO'
}

const notify = (state: Notification = initialState, action: Notification) => {
  if (['info', 'success', 'warning', 'error'].includes(action.type)) {
    state = {
      ...state,
      type: action.type,
      msg: action.msg
    }
  }
  return state;
};

export default notify;
