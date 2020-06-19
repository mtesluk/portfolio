export const notifyInfo = (msg: string) => {
  return {
      type: 'info',
      msg: msg
  };
}

export const notifySuccess = (msg: string) =>  {
  return {
      type: 'success',
      msg: msg
  };
}

export const notifyWarning = (msg: string) => {
  return {
      type: 'warning',
      msg: msg
  };
}

export const notifyError = (msg: string) => {
  return {
      type: 'error',
      msg: msg
  };
}