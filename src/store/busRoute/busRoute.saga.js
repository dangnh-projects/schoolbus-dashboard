import { takeLatest, select, put, call } from 'redux-saga/effects';
import { TYPES, actionCreator } from './busRoute.meta';
import { convertObjectToFormData } from 'utils/requestUtil';
import { notification } from 'antd';
import { navigate } from '@reach/router';

import { buildRequest } from 'api';
export const postRouteRequest = buildRequest('/core/api/bus-route');
export const getRouteLocationRequest = buildRequest('/core/api/bus-route');
export const postRouteLocationRequest = buildRequest('/core/api/bus-location');
export const removeRouteLocationRequest = buildRequest(
  '/core/api/bus-location',
  {
    method: 'DELETE',
  }
);

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
      yield put(actionCreator.postRouteSuccess(body.data));
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

function* postRouteLocation({ payload }) {
  yield put(actionCreator.setLoading(true));
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const formData = convertObjectToFormData(payload);
    const { body } = yield call(postRouteLocationRequest.request, {
      data: formData,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token.access}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (body && body.data) {
      // yield put(actionCreator.postRouteLocationSuccess(body.data));
      yield put(actionCreator.getRouteLocations(payload.route));
    }

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
    notification.error({ message: 'Request error' });
  }
  yield put(actionCreator.setLoading(false));
}

function* getRouteLocation({ payload = 1 }) {
  yield put(actionCreator.setLoading(true));
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const { body } = yield call(getRouteLocationRequest.request, {
      url: `/${payload}/locations`,
      headers: {
        Authorization: `Bearer ${user.token.access}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });
    if (body && body.data) {
      yield put(actionCreator.getRouteLocationSuccess(body.data));
    }
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

function* removeRouteLocation({ payload = {} }) {
  const { location, route } = payload;
  yield put(actionCreator.setLoading(true));
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const { body } = yield call(removeRouteLocationRequest.request, {
      url: `/${location}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token.access}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });
    if (body && body.data) {
      yield put(actionCreator.getRouteLocations(route));
    }
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

function* updateRoute({ payload }) {
  console.log('in saga');
  console.log(payload);
  yield put(actionCreator.setLoading(true));
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const formData = convertObjectToFormData(payload);
    const { body } = yield call(postRouteRequest.request, {
      url: '/' + payload.id,
      data: formData,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user.token.access}`,
        // 'Content-Type': 'multipart/form-data',
      },
    });

    if (body && body.data) {
      // yield put(actionCreator.postRouteSuccess(body.data));
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

export default function* busRouteSaga() {
  yield takeLatest(TYPES.POST_ROUTE, postRoute);
  yield takeLatest(TYPES.POST_ROUTE_LOCATION, postRouteLocation);
  yield takeLatest(TYPES.GET_ROUTE_LOCATION, getRouteLocation);
  yield takeLatest(TYPES.REMOVE_ROUTE_LOCATION, removeRouteLocation);
  yield takeLatest(TYPES.UPDATE_ROUTE, updateRoute);
}
