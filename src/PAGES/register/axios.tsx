import {axios} from '../../SERVICES/axios';

export const axios_sendVerificationCode = async (action: any) => {
  var axiosConfig: any = {
    method: 'post',
    url: '/user/register/email/send-code',
    data: action.data,
  };
  return await axios(axiosConfig);
};

export const axios_verifyVerificationCode = async (action: any) => {
  var axiosConfig: any = {
    method: 'post',
    url: '/user/register/email/verify-code',
    data: action.data,
  };
  return await axios(axiosConfig);
};

export const axios_register = async (action: any) => {
  var axiosConfig: any = {
    method: 'post',
    url: 'user/register/email',
    data: action.data,
  };
  return await axios(axiosConfig);
};
