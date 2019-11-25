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
  UPDATE_ROUTE_SUCCESS: 'UPDATE_ROUTE_SUCCESS',

  SET_LOADING: 'SET_LOADING',
};

export const actionCreator = {
  postRoute: createAction(TYPES.POST_ROUTE),
  postRouteSuccess: createAction(TYPES.POST_ROUTE_SUCCESS),

  postRouteLocation: createAction(TYPES.POST_ROUTE_LOCATION),
  postRouteLocationSuccess: createAction(TYPES.POST_ROUTE_LOCATION_SUCCESS),

  getRouteLocations: createAction(TYPES.GET_ROUTE_LOCATION),
  getRouteLocationSuccess: createAction(TYPES.GET_ROUTE_LOCATION_SUCCESS),

  updateRoute: createAction(TYPES.UPDATE_ROUTE),

  removeRouteLocation: createAction(TYPES.REMOVE_ROUTE_LOCATION),

  setLoading: createAction(TYPES.SET_LOADING),
};
