import { createSlice } from '@reduxjs/toolkit';
//simplify process crating Redux slices

const initialState = {
  // representing a specific piece of state
  is_login: false,
  //user not logged
  req_session_time: 0,
  //request session time
  res_session_time: 0,
  //response session time

  session: {
    //properties related to session
    data: null,
    //hold any data related to the session. Set as null
    is_loading: false,
    //session data not being loaded
    status: false,
    //boolean value represent the status session
  },
};

const app: any = createSlice({
  name: 'user',
  initialState: { ...initialState },
  reducers: {
    reset: () => initialState,
    //reset initialState

    handleIsLogin: (state, action: any) => {
      state.is_login = action.payload.is_login;
    },
    //update is_login property of user slice

    handleReqSessionTime: (state) => {
      state.req_session_time = new Date().getTime();
    },
    

    handleUserSession: (state, action: any) => {
      if (!action.payload.is_loading && action.payload.data) {
        state.session.data = action.payload.data;
        state.session.status = true;
        state.res_session_time = new Date().getTime();
      } else if (!action.payload.is_loading && !action.payload.data) {
        state.session.status = false;
        state.session.data = null;
        state.res_session_time = 0;
      }
      state.session.is_loading = action.payload.is_loading;
    },
  },
});

export const {
  handleIsLogin,
  handleReqSessionTime,
  handleUserSession,

  reset,
} = app.actions;
export default app.reducer;
