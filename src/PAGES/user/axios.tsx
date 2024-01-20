import { axios } from '../../SERVICES/axios';

export const axios_user = async (action: any) => {
  var axiosConfig: any = {
    method: 'get',
    url: `/user/data${action.moreUrl ? `${action.moreUrl}` : ''}`,
    params: action.params,
  };
  return await axios(axiosConfig, true);
};

export const axios_setUser = async (action: any) => {
  var axiosConfig: any = {
    method: 'put',
    url: `/user/set${action.userId ? `/${action.userId}` : ''}`,
    data: action.data,
  };
  return await axios(axiosConfig, true);
};

export const axios_setUserAvatar = async (action: any) => {
  var axiosConfig: any = {
    method: 'post',
    url: `/user/set-avatar${action.userId ? `/${action.userId}` : ''}`,
    data: action.data,
  };
  return await axios(axiosConfig, true, 'form-data');
};

export const axios_setUserIDPhoto = async (action: any) => {
  if (!action.type) {
    action.type = 'default';
  }
  var axiosConfig: any = {
    method: 'post',
    url: `/user/set-id-photo/${action.type}${
      action.userId ? `/${action.userId}` : ''
    }`,
    data: action.data,
  };
  return await axios(axiosConfig, true, 'form-data');
};
