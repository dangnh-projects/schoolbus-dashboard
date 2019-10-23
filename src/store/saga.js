import { all, fork } from 'redux-saga/effects';
import user from './user/user.saga';
import dataTable from './dataTable/dataTable.saga';

export default function* mainSaga() {
  yield all([fork(user), fork(dataTable)]);
}
