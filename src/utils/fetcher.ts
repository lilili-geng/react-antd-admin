import { message } from 'antd';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ErrorResponse {
  message?: string;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  url?: string;
}

const fetcher = Axios.create({
  headers: {},
});

const token = localStorage.getItem('_accessToken') || ''

fetcher.interceptors.request.use((config: CustomAxiosRequestConfig) => {

  if (import.meta.env.DEV) {
    config.baseURL = import.meta.env.VITE_APP_BASE_API;
    config.url = config.url;
  }

  if (config.url === "/oauth/token") {
    config.headers['Authorization'] = 'Basic ' + btoa('backend:123456');
  }

  if (token && config.headers && !config.headers['Authorization']) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config;
});

fetcher.interceptors.response.use(
  (resp: AxiosResponse) => {

    if (resp.data?.code == 401) {
      message.error(resp.data.message)
    }

    if (resp.status >= 200 && resp.status <= 300) {
      return resp.data;
    }


    const error: ErrorResponse = {
      message: resp.data?.message || 'Server failed.',
    };
    return Promise.reject(error);
  },
  (err) => {
    const error: ErrorResponse = {
      ...err,
      message: err?.response?.data?.message || err?.message || 'Server error',
    };
    throw error;
  }
);

export default fetcher;
