import { createAction } from 'redux-actions';

export const types = {
  SET_STUDENTS: 'SET_STUDENTS',
  ADD_STUDENT: 'ADD_STUDENT',
  REMOVE_STUDENT: 'REMOVE_STUDENT',
  SET_ROUTES: 'SET_ROUTES',

  SEND_MESSAGE: 'SEND_MESSAGE',
  SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
};

export const actionCreator = {
  setStudents: createAction(types.SET_STUDENTS),

  addStudent: createAction(types.ADD_STUDENT),
  removeStudent: createAction(types.REMOVE_STUDENT),

  setRoutes: createAction(types.SET_ROUTES),

  sendMessage: createAction(types.SEND_MESSAGE),
  sendMessageSuccess: createAction(types.SEND_MESSAGE_SUCCESS),
};
