import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';
import API from "../utils/API";

import Header from './Header';
import Landing from './Landing';
import Gallery from './Gallery';
const Dashboard = () => <h2>Dashboard</h2>

class App extends Component {
    state = {
        amount: 0,
        products: [],
        user: {}
    }

    componentDidMount() {
        this.loadProducts();
        this.props.fetchUser();
        this.currentUser();
    }

    loadProducts = () => {
        API.getProducts()
            .then(res => this.setState({ products: res.data }))
            .catch(err => console.log(err));
    };

    currentUser() {
        this.setState({ user: this.props.auth }) // not populating the user state correctly
        console.log('user',this.state.user)
    }


    clicked = (name) => {
        console.log('test')
        console.log('name', name) // trying to return the name of the product name
        
        const updatedAmount = this.state.amount + 1
        this.setState({ amount:updatedAmount})
    }
 

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header 
                            key="1"
                            amount={this.state.amount}
                        />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route exact path="/gallery"  render={(routeProps) => (<Gallery clicked={this.clicked} />)} />
                    </div>
                </BrowserRouter>
            </div>
        );
    };
};

export default connect(null, actions) (App);