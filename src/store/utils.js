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

export const parseError = str => {
  str = str.toLowerCase().trim();
  if (str.indexOf('unique') > -1) {
    const field = str
      .split(' ')
      .pop()
      .split('.')
      .pop();
    return `${field} must be unique`;
  }

  if (str.indexOf('duplicate entry')) {
    let [value, key] = str
      .split('duplicate entry')
      .pop()
      .replace(/[()'"]/g, '')
      .split('for key');

    key = key.trim().split('');
    key[0] = key[0].toUpperCase();
    key = key.join('');

    return `${key} has duplicated value '${value.trim()}'`;
  }

  return str;
};
