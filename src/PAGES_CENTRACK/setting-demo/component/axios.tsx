import { axios } from "../../../SERVICES/axios";

export const axios_searchEmail = async (action: any) => {
    var axiosConfig: any = {
        method: 'post',
        url: '',
        data: action.data,
    };
    return await axios(axiosConfig);
};