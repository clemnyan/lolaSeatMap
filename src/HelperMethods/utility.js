import React from 'react';

// This function groups elements in array into their respective classes
export const groupClasses = (arr) => {
  const first = [];
  const business = [];
  const economy = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].class === 'First') {
      first.push(arr[i]);
    } else if (arr[i].class === 'Business') {
      business.push(arr[i]);
    } else {
      economy.push(arr[i]);
    }
  }
  return {
    first,
    business,
    economy,
  };
};

/* This function finds missing characters to locate the AISLES on the map */
const findMissingChars = (arr) => {
  if (arr.length > 0) {
    arr.sort();
    const uniqueSeats = [];
    const firstChar = arr[0].charCodeAt();
    const lastChar = arr[arr.length - 1].charCodeAt();
    const diff = lastChar - firstChar;
    for (let i = 0; i <= diff; i++) {
      uniqueSeats.push(String.fromCharCode(firstChar + i));
    }
    arr = uniqueSeats;
  }
  return arr;
};


/* This functions finds all properties of the seats such as row, class, and the state of the
seats */
const splitArrContents = (arr) => {
  let uniqueSeats = [];   // unique identifier for seat character
  const classes = [];
  const seats = [];
  const rows = [];
  const occupiedArr = [];
  const premiumArr = [];
  const overwingArr = [];

  for (let i = 0; i < arr.length; i++) {
    classes.push(arr[i].class);
    seats.push(arr[i].seat);
    rows.push(arr[i].row);
    occupiedArr.push(arr[i].occupied);
    premiumArr.push(arr[i].premium);
    overwingArr.push(arr[i].overWing);
    const letter = arr[i].seat;
    if (uniqueSeats.includes(letter) === false) {  // if letter has not yet been accesses, add it to identifier array
      uniqueSeats.push(letter);
    }
  }

  uniqueSeats = findMissingChars(uniqueSeats);  // find the AISLES characters

  return {
    classes,
    uniqueSeats,
    seats,
    rows,
    occupiedArr,
    premiumArr,
    overwingArr,
  };
};

// Function iterates and returns divisions for the array of rows
const iterateRows = (seatLetters, seatNumbers, occupied) => {
  const temp = Object.assign([], seatNumbers);  // to avoid mutating original copy
  temp.sort((temp, b) => { return temp - b; });  // will be used to match other props(
  const store = [];
  store.push(<div className="headings"> {seatLetters[0]} </div>);

  for (let i = 0; i < temp.length; i++) {
    const index = seatNumbers.indexOf(temp[i]);
    if (occupied[index]) {
      store.push(<div className="Occupied"> {temp[i]} </div>);
    } else {
      store.push(<div className="Unoccupied" > {temp[i]} </div>);
    }
  }
  return store;
};


/* Function groups the seats using above helper methods. The groups are based on
row, column, and class properties of the seats */
export const classFix = (arr) => {
  const uniqueSeats = splitArrContents(arr).uniqueSeats;
  // all the seat properties
  const seats = splitArrContents(arr).seats;
  const rows = splitArrContents(arr).rows;
  const occupiedArr = splitArrContents(arr).occupiedArr;


  const map = [];
  for (let i = 0; i < uniqueSeats.length; i++) {
    const currSeat = uniqueSeats[i];
    const allseats = [];  // add seat properties
    const allrows = [];   // add row properties
    const allOccupied = []; // add property for occupied
    for (let j = 0; j < seats.length; j++) {
      if (seats[j] === currSeat) {
        allseats.push(seats[j]);
        allrows.push(rows[j]);
        allOccupied.push(occupiedArr[j]);
      }
    }

    let getRows = [];
    if (allseats.length > 0) {
      getRows = iterateRows(allseats, allrows, allOccupied);
      const m = (<div className="singlePosts">
        {getRows}
      </div>);
      map.push(m);
    } else {
      getRows = 'AISLES';
      const n = (<div className="aisle">
        {getRows}
      </div>);
      map.push(n);
    }
  }
  return map;
};
