import { combineReducers } from 'redux';

import SeatsReducer from './SeatsReducer';

const rootReducer = combineReducers({
  seats: SeatsReducer,
});

export default rootReducer;
