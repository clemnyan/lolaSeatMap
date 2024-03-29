import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSeats } from '../actions/index';
import { groupClasses, classFix } from '../HelperMethods/utility';

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
      renderingFirst: false,

    };

    this.onUpdate = this.onUpdate.bind(this);
    this.onRenderFirst = this.onRenderFirst.bind(this);
    this.onRenderBusiness = this.onRenderBusiness.bind(this);
    this.onRenderEconomy = this.onRenderEconomy.bind(this);
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

// on rendering the first class
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
              this.state.first[i].props.children[j] = this.updateElement(m, i, j, 'first');
            }
          }
        }
      }
    }
  }

// on rendering the business class
  onRenderBusiness() {
    if (this.state.isComplete) {
      const temp = this.state.business;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].props.children !== 'AISLES') {  // to eliminate aisles
          const temp1 = temp[i].props.children;
          for (let j = 0; j < temp1.length; j++) {
            if (temp1[j].props.className === 'Unoccupied') {
              const m = (<div className="updatedDiv" onClick={() => this.getMessage(this)} >
                {this.state.business[i].props.children[j].props.children} </div>);
              this.state.business[i].props.children[j] = this.updateElement(m, i, j, 'business');
            }
          }
        }
      }
    }
  }

// on rendering the economy class
  onRenderEconomy() {
    if (this.state.isComplete) {
      const temp = this.state.economy;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].props.children !== 'AISLES') {  // to eliminate aisles
          const temp1 = temp[i].props.children;
          for (let j = 0; j < temp1.length; j++) {
            if (temp1[j].props.className === 'Unoccupied') {
              const m = (<div className="updatedDiv" onClick={() => this.getMessage(this)} >
                {this.state.economy[i].props.children[j].props.children} </div>);
              this.state.economy[i].props.children[j] = this.updateElement(m, i, j, 'economy');
            }
          }
        }
      }
    }
  }

// function called after onclick event
  getMessage() {
    if (confirm('DO YOU WANT TO SELECT THIS SEAT!') === true) {
      alert('SEAT SELECTION SUCCESSFUL');
      this.setState({ isClicked: true });
    } else {
      //
    }
  }

/* Function to update state once clicked so that color of the clicked seat changes to green as defined by the classname. However,
this apprach seem not to work. Tried other methods and havent worked but with more time i'm sure I can figure out the problem
*/
  updateElement(m, i, j, category) {
    if (this.state.isClicked === false) {
      return m;
    } else {
      m = (<div className="Occupied"> {this.state.category[i].props.children[j].props.children} </div>);
      return m;
    }
  }


  render() {
    if (this.props.seats.length > 0) {
      this.onUpdate();
      this.onRenderFirst();
      this.onRenderBusiness();
      this.onRenderEconomy();

      return (
        <div >
          <div className="Keys">
            <div className="key1" /> Unoccupied Seat
             <div className="key2" /> Occupied Seat
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
