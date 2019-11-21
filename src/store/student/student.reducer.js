import { handleActions } from 'redux-actions';
import { types } from './student.meta';

const initialState = {
  student: null,
  parent: null,
  busRoutes: [],
  busStops: [],
  loading: false,
  stage: 0,
};

const postStudentSuccess = (state, action) => ({
  ...state,
  student: action.payload,
});

const getParentSuccess = (state, action) => ({
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

export default handleActions(
  {
    [types.SET_LOADING]: changeLoading,
    [types.CHANGE_STAGE]: changeStage,
    [types.POST_STUDENT_SUCCESS]: postStudentSuccess,
    [types.GET_PARENT_SUCCESS]: getParentSuccess,
    [types.POST_PARENT_SUCCESS]: postParentSuccess,
  },
  initialState
);
