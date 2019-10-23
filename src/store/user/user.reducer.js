import { handleActions } from 'redux-actions';
import { types } from './user.meta';

const processPermission = permissions =>
  permissions.reduce((permissionObj, permission) => {
    const [action, group] = permission.split('_');
    if (!permissionObj[group]) {
      permissionObj[group] = {};
    }

    permissionObj[group][action] = true;

    return permissionObj;
  }, {});

const login = (_, action) => ({
  ...action.payload,
  permissions: processPermission(action.payload.permissions),
});

const editProfileSuccess = (state, action) => ({
  ...state,
  user: action.payload,
});

export default handleActions(
  {
    [types.LOGIN_SUCCESS]: login,
    [types.EDIT_PROFILE_SUCCESS]: editProfileSuccess,
  },
  {}
);
