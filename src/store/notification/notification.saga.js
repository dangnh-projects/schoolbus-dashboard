import { takeLatest, call, put, select } from 'redux-saga/effects';
import { notification } from 'antd';
import { types, actionCreator } from './notification.meta';
import { buildRequest } from 'api';
import { navigate } from '@reach/router';

export const apiRequest = buildRequest('/');

function* getListNotification(action) {
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const { body } = yield call(apiRequest.request, {
      url: action.payload.url,
      method: 'GET',
      headers: { Authorization: `Bearer ${user.token.access}` },
    });
    yield put(actionCreator.getListNotificationSuccess({ data: body.data }));
  } catch (error) {
    notification.error({ message: 'Request error' });
  }
}

function* editListNotification({ payload }) {
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const { body } = yield call(apiRequest.request, {
      url: payload.url,
      method: 'POST',
      data: payload.params,
      headers: { Authorization: `Bearer ${user.token.access}` },
    });
    yield put(
      actionCreator.editListNotificationSuccess({ editData: body.data })
    );
    notification.success({
      message: 'Update success!',
      duration: 1.5,
    });
  } catch (error) {
    notification.error({ message: 'Request error' });
  }
}

export default function* notificationSaga() {
  yield takeLatest(types.GET_LIST_NOTIFICATION, getListNotification);
  yield takeLatest(types.EDIT_LIST_NOTIFICATION, editListNotification);
}
