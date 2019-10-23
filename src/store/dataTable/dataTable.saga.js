import { takeLatest, call, put, select } from 'redux-saga/effects';
import { notification } from 'antd';
import { types, actionCreator } from './dataTable.meta';

import { buildRequest } from 'api';

export const apiRequest = buildRequest('/');

function* getList(action) {
  yield put(actionCreator.setLoading(true));
  yield put(actionCreator.getListSuccess({ count: 0, results: [] }));
  try {
    const page = yield select(store => store.dataTable.page) || 1;

    const { limit = 10 } = action.payload;
    const params = {
      limit,
      offset: (page - 1) * limit,
    };

    const { body } = yield call(apiRequest.request, {
      url: action.payload.url,
      params,
    });
    yield put(actionCreator.getListSuccess(body));
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

function* formSave({ payload }) {
  yield put(actionCreator.setLoading(true));
  try {
    yield call(apiRequest.request, {
      url: payload.url,
      data: payload.data,
      method: 'POST',
    });

    if (payload.afterSave) {
      yield call(payload.afterSave);
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

function* updateItem({ payload }) {
  yield put(actionCreator.setLoading(true));
  try {
    yield call(apiRequest.request, {
      url: payload.alternativeURL || `${payload.url}${payload.data.id}/`,
      data: payload.data,
      method: 'PUT',
    });

    if (payload.afterSave) {
      yield call(payload.afterSave);
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

function* deleteItem({ payload }) {
  yield put(actionCreator.setLoading(true));
  try {
    yield call(apiRequest.request, {
      url: payload.url,
      method: 'DELETE',
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

export default function* dataTableSaga() {
  yield takeLatest(types.GET_LIST, getList);
  yield takeLatest(types.FORM_SAVE, formSave);
  yield takeLatest(types.UPDATE_ITEM, updateItem);
  yield takeLatest(types.DELETE_ITEM, deleteItem);
}
