import { createAction } from 'redux-actions';

export const types = {
  POST_STUDENT: 'POST_STUDENT',
  POST_STUDENT_SUCCESS: 'POST_STUDENT_SUCCESS',

  CHANGE_STAGE: 'CHANGE_STAGE',
  SET_LOADING: 'SET_LOADING',

  SEARCH_PARENT: 'SEARCH_PARENT',
  SEARCH_PARENT_SUCCESS: 'SEARCH_PARENT_SUCCESS',

  POST_PARENT: 'POST_PARENT',
  POST_PARENT_SUCCESS: 'POST_PARENT_SUCCESS',

  POST_CONTACT: 'POST_CONTACT',
  POST_CONTACT_SUCCESS: 'POST_CONTACT_SUCCESS',

  UPDATE_STUDENT: 'UPDATE_STUDENT',
  UPDATE_STUDENT_SUCCESS: 'UPDATE_STUDENT_SUCCESS',

  SET_SIBLING: 'SET_SIBLING',

  GET_BUS_ROUTES: 'GET_BUS_ROUTES',
  GET_BUS_ROUTES_SUCCESS: 'GET_BUS_ROUTES_SUCCESS',

  GET_BUS_STOP: 'GET_BUS_STOP',
  GET_BUS_STOP_SUCCESS: 'GET_BUS_STOP_SUCCESS',

  GET_CONTACT: 'GET_CONTACT',
  GET_CONTACT_SUCCESS: 'GET_CONTACT_SUCCESS',

  ADD_STUDENT_TO_BUS_LOCATION: 'ADD_STUDENT_TO_BUS_LOCATION',
  ADD_STUDENT_TO_BUS_LOCATION_SUCCESS: 'ADD_STUDENT_TO_BUS_LOCATION_SUCCESS',

  SET_SHOW_PARENT_FORM: 'SET_SHOW_PARENT_FORM',
};

export const actionCreator = {
  postStudent: createAction(types.POST_STUDENT),
  postStudentSuccess: createAction(types.POST_STUDENT_SUCCESS),

  changeStage: createAction(types.CHANGE_STAGE),
  setLoading: createAction(types.SET_LOADING),

  searchParent: createAction(types.SEARCH_PARENT),
  searchParentSuccess: createAction(types.SEARCH_PARENT_SUCCESS),
  setSibling: createAction(types.SET_SIBLING),

  postParent: createAction(types.POST_PARENT),
  postParentSuccess: createAction(types.POST_PARENT_SUCCESS),

  updateStudent: createAction(types.UPDATE_STUDENT),
  updateStudentSuccess: createAction(types.UPDATE_STUDENT_SUCCESS),

  getContact: createAction(types.GET_CONTACT),
  getContactSuccess: createAction(types.GET_CONTACT_SUCCESS),

  postContact: createAction(types.POST_CONTACT),
  postContactSuccess: createAction(types.POST_CONTACT_SUCCESS),

  addToLocation: createAction(types.ADD_STUDENT_TO_BUS_LOCATION),
  addToLocationSuccess: createAction(types.ADD_STUDENT_TO_BUS_LOCATION_SUCCESS),

  setShowParentForm: createAction(types.SET_SHOW_PARENT_FORM),
};
