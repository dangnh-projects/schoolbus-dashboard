import { createAction } from 'redux-actions';

export const types = {
  EDIT_PROFILE: 'EDIT_PROFILE',
  EDIT_PROFILE_SUCCESS: 'EDIT_PROFILE_SUCCESS',
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER: 'REGISTER',
};

export const actionCreator = {
  editProfile: createAction(types.EDIT_PROFILE),
  editProfileSuccess: createAction(types.EDIT_PROFILE_SUCCESS),
  login: createAction(types.LOGIN),
  loginSuccess: createAction(types.LOGIN_SUCCESS),
  register: createAction(types.REGISTER),
};
