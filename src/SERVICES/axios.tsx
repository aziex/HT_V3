import ax, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getUserToken } from './sessions';
const ENV = import.meta.env;
export const axios = async (
  config: AxiosRequestConfig,
  isAuthHeader?: boolean,
  contentType?: string
) => {
  const AUTH_TOKEN: string | boolean = getUserToken();
  ax.defaults.baseURL = ENV.VITE_APP_SERVER_API_ENDPOINT;
  if (isAuthHeader) {
    ax.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  }

  if (!contentType) {
    ax.defaults.headers.post['Content-Type'] = 'application/json';
  } else {
    if (contentType == 'form-data') {
      ax.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    } else {
      ax.defaults.headers.post['Content-Type'] = 'application/json';
    }
  }

  return await new Promise<string>(async (resolve, reject: any) => {
    return ax(config)
      .then(function (response: AxiosResponse) {
        resolve(response.data);
      })
      .catch(function (error: any) {
        if (error?.response?.data) {
          if (error?.response?.data?.message) {
            console.error(error?.response?.data?.message);
            resolve(error.response.data);
          } else {
            const obj: any = { status: false, message: error.message };
            console.error(obj.message);
            resolve(obj);
          }
        } else {
          const obj: any = { status: false, message: error.message };
          console.error(obj.message);
          resolve(obj);
        }
      });
  });
};
