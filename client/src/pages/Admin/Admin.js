import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";

import Header from '../../components/Navs/Header';
// import Landing from '../../components/Landing';
// import Gallery from '../../components/Gallery';
const Dashboard = () => <h2>Dashboard</h2>

class Admin extends Component {
    state = {
        amount: 0,
        products: [],
        user: {}
    }

    loadCurrentUser = () => {
        fetch("/api/current_user")
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result', result)
            this.setState({
                isLoaded: true,
                user: result
            });

        console.log("state", this.state.user)            

            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        )
    };

    componentDidMount() {
        this.props.fetchUser();
        this.loadCurrentUser();     
        // console.log("user", this.state.user)   

    }


    changeUserStatus = () => {
        const currentUser = this.state.user._id

        API.changeUser(currentUser)
            .then( console.log("success"))
            .catch(err => console.log(err));
    }


    render() {
        return (
            <div className="container">
                <Header />
                <button onClick={() => this.changeUserStatus()}>Become an Admin</button>
            </div>
        );
    };
};


export default connect(null, actions) (Admin);