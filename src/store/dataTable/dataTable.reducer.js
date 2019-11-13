import { handleActions } from 'redux-actions';
import { types } from './dataTable.meta';

const initialState = {
  data: [],
  count: 0,
  page: 1,
  loading: false,
};

const getListSuccess = (state, action) => ({
  ...state,
  data: action.payload.data,
  count: action.payload.count,
});

const setPage = (state, action) => ({
  ...state,
  page: action.payload,
});

const setLoading = (state, action) => ({
  ...state,
  loading: action.payload,
});

export default handleActions(
  {
    [types.GET_LIST_SUCCESS]: getListSuccess,
    [types.SET_PAGE]: setPage,
    [types.SET_LOADING]: setLoading,
  },
  initialState
);
