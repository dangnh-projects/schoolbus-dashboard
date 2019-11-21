import { combineReducers } from 'redux';
import user from './user/user.reducer';
import dataTable from './dataTable/dataTable.reducer';
import busRoute from './busRoute/busRoute.reducer';
import student from './student/student.reducer';

export default combineReducers({ user, dataTable, busRoute, student });
