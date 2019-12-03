import { handleActions } from 'redux-actions';
import { types } from './student.meta';

const initialState = {
  student: null,
  parent: null,
  siblings: [],
  busRoutes: [],
  busStops: [],
  loading: false,
  stage: 0,
  showParentForm: false,
};

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
  },
  initialState
);
