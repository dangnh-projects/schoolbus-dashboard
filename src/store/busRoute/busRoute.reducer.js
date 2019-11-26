import { handleActions } from 'redux-actions';
import { TYPES } from './busRoute.meta';

const initialState = {
  route: null,
  locations: [],
  currentLocation: null,
  modalVisible: false,
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
  modalVisible: !!(!state.modalVisible || action.payload),
});

export default handleActions(
  {
    [TYPES.POST_ROUTE_SUCCESS]: postRouteSuccess,
    [TYPES.POST_ROUTE_LOCATION_SUCCESS]: postRouteLocationSuccess,
    [TYPES.GET_ROUTE_LOCATION_SUCCESS]: getRouteLocationSuccess,
    [TYPES.SET_CURRENT_LOCATION]: setCurrentLocation,
    [TYPES.TOGGLE_MODAL]: toggleModal,
  },
  initialState
);
