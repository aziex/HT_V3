import axios from 'axios';

export const axios_logout = async (action: { data: any }) => {
  try {
    const response = await axios.post('/user/logout', action.data);

    if (response.status === 200) {
      return { status: true, message: 'Logout successful' };
    } else {
      return { status: false, message: 'Logout failed' };
    }
  } catch (error: any) {
    let errorMessage = 'Logout failed';

    if (error.response) {
      errorMessage = `Logout failed: ${error.response.status} - ${error.response.data.message}`;
    } else if (error.request) {
      errorMessage = 'Logout failed: No response received from the server';
    } else {
      errorMessage = `Logout failed: ${error.message}`;
    }

    return { status: false, message: errorMessage };
  }
};
