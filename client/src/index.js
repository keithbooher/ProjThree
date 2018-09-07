import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import './index.css';
import App from './components/App';
import reducers from './reducers';
// import 'bootstrap/dist/css/bootstrap.css';

// Use the createStore helper to create a new instance of our redux Store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// The place in the highest html body where everything gets rendered in
ReactDom.render(
//a react componenet that can read changes from redux store anytime the redux store gets some new state produced in inside of it, and will update all compoonents to new state
<Provider store={store}><App /></Provider>,
document.querySelector('#root'));

// console.log('STRIPE KEY IS ', process.env.REACT_APP_STRIPE_KEY);
// console.log('Environment is ', process.env.NODE_ENV);