import { axios } from '../../SERVICES/axios';

export const axios_sendVerificationCode = async (action: any) => {
  var axiosConfig: any = {
    method: 'post',
    url: '/user/forgot-password/email/send-code',
    data: action.data,
  };
  return await axios(axiosConfig);
};

export const axios_verifyVerificationCode = async (action: any) => {
  var axiosConfig: any = {
    method: 'post',
    url: '/user/forgot-password/email/verify-code',
    data: action.data,
  };
  return await axios(axiosConfig);
};

export const axios_createNewPassword = async (action: any) => {
  var axiosConfig: any = {
    method: 'post',
    url: '/user/forgot-password/create-new-password',
    data: action.data,
  };
  return await axios(axiosConfig);
};
