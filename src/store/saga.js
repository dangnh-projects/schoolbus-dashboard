import { all, fork } from 'redux-saga/effects';
import user from './user/user.saga';
import dataTable from './dataTable/dataTable.saga';
import busRoute from './busRoute/busRoute.saga';
import student from './student/student.saga';

export default function* mainSaga() {
  yield all([fork(user), fork(dataTable), fork(busRoute), fork(student)]);
}
