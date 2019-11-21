import { createAction } from 'redux-actions';

export const types = {
  POST_STUDENT: 'POST_STUDENT',
  POST_STUDENT_SUCCESS: 'POST_STUDENT_SUCCESS',

  CHANGE_STAGE: 'CHANGE_STAGE',
  SET_LOADING: 'SET_LOADING',

  GET_PARENT: 'GET_PARENT',
  GET_PARENT_SUCCESS: 'GET_PARENT_SUCCESS',

  POST_PARENT: 'POST_PARENT',
  POST_PARENT_SUCCESS: 'POST_PARENT_SUCCESS',

  UPDATE_STUDENT: 'UPDATE_STUDENT',
  UPDATE_STUDENT_SUCCESS: 'UPDATE_STUDENT_SUCCESS',

  GET_BUS_ROUTES: 'GET_BUS_ROUTES',
  GET_BUS_ROUTES_SUCCESS: 'GET_BUS_ROUTES_SUCCESS',

  GET_BUS_STOP: 'GET_BUS_STOP',
  GET_BUS_STOP_SUCCESS: 'GET_BUS_STOP_SUCCESS',

  ADD_STUDENT_TO_BUS_LOCATION: 'ADD_STUDENT_TO_BUS_LOCATION',
  ADD_STUDENT_TO_BUS_LOCATION_SUCCESS: 'ADD_STUDENT_TO_BUS_LOCATION_SUCCESS',
};

export const actionCreator = {
  postStudent: createAction(types.POST_STUDENT),
  postStudentSuccess: createAction(types.POST_STUDENT_SUCCESS),

  changeStage: createAction(types.CHANGE_STAGE),
  setLoading: createAction(types.SET_LOADING),

  getParent: createAction(types.GET_PARENT),
  getParentSuccess: createAction(types.GET_PARENT_SUCCESS),

  postParent: createAction(types.POST_PARENT),
  postParentSuccess: createAction(types.POST_PARENT_SUCCESS),

  updateStudent: createAction(types.UPDATE_STUDENT),
  updateStudentSuccess: createAction(types.UPDATE_STUDENT_SUCCESS),

  addToLocation: createAction(types.ADD_STUDENT_TO_BUS_LOCATION),
  addToLocationSuccess: createAction(types.ADD_STUDENT_TO_BUS_LOCATION_SUCCESS),
};
