import { handleActions } from 'redux-actions';
import { types } from './message.meta';

const initialState = {
  selectedStudents: [],
};

const addStudent = (state, action) => {
  const students = action.payload;
};

export default handleActions(
  {
    [types.ADD_STUDENTS]: addStudent,
  },
  initialState
);
