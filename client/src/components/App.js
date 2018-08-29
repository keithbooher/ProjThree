import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import API from "../utils/API";

import Header from './Navs/Header';
import Admin from '../pages/Admin'
import Home from '../pages/Home'
import Gallery from './Gallery/Gallery';
import Modal from './submitModal';
import Form from '../pages/Form';

const App = () => (
    <div className="container">
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/surveys" component={Home} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/submit" component={Form} />
                
                {/* <Route exact path="/gallery"  render={(routeProps) => (<Gallery clicked={this.clicked} />)} /> */}

            </div>

           
        </BrowserRouter>
        {/* <Modal /> */}
    </div>
)

export default App;