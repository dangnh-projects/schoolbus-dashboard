import { createAction } from 'redux-actions';

export const types = {
  ADD_STUDENTS: 'ADD_STUDENTS',
  SET_ROUTES: 'SET_ROUTES',

  SEND_MESSAGE: 'SEND_MESSAGE',
  SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
};

export const actionCreator = {
  addStudent: createAction(types.ADD_STUDENTS),
  setRoutes: createAction(types.SET_ROUTES),

  sendMessage: createAction(types.SEND_MESSAGE),
  sendMessageSuccess: createAction(types.SEND_MESSAGE_SUCCESS),
};
