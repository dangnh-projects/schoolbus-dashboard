import { createAction } from 'redux-actions';

export const types = {
  GET_LIST: 'GET_LIST',
  GET_LIST_SUCCESS: 'GET_LIST_SUCCESS',

  FORM_SAVE: 'FORM_SAVE',
  FORM_SAVE_SUCCESS: 'FORM_SAVE_SUCCESS',

  UPDATE_ITEM: 'UPDATE_ITEM',

  DELETE_ITEM: 'DELETE_ITEM',
  DELETE_ITEM_SUCCESS: 'DELETE_ITEM_SUCCESS',

  SET_PAGE: 'SET_PAGE',
  SET_LOADING: 'SET_LOADING',
};

export const actionCreator = {
  getList: createAction(types.GET_LIST),
  getListSuccess: createAction(types.GET_LIST_SUCCESS),

  formSave: createAction(types.FORM_SAVE),
  formSaveSuccess: createAction(types.FORM_SAVE_SUCCESS),

  updateItem: createAction(types.UPDATE_ITEM),

  deleteItem: createAction(types.DELETE_ITEM),
  deleteItemSuccess: createAction(types.DELETE_ITEM_SUCCESS),

  setPage: createAction(types.SET_PAGE),
  setLoading: createAction(types.SET_LOADING),
};
