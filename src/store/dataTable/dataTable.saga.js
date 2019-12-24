import { takeLatest, call, put, select } from 'redux-saga/effects';
import { notification } from 'antd';
import { types, actionCreator } from './dataTable.meta';
import { authenticate, parseError } from 'store/utils';
import { navigate } from '@reach/router';

import { buildRequest } from 'api';

export const apiRequest = buildRequest('/');

const convertObjectToFormData = obj => {
  const formData = new FormData();
  Object.keys(obj).forEach(key => formData.append(key, obj[key] || ''));
  return formData;
};

const apiCallWrapper = handler =>
  function*(action) {
    yield put(actionCreator.setLoading(true));

    const user = yield call(authenticate);
    try {
      yield call(handler, action, user);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
        return;
      }

      if (error.response && error.response.status === 403) {
        notification.error({
          message:
            "You don't have permission to perform this action, please try login again or contact administrator for more information",
        });
        return;
      }

      if (error.response && error.response.status === 500) {
        if (error.response.data.message) {
          notification.error({
            message: error.response.data
              ? error.response.data.message
              : 'Request Error',
          });
        } else {
          const [message, second] = error.response.data.split('\n');
          const str = `${message} ${second}`;
          const parsed = parseError(str);
          notification.error({
            message: parsed,
          });
        }
        return;
      }

      notification.error({ message: 'Request error' });
    }

    yield put(actionCreator.setLoading(false));
  };

function* getList(action, user) {
  yield put(actionCreator.getListSuccess({ count: 0, results: [] }));
  const page = yield select(store => store.dataTable.page) || 1;

  const { limit = 10, search = '' } = action.payload;
  const params = {
    limit,
    page,
    records_per_page: 10,
    search,
  };
  const { body } = yield call(apiRequest.request, {
    url: action.payload.url,
    params,
    headers: {
      Authorization: `Bearer ${user.token.access}`,
    },
  });

  const { count, results } = body.data;
  yield put(
    actionCreator.getListSuccess({
      data: results,
      count,
    })
  );
}

function* formSave({ payload }) {
  const user = yield call(authenticate);
  const formData = convertObjectToFormData(payload.data);
  yield call(apiRequest.request, {
    url: payload.url,
    data: formData,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token.access}`,
      // 'Content-Type': 'multipart/form-data',
    },
  });

  if (payload.afterSave) {
    yield call(payload.afterSave);
  }
}

function* updateItem({ payload }, user) {
  const data = { ...payload.data };
  delete data.id;
  const formData = convertObjectToFormData(data);
  yield call(apiRequest.request, {
    url: payload.alternativeURL || `${payload.url}${payload.data.id}`,
    data: formData,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${user.token.access}`,
    },
  });

  if (payload.afterSave) {
    yield call(payload.afterSave);
  }
}

function* deleteItem({ payload }, user) {
  yield call(apiRequest.request, {
    url: payload.url,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token.access}`,
    },
  });
  const page = yield select(store => store.dataTable.page);
  const items = yield select(store => store.dataTable.data);
  if (items.length / 10 <= page && page !== 1) {
    yield put(actionCreator.setPage(page - 1));
  }
  if (payload.afterDelete) {
    yield call(payload.afterDelete);
  }
  notification.success({ message: 'Remove item success' });
}

export default function* dataTableSaga() {
  yield takeLatest(types.GET_LIST, apiCallWrapper(getList));
  yield takeLatest(types.FORM_SAVE, apiCallWrapper(formSave));
  yield takeLatest(types.UPDATE_ITEM, apiCallWrapper(updateItem));
  yield takeLatest(types.DELETE_ITEM, apiCallWrapper(deleteItem));
}
