export function notifyInfo(msg: string) {
  return {
      type: "info",
      msg: msg
  };
}

export function notifySuccess(msg: string) {
  return {
      type: "success",
      msg: msg
  };
}

export function notifyWarning(msg: string) {
  return {
      type: "warning",
      msg: msg
  };
}

export function notifyError(msg: string) {
  return {
      type: "error",
      msg: msg
  };
}