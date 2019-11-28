import { createAction } from 'redux-actions';

export const TYPES = {
  POST_ROUTE: 'POST_ROUTE',
  POST_ROUTE_SUCCESS: 'POST_ROUTE_SUCCESS',

  POST_ROUTE_LOCATION: 'POST_ROUTE_LOCATION',
  POST_ROUTE_LOCATION_SUCCESS: 'POST_ROUTE_LOCATION_SUCCESS',

  GET_ROUTE_LOCATION: 'GET_ROUTE_LOCATION',
  GET_ROUTE_LOCATION_SUCCESS: 'GET_ROUTE_LOCATION_SUCCESS',

  REMOVE_ROUTE_LOCATION: 'REMOVE_ROUTE_LOCATION',

  UPDATE_ROUTE: 'UPDATE_ROUTE',

  UPDATE_LOCATION: 'UPDATE_LOCATION',
  SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION',

  TOGGLE_MODAL: 'TOGGLE_MODAL',

  SET_LOADING: 'SET_LOADING',

  SET_STUDENT: 'SET_STUDENT',
};

export const actionCreator = {
  postRoute: createAction(TYPES.POST_ROUTE),
  postRouteSuccess: createAction(TYPES.POST_ROUTE_SUCCESS),

  postRouteLocation: createAction(TYPES.POST_ROUTE_LOCATION),
  postRouteLocationSuccess: createAction(TYPES.POST_ROUTE_LOCATION_SUCCESS),

  getRouteLocations: createAction(TYPES.GET_ROUTE_LOCATION),
  getRouteLocationSuccess: createAction(TYPES.GET_ROUTE_LOCATION_SUCCESS),

  updateRoute: createAction(TYPES.UPDATE_ROUTE),
  updateLocation: createAction(TYPES.UPDATE_LOCATION),
  setCurrentLocation: createAction(TYPES.SET_CURRENT_LOCATION),

  removeRouteLocation: createAction(TYPES.REMOVE_ROUTE_LOCATION),

  setLoading: createAction(TYPES.SET_LOADING),

  toggleModal: createAction(TYPES.TOGGLE_MODAL),

  setStudent: createAction(TYPES.SET_STUDENT),
};
