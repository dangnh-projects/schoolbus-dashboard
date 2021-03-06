import {
  takeLatest,
  select,
  put,
  call,
  all,
  takeEvery,
} from 'redux-saga/effects';
import { types, actionCreator } from './student.meta';
import { convertObjectToFormData } from '../utils';
import { notification } from 'antd';
import { navigate } from '@reach/router';
import { buildRequest } from 'api';

export const postRouteRequest = buildRequest('/core/api/bus-route');
export const postRouteLocationRequest = buildRequest('/core/api/bus-location');
export const getRouteLocationRequest = buildRequest('/core/api/bus-route');
export const postStudentRequest = buildRequest('/core/api/student');
export const postParentRequest = buildRequest('/core/api/parent');
export const postContactRequest = buildRequest('/core/api/contacts');
export const searchParentRequest = buildRequest(
  '/core/api/parent/by-id-number'
);
export const getContactRequest = buildRequest('/core/api/student');
export const deleteContactRequest = buildRequest('/core/api/contacts');
export const putContactRequest = buildRequest('/core/api/contacts');

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
        notification.error({
          message: `
            ${message}
            ${second}
          `,
        });
      }
      return;
    }

    notification.error({ message: 'Request error' });
  }
  yield put(actionCreator.setLoading(false));
}

function* postContact({ payload }) {
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }

  try {
    const formData = convertObjectToFormData(payload.data);
    const { body } = yield call(postContactRequest.request, {
      data: formData,
      method: 'POST',
      headers: { Authorization: `Bearer ${user.token.access}` },
    });
    if (payload.afterSave) {
      yield call(payload.afterSave);
    }
    yield put(actionCreator.postContactSuccess(body.data));
    notification.success({
      message: 'Create contact information successfully',
    });
  } catch (error) {
    notification.error({ message: 'Request error!' });
  }
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
        put(actionCreator.setShowParentForm(false)),
      ]);
    }
    // yield put(actionCreator.changeStage(1));
    notification.success({
      message: 'Search parent successfully',
    });
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

    if (error.response && error.response.status === 404) {
      notification.error({ message: 'Parent not found' });
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
        notification.error({
          message: `
            ${message}
            ${second}
          `,
        });
      }
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
    if (payload.afterSuccess) {
      yield call(payload.afterSuccess);
    }
    // yield put(actionCreator.changeStage(2));
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
        notification.error({
          message: `
            ${message}
            ${second}
          `,
        });
      }
      return;
    }
    notification.error({ message: 'Request error' });
  }
  yield put(actionCreator.setLoading(false));
}

function* saveStudentBusLocation(data, user) {
  const formData = convertObjectToFormData(data);
  yield call(postStudentRequest.request, {
    url: '/bus-route',
    method: 'POST',
    data: formData,
    headers: {
      Authorization: `Bearer ${user.token.access}`,
    },
  });
}

function* addToLocation({ payload = [] }) {
  yield put(actionCreator.setLoading(true));

  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }

  try {
    // const formData = convertObjectToFormData(payload);
    for (let i = 0; i < payload.length; i++) {
      yield call(saveStudentBusLocation, payload[i], user);
    }
    // yield call(postStudentRequest.request, {
    //   url: '/bus-route',
    //   method: 'POST',
    //   data: formData,
    //   headers: {
    //     Authorization: `Bearer ${user.token.access}`,
    //   },
    // });

    notification.success({ message: 'Student saved successfully' });
    yield put(actionCreator.changeStage(0));
    yield call(navigate, '/dashboard/student');
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
        notification.error({
          message: `
            ${message}
            ${second}
          `,
        });
      }
      return;
    }
    notification.error({ message: 'Request error' });
  }
  yield put(actionCreator.setLoading(false));
}

function* postParent({ payload }) {
  const { student, data } = payload;
  yield put(actionCreator.setLoading(true));
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const formData = convertObjectToFormData(data);
    const { body } = yield call(postParentRequest.request, {
      data: formData,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token.access}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (body && body.data) {
      yield put(
        actionCreator.updateStudent({
          data: {
            id: student.id,
            parent_id: body.data.info,
          },
          afterSuccess: function*() {
            yield put(actionCreator.changeStage(2));
          },
        })
      );
    }

    notification.success({
      message: 'Save parent information successfully',
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

    if (error.response && error.response.status === 500) {
      if (error.response.data.message) {
        notification.error({
          message: error.response.data
            ? error.response.data.message
            : 'Request Error',
        });
      } else {
        const [message, second] = error.response.data.split('\n');
        notification.error({
          message: `
            ${message}
            ${second}
          `,
        });
      }
      return;
    }
    notification.error({ message: 'Request error' });
  }
  yield put(actionCreator.setLoading(false));
}

function* getContact({ payload }) {
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const { body } = yield call(getContactRequest.request, {
      url: `/${payload.id}/contacts`,
      method: 'GET',
      headers: { Authorization: `Bearer ${user.token.access}` },
    });

    yield put(actionCreator.getContactSuccess({ data: body.data }));
  } catch (error) {
    notification.error({ message: 'Request error!' });
  }
}

function* removeContact({ payload }) {
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const { body } = yield call(deleteContactRequest.request, {
      url: `/${payload.id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token.access}` },
    });
    if (payload.afterDelete) {
      yield call(payload.afterDelete);
    }
    yield put(actionCreator.removeContactSuccess({ data: body.data }));
    notification.success({ message: 'Contact removed successfully!' });
  } catch (error) {
    notification.error({ message: 'Request error!' });
  }
}

function* putContact({ payload }) {
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    return;
  }
  try {
    const formData = convertObjectToFormData(payload.data);
    const { body } = yield call(putContactRequest.request, {
      url: `/${payload.id}`,
      data: formData,
      method: 'PUT',
      headers: { Authorization: `Bearer ${user.token.access}` },
    });
    if (payload.afterUpdate) {
      yield call(payload.afterUpdate);
    }
    yield put(actionCreator.putContactSuccess(body));
    notification.success({ message: 'Contact updated successfully!' });
  } catch (error) {
    notification.error({ message: 'Request error!' });
  }
}

export default function* busRouteSaga() {
  yield takeLatest(types.POST_STUDENT, postStudent);
  yield takeLatest(types.POST_PARENT, postParent);
  yield takeLatest(types.SEARCH_PARENT, searchParent);
  yield takeLatest(types.UPDATE_STUDENT, updateStudent);
  yield takeLatest(types.GET_CONTACT, getContact);
  yield takeLatest(types.POST_CONTACT, postContact);
  yield takeLatest(types.REMOVE_CONTACT, removeContact);
  yield takeLatest(types.PUT_CONTACT, putContact);
  yield takeEvery(types.ADD_STUDENT_TO_BUS_LOCATION, addToLocation);
}
