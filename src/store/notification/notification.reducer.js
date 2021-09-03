import { handleActions } from 'redux-actions';
import { types } from './notification.meta';

const initialState = {
  data: [],
  editData: [],
};

const getListNotificationSuccess = (state, action) => ({
  ...state,
  data: action.payload.data,
});

const editListNotificationSuccess = (state, action) => ({
  ...state,
  editData: action.payload.editData,
});

export default handleActions(
  {
    [types.GET_LIST_NOTIFICATION_SUCCESS]: getListNotificationSuccess,
    [types.EDIT_LIST_NOTIFICATION_SUCCESS]: editListNotificationSuccess,
  },
  initialState
);
