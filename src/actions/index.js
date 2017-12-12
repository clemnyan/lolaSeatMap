import seats from '../data/seats.json';

export const ActionTypes = {
  FETCH_SEATS: 'FETCH_SEATS',
};

export function fetchSeats() {
  return {
    type: 'FETCH_SEATS',
    payload: seats,
  };
}
