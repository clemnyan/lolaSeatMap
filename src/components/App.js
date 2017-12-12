import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import indexMain from '../containers/index';


const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const enterApp = (props) => {
  return <div className="firstPage"> <div> <Link to="/seats"> CLICK HERE TO FIND SEATS </Link></div></div>;
};

const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={enterApp} />
          <Route exact path="/seats" component={indexMain} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>

  );
};


export default App;
