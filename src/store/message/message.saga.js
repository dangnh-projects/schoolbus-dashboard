import { takeLatest, call, put } from 'redux-saga/effects';
import { notification } from 'antd';
import { types, actionCreator } from './message.meta';
import { authenticate } from 'store/utils';

import { buildRequest } from 'api';

export const apiRequest = buildRequest('/');

const convertObjectToFormData = obj => {
  const formData = new FormData();
  Object.keys(obj).forEach(key => formData.append(key, obj[key] || ''));
  return formData;
};

const apiCallWrapper = handler =>
  function*(action) {
    const user = yield call(authenticate);
    try {
      yield call(handler, action, user);
    } catch (error) {
      console.log(error);
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
  };

function* sendMessage({ payload }, user) {
  const formData = convertObjectToFormData(payload);
  yield call(apiRequest.request, {
    url: 'core/api/parent/notify',
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

  yield put(actionCreator.sendMessageSuccess());
  yield put(actionCreator.setStudents([]));

  notification.success({ message: 'Sent successfully!!!' });
}

export default function* dataTableSaga() {
  yield takeLatest(types.SEND_MESSAGE, apiCallWrapper(sendMessage));
}
