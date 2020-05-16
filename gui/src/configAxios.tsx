import { default as originAxios } from 'axios';

const axios = originAxios.create({
  baseURL: process.env.PUBLIC_URL,
});

export default axios;