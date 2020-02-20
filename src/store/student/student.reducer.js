import { handleActions } from 'redux-actions';
import { types } from './student.meta';

const initialState = {
  student: null,
  parent: null,
  contact: null,
  siblings: [],
  busRoutes: [],
  busStops: [],
  contacts: [],
  loading: false,
  stage: 0,
  showParentForm: false,
};

const getContactSuccess = (state, action) => ({
  ...state,
  contacts: action.payload,
});

const postStudentSuccess = (state, action) => ({
  ...state,
  student: action.payload,
});

const searchParentSuccess = (state, action) => ({
  ...state,
  parent: action.payload,
});

const postParentSuccess = (state, action) => ({
  ...state,
  parent: action.payload,
});

const postContactSuccess = (state, action) => ({
  ...state,
  contact: action.payload,
});

const changeStage = (state, action) => ({
  ...state,
  stage: action.payload,
});

const changeLoading = (state, action) => ({
  ...state,
  loading: !!action.payload,
});

const setSiblings = (state, action) => ({
  ...state,
  siblings: action.payload,
});

const updateStudentSuccess = (state, action) => ({
  ...state,
  student: action.payload,
});

const setShowParentForm = (state, action) => ({
  ...state,
  showParentForm: !!action.payload,
});

export default handleActions(
  {
    [types.SET_LOADING]: changeLoading,
    [types.CHANGE_STAGE]: changeStage,
    [types.POST_STUDENT_SUCCESS]: postStudentSuccess,
    [types.SEARCH_PARENT_SUCCESS]: searchParentSuccess,
    [types.SET_SIBLING]: setSiblings,
    [types.POST_PARENT_SUCCESS]: postParentSuccess,
    [types.UPDATE_STUDENT_SUCCESS]: updateStudentSuccess,
    [types.SET_SHOW_PARENT_FORM]: setShowParentForm,
    [types.GET_CONTACT_SUCCESS]: getContactSuccess,
    [types.POST_CONTACT_SUCCESS]: postContactSuccess,
  },
  initialState
);
