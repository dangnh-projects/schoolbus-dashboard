import { takeLatest, call, put } from 'redux-saga/effects';
import { notification } from 'antd';
import { types, actionCreator } from './user.meta';
import { navigate } from '@reach/router';

import { buildRequest } from 'api';

const errMessage = {
  message: 'Opp! Bad request',
  description:
    'Something went wrong, please try again or contact admin for infomation!',
};

const loginRequest = buildRequest('/auth/api/login', {
  method: 'POST',
  'Content-Type': 'multipart/form-data',
});

const editProfileRequest = buildRequest('/user', {
  method: 'PUT',
});

const registerRequest = buildRequest('/user/register', {
  method: 'POST',
});

function* login(action) {
  try {
    var bodyFormData = new FormData();
    bodyFormData.set('username', action.payload.username);
    bodyFormData.set('password', action.payload.password);
    const { body } = yield call(
      loginRequest.request,
      {
        data: bodyFormData,
        method: 'POST',
      },
      false
    );
    const { user, token } = body.data;
    // localStorage.setItem('utk', token);
    yield put(actionCreator.loginSuccess({ user, token }));
    notification.success({
      message: 'Login success!',
      duration: 0.5,
    });
    setTimeout(() => {
      navigate('/dashboard/bus-track');
    }, 500);
  } catch (error) {
    if (
      error.response &&
      error.response.status === 404 &&
      error.response.data.message === 'login_fail'
    ) {
      return notification.error({
        message: 'Wrong email or password',
      });
    }
    notification.error(errMessage);
  }
}

function* editProfile(action) {
  try {
    const { body } = yield call(editProfileRequest.request, {
      data: action.payload,
    });
    const { user } = body;
    yield put(actionCreator.editProfileSuccess(user));
    notification.success({
      message: 'Edit profile success!',
    });
  } catch (error) {
    notification.error(errMessage);
  }
}

function* register(action) {
  try {
    const { body } = yield call(registerRequest.request, {
      data: action.payload,
    });
    const { user, token } = body;
    localStorage.setItem('utk', token);
    yield put(actionCreator.loginSuccess(user));
    notification.success({
      message: 'Register success!',
      duration: 1.5,
    });
    setTimeout(() => {
      navigate('/dashboard');
    }, 1800);
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return notification.error({
        message: 'Email Already Exist',
        description: 'Your email already exist, please try another email',
      });
    }
    notification.error(errMessage);
  }
}

export default function* userSaga() {
  yield takeLatest(types.EDIT_PROFILE, editProfile);
  yield takeLatest(types.LOGIN, login);
  yield takeLatest(types.REGISTER, register);
}
