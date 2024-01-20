import { createSlice } from '@reduxjs/toolkit';
import { setIsAutoTheme, setIsDarkTheme } from '../SERVICES/sessions';
const defaultSnackbarMessage: any = {
  open: false,
  message: '',
  type: 'info',
  position: ['bottom', 'left'],
};

const app: any = createSlice({
  name: 'app',
  initialState: {
    is_dark_theme: false,
    is_auto_theme: true,
    lang: 'ms',
    snackbar: {
      ...defaultSnackbarMessage,
    },
    modal_complete: {
      open: false,
      type: null,
      data: null,
    },
    main_drawer: {
      open: false,
    },
    modal_group: {
      open: false,
      type: null,
      data: null,
    },
    modal_meet: {
      open: false,
      type: null,
      data: null,
    },
    modal_user: {
      open: false,
      type: null,
      data: null,
    },
  },
  reducers: {
    handleIsDarkTheme: (state, action: any) => {
      state.is_dark_theme = action.payload.is_dark_theme;
      setIsDarkTheme(`${action.payload.is_dark_theme}`);
    },
    handleIsAutoTheme: (state, action: any) => {
      state.is_auto_theme = action.payload.is_auto_theme;
      setIsAutoTheme(`${action.payload.is_auto_theme}`);
    },
    handleChangeLang: (state, action: any) => {
      state.lang = action.payload.lang;
    },
    handleSnackbar: (state, action: any) => {
      state.snackbar = action.payload;
      if (!state.snackbar.position && action.payload.open) {
        state.snackbar.position = ['bottom', 'left'];
      }
      if (!action.payload.open) {
        state.snackbar.open = false;
        state.snackbar.message = '';
        state.snackbar.type = 'info';
        state.snackbar.position = ['bottom', 'left'];
      }
    },
    handleModalComplete: (state, action: any) => {
      state.modal_complete = action.payload;
      if (!action.payload.open) {
        state.modal_complete.open = false;
        state.modal_complete.type = null;
        state.modal_complete.data = null;
      }
      if (!action.payload.data) {
        state.modal_complete.data = null;
      }
    },
    handleMainDrawer: (state, action: any) => {
      state.main_drawer = action.payload;
      if (!action.payload.open) {
        state.main_drawer.open = false;
      }
    },
    handleModalGroup: (state, action: any) => {
      state.modal_group = action.payload;
      if (!action.payload.open) {
        state.modal_group.open = false;
        state.modal_group.type = null;
        state.modal_group.data = null;
      }
      if (!action.payload.data) {
        state.modal_group.data = null;
      }
    },
    handleModalMeet: (state, action: any) => {
      state.modal_meet = action.payload;
      if (!action.payload.open) {
        state.modal_meet.open = false;
        state.modal_meet.type = null;
        state.modal_meet.data = null;
      }
      if (!action.payload.data) {
        state.modal_meet.data = null;
      }
    },
    handleModalUser: (state, action: any) => {
      state.modal_user = action.payload;
      if (!action.payload.open) {
        state.modal_user.open = false;
        state.modal_user.type = null;
        state.modal_user.data = null;
      }
      if (!action.payload.data) {
        state.modal_user.data = null;
      }
    },
  },
});

export const {
  handleIsDarkTheme,
  handleIsAutoTheme,
  handleSnackbar,
  handleModalComplete,
  handleModalUpgrade,
  handleMainDrawer,
  handleModalGroup,
  handleModalMeet,
  handleModalUser,
} = app.actions;
export default app.reducer;
