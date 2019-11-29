import { handleActions } from 'redux-actions';
import { TYPES } from './busRoute.meta';

const initialState = {
  route: null,
  locations: [],
  currentLocation: null,
  modalVisible: false,
  students: [],
  routes: [],
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

const setCurrentLocation = (state, action) => ({
  ...state,
  currentLocation: action.payload,
  modalVisible: true,
});

const toggleModal = (state, action) => ({
  ...state,
  modalVisible:
    action.payload && !!action.payload.force
      ? !!action.payload.val
      : !state.modalVisible,
});

const setStudent = (state, action) => ({
  ...state,
  students: action.payload,
});

const getRoutesSuccess = (state, action) => ({
  ...state,
  routes: action.payload,
});

export default handleActions(
  {
    [TYPES.POST_ROUTE_SUCCESS]: postRouteSuccess,
    [TYPES.POST_ROUTE_LOCATION_SUCCESS]: postRouteLocationSuccess,
    [TYPES.GET_ROUTE_LOCATION_SUCCESS]: getRouteLocationSuccess,
    [TYPES.SET_CURRENT_LOCATION]: setCurrentLocation,
    [TYPES.TOGGLE_MODAL]: toggleModal,
    [TYPES.SET_STUDENT]: setStudent,
    [TYPES.GET_ROUTES_SUCCESS]: getRoutesSuccess,
  },
  initialState
);
