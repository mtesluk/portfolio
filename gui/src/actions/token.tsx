export function setToken(value: string) {
  return {type: 'SET_TOKEN', value};
}

export function resetToken() {
  return {type: 'SET_TOKEN', value: ''};
}
