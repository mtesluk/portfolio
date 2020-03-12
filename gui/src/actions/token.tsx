export function setToken(value: string) {
  return {type: 'SET_TOKEN', value};
}

export function resetToken() {
  localStorage['token'] = '';
  return {type: 'SET_TOKEN', value: ''};
}