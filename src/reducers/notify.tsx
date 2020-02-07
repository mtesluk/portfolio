const notify = (state = {type: 'INFO', msg: 'INFO'}, action: {type: string, msg: string}) => {
  state = {
    ...state,
    type: action.type,
    msg: action.msg
  }
  return state;
};

export default notify;