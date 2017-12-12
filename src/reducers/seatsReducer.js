import { ActionTypes } from '../actions';

const SeatsReducer = (state = { all: [], seat: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SEATS:
      return { all: action.payload, seat: state.seat };
    default:
      return state;
  }
};

export default SeatsReducer;
