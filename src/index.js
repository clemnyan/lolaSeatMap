
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import React from 'react';
import App from './components/App';


import reducers from './reducers';

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,

));


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
  , document.getElementById('main'));
