import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { TYPES, actionCreator } from './busRoute.meta';
import { convertObjectToFormData } from 'utils/requestUtil';
import { notification } from 'antd';
import { authenticate } from 'store/utils';

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

const apiCallWrapper = handler =>
  function*(action) {
    yield put(actionCreator.setLoading(true));

    const user = yield call(authenticate);
    try {
      yield call(handler, action, user);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        notification.error({
          message:
            "You don't have permission to perform this action, please try login again or contact administrator for more information",
        });
        return;
      }

      if (error.response && error.response.status === 500) {
        notification.error({
          message: error.response.data
            ? error.response.data.message
            : 'Request Error',
        });
        return;
      }

      notification.error({ message: 'Request error' });
    }

    yield put(actionCreator.setLoading(false));
  };

function* postRoute({ payload }, user) {
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
}

function* postRouteLocation({ payload }, user) {
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
  yield put(actionCreator.toggleModal());
}

function* getRouteLocation({ payload = 1 }, user) {
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
}

function* removeRouteLocation({ payload = {} }, user) {
  const { location, route } = payload;
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
}

function* updateRoute({ payload }, user) {
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
}

function* updateLocation({ payload }, user) {
  console.log(user);
  const formData = convertObjectToFormData(payload);
  const { body } = yield call(postRouteLocationRequest.request, {
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
    message: 'Save bus location information successfully',
  });
  yield put(actionCreator.toggleModal());
  yield put(actionCreator.getRouteLocations(payload.route));
}

export default function* busRouteSaga() {
  yield takeLatest(TYPES.POST_ROUTE, apiCallWrapper(postRoute));
  yield takeLatest(
    TYPES.POST_ROUTE_LOCATION,
    apiCallWrapper(postRouteLocation)
  );
  yield takeLatest(TYPES.GET_ROUTE_LOCATION, apiCallWrapper(getRouteLocation));
  yield takeLatest(
    TYPES.REMOVE_ROUTE_LOCATION,
    apiCallWrapper(removeRouteLocation)
  );
  yield takeLatest(TYPES.UPDATE_ROUTE, apiCallWrapper(updateRoute));

  yield takeEvery(TYPES.UPDATE_LOCATION, apiCallWrapper(updateLocation));
}
