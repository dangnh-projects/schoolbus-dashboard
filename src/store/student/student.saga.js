import { takeLatest, select, put, call } from 'redux-saga/effects';
import { types, actionCreator } from './student.meta';
import { convertObjectToFormData } from 'utils/requestUtil';
import { notification } from 'antd';
import { navigate } from '@reach/router';

import { buildRequest } from 'api';
export const postRouteRequest = buildRequest('/core/api/bus-route');
export const postRouteLocationRequest = buildRequest('/core/api/bus-location');
export const getRouteLocationRequest = buildRequest('/core/api/bus-route');

export const postStudentRequest = buildRequest('/core/api/student');

function* postRoute({ payload }) {
  yield put(actionCreator.setLoading(true));
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const formData = convertObjectToFormData(payload);
    const { body } = yield call(postRouteRequest.request, {
      data: formData,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token.access}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });

    if (body && body.data) {
      yield put(actionCreator.postRouteLocationSuccess(body.data));
    }
    notification.success({
      message: 'Save bus route information successfully',
    });
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 403) {
      notification.error({
        message:
          "You don't have permission to perform this action, please try login again or contact administrator for more information",
      });
      return;
    }
    notification.error({ message: 'Request error' });
  }
  yield put(actionCreator.setLoading(false));
}

function* postStudent({ payload }) {
  yield put(actionCreator.setLoading(true));
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const formData = convertObjectToFormData(payload);
    const { body } = yield call(postStudentRequest.request, {
      data: formData,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token.access}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });

    if (body && body.data) {
      yield put(actionCreator.postStudentSuccess(body.data));
    }

    yield put(actionCreator.changeStage(1));
    notification.success({
      message: 'Save bus route information successfully',
    });
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 403) {
      notification.error({
        message:
          "You don't have permission to perform this action, please try login again or contact administrator for more information",
      });
      return;
    }
    notification.error({ message: 'Request error' });
  }
  yield put(actionCreator.setLoading(false));
}

export default function* busRouteSaga() {
  yield takeLatest(types.POST_STUDENT, postStudent);
  // yield takeLatest(TYPES.POST_ROUTE, postRoute);
  // yield takeLatest(TYPES.POST_ROUTE_LOCATION, postRouteLocation);
  // yield takeLatest(TYPES.GET_ROUTE_LOCATION, getRouteLocation);
}
