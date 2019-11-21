import { handleActions } from 'redux-actions';
import { TYPES } from './busRoute.meta';

const initialState = {
  route: null,
  locations: [],
};

const postRouteSuccess = (state, action) => ({
  ...state,
  route: action.payload,
});

const postRouteLocationSuccess = (state, action) => ({
  ...state,
  locations: [...state.locations, action.payload],
});

const getRouteLocationSuccess = (state, action) => ({
  ...state,
  locations: action.payload,
});

export default handleActions(
  {
    [TYPES.POST_ROUTE_SUCCESS]: postRouteSuccess,
    [TYPES.POST_ROUTE_LOCATION_SUCCESS]: postRouteLocationSuccess,
    [TYPES.GET_ROUTE_LOCATION_SUCCESS]: getRouteLocationSuccess,
  },
  initialState
);
