import { combineReducers } from 'redux';
import user from './user/user.reducer';
import dataTable from './dataTable/dataTable.reducer';

export default combineReducers({ user, dataTable });
