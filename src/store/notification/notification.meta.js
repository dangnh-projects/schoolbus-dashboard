import { createAction } from 'redux-actions';

export const types = {
  GET_LIST_NOTIFICATION: 'GET_LIST_NOTIFICATION',
  GET_LIST_NOTIFICATION_SUCCESS: 'GET_LIST_NOTIFICATION_SUCCESS',

  EDIT_LIST_NOTIFICATION: 'EDIT_LIST_NOTIFICATION',
  EDIT_LIST_NOTIFICATION_SUCCESS: 'EDIT_LIST_NOTIFICATION_SUCCESS',
};

export const actionCreator = {
  getListNotification: createAction(types.GET_LIST_NOTIFICATION),
  getListNotificationSuccess: createAction(types.GET_LIST_NOTIFICATION_SUCCESS),

  editListNotification: createAction(types.EDIT_LIST_NOTIFICATION),
  editListNotificationSuccess: createAction(
    types.EDIT_LIST_NOTIFICATION_SUCCESS
  ),
};
