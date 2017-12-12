import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSeats } from '../actions/index';


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


// main component, utility functions in Helpermethods to generate seat map
class indexMain extends Component {

  constructor(props) {
    super();
    this.state = {
      first: null,
      business: null,
      economy: null,
      isComplete: false,
      isClicked: false,
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.onRenderFirst = this.onRenderFirst.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.updateElement = this.updateElement.bind(this);
  }

  componentWillMount() {
    this.props.fetchSeats();
  }


  onUpdate() {
    if (this.state.isComplete === false) {
      this.setState({
        first: classFix(groupClasses(this.props.seats).first),
        business: classFix(groupClasses(this.props.seats).business),
        economy: classFix(groupClasses(this.props.seats).economy),
        isComplete: true,
      });
    }
  }


  onRenderFirst() {
    if (this.state.isComplete) {
      const temp = this.state.first;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].props.children !== 'AISLES') {  // to eliminate aisles
          const temp1 = temp[i].props.children;
          for (let j = 0; j < temp1.length; j++) {
            if (temp1[j].props.className === 'Unoccupied') {
              const m = (<div className="updatedDiv" onClick={() => this.getMessage(this)} >
                {this.state.first[i].props.children[j].props.children} </div>);
              this.state.first[i].props.children[j] = this.updateElement(m, i, j);
            }
          }
        }
      }
    }
  }


  getMessage() {
    if (confirm('DO YOU WANT TO SELECT THIS SEAT!') === true) {
      alert('SEAT SELECTION SUCCESSFUL');
      this.setState({ isClicked: true });
    } else {
      //
    }
  }

  updateElement(m, i, j) {
    if (this.state.isClicked === false) {
      return m;
    } else {
      m = (<div className="Occupied"> {this.state.first[i].props.children[j].props.children} </div>);
      return m;
    }
  }


  render() {
    if (this.props.seats.length > 0) {
      this.onUpdate();
      this.onRenderFirst();

      return (
        <div >
          <div className="Keys">
            KEY:
             <div className="key1" /> Occupied Seat
             <div className="key2" /> Unoccupied Seat
          </div>
          <div className="First" >{this.state.first} </div>
          <div className="business">{this.state.business} </div>
          <div className="Economy">{this.state.economy} </div>
        </div>
      );
    } else {
      return <div> Loading.......... </div>;
    }
  }
}

const mapStateToProps = state => (
  {
    seats: state.seats.all,
  }
);

// export default withRouter(connect(mapStateToProps, { fetchSeats })(indexMain));
export default withRouter(connect(mapStateToProps, { fetchSeats })(indexMain));
