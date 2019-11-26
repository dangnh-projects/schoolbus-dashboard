import {
  takeLatest,
  select,
  put,
  call,
  all,
  takeEvery,
} from 'redux-saga/effects';
import { types, actionCreator } from './student.meta';
import { convertObjectToFormData } from 'utils/requestUtil';
import { notification } from 'antd';
import { navigate } from '@reach/router';

import { buildRequest } from 'api';
export const postRouteRequest = buildRequest('/core/api/bus-route');
export const postRouteLocationRequest = buildRequest('/core/api/bus-location');
export const getRouteLocationRequest = buildRequest('/core/api/bus-route');

export const postStudentRequest = buildRequest('/core/api/student');
export const searchParentRequest = buildRequest(
  '/core/api/parent/by-id-number'
);

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
        'Content-Type': 'multipart/form-data',
      },
    });

    if (body && body.data) {
      yield put(actionCreator.postStudentSuccess(body.data));
    }

    yield put(actionCreator.changeStage(1));
    notification.success({
      message: 'Save student information successfully',
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

function* searchParent({ payload }) {
  yield put(actionCreator.setLoading(true));
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const { idNumber } = payload;
    const { body } = yield call(searchParentRequest.request, {
      url: `/${idNumber}`,
      headers: {
        Authorization: `Bearer ${user.token.access}`,
      },
    });

    if (body && body.data) {
      const { parent, children } = body.data;
      yield all([
        put(actionCreator.searchParentSuccess(parent)),
        put(actionCreator.setSibling(children)),
      ]);
    }
    // yield put(actionCreator.changeStage(1));
    notification.success({
      message: 'Save bus route information successfully',
    });
  } catch (error) {
    if (error.response && error.response.status === 403) {
      notification.error({
        message:
          "You don't have permission to perform this action, please try login again or contact administrator for more information",
      });
      return;
    }

    if (error.response && error.response.status === 404) {
      notification.error({ message: 'Parent not found' });
      return;
    }
    notification.error({ message: 'Request error' });
  }
  yield put(actionCreator.setLoading(false));
}

function* updateStudent({ payload }) {
  yield put(actionCreator.setLoading(true));

  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }

  try {
    const formData = convertObjectToFormData(payload.data);
    yield call(postStudentRequest.request, {
      url: payload.alternativeURL || `/${payload.data.id}`,
      data: formData,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user.token.access}`,
      },
    });

    notification.success({ message: 'Student updated successfully' });
    yield put(actionCreator.changeStage(2));
  } catch (error) {
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

function* addToLocation({ payload }) {
  yield put(actionCreator.setLoading(true));

  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }

  try {
    const formData = convertObjectToFormData(payload);
    yield call(postStudentRequest.request, {
      url: '/bus-route',
      method: 'POST',
      data: formData,
      headers: {
        Authorization: `Bearer ${user.token.access}`,
      },
    });

    notification.success({ message: 'Student added successfully' });
    yield put(actionCreator.changeStage(0));
    yield put(navigate, '/dashboard/student');
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
  yield takeLatest(types.SEARCH_PARENT, searchParent);
  yield takeLatest(types.UPDATE_STUDENT, updateStudent);
  yield takeEvery(types.ADD_STUDENT_TO_BUS_LOCATION, addToLocation);
}
