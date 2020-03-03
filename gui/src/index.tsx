import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import './index.scss';

import * as serviceWorker from './serviceWorker';
import App from './components/App';
import store from './store';

axios.interceptors.request.use((config) => {
  const token = localStorage['token'];
  let headers = {...config.headers};
  if (token) {
    headers = {
      ...headers,
      'Authorization': `Token ${token}`
    }
    config = {
      ...config,
      headers
    }
  }
  return config;
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
