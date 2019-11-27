import { select, call } from 'redux-saga/effects';
import { navigate } from '@reach/router';

export function* authenticate() {
  const user = yield select(store => store.user);
  if (!user || !user.token || !user.token.access) {
    yield call(navigate, '/login');
    throw new Error('');
  }

  return user;
}

export const convertObjectToFormData = obj => {
  const formData = new FormData();
  Object.keys(obj).forEach(key => formData.append(key, obj[key] || ''));
  return formData;
};
