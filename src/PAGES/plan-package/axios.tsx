import { axios } from '../../SERVICES/axios';

export const axios_login = async (action: any) => {
  var axiosConfig: any = {
    method: 'post',
    url: '/user/login/default',
    data: action.data,
  };

  return await axios(axiosConfig);
};

export const axios_loginByToken = async (action: any) => {
  var axiosConfig: any = {
    method: 'post',
    url: '/auth/token',
    data: action.data,
  };

  return await axios(axiosConfig);
};
