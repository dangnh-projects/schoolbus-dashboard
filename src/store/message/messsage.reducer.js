import { handleActions } from 'redux-actions';
import { types } from './message.meta';

const initialState = {
  selectedStudents: [],
};

const setStudents = (state, action) => {
  // const students = action.payload;
  return { ...state, selectedStudents: [] };
};

const addStudent = (state, action) => {
  const found = state.selectedStudents.find(
    student => student.student.id === action.payload.student.id
  );

  if (found) {
    return state;
  }

  return {
    ...state,
    selectedStudents: [...state.selectedStudents, action.payload],
  };
};

const removeStudent = (state, action) => ({
  ...state,
  selectedStudents: [
    ...state.selectedStudents.filter(
      student => student.student.id !== action.payload.student.id
    ),
  ],
});

export default handleActions(
  {
    [types.SET_STUDENTS]: setStudents,
    [types.ADD_STUDENT]: addStudent,
    [types.REMOVE_STUDENT]: removeStudent,
  },
  initialState
);
