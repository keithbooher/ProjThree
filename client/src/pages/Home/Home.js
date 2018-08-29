import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";
import MissionStatement from "../../components/MissionStatement/missionStatement";
import {Row, Col} from "../../components/Grid"
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import SideBar from "../../components/Sidebar/Sidebar";
// import Landing from '../../components/Landing';
// import Gallery from '../../components/Gallery';
const Dashboard = () => <h2>Dashboard</h2>

class App extends Component {
    state = {
        amount: 0,
        products: [],
        user: {}
    }

    componentDidMount() {
        // this.loadProducts();
        this.props.fetchUser();
        this.loadCurrentUser();        

    }

    // loadProducts = () => {
    //     API.getProducts()
    //         .then(res => this.setState({ products: res.data }))
    //         .catch(err => console.log(err));
    // };


    loadCurrentUser = () => {
        fetch("/api/current_user")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    user: result
                });

                console.log('result', result)
                let currentUser=this.state.user
                API.createUser(currentUser)
                .then( console.log("success"))
                .catch(err => console.log(err));


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


    clicked = (name) => {
        console.log('test')
        console.log('name', name) // trying to return the name of the product name
        
        const updatedAmount = this.state.amount + 1
        this.setState({ amount:updatedAmount})
    }
 

    render() {
        return (
            <div>
                {this.state.user.admin ? <AdminHeader amount={this.state.amount}/> : <Header key="1" amount={this.state.amount}/>}

                <div className="container">
                    <BrowserRouter>
                    <div>
                            <SideBar/>
                            <Row>
                                <Col size="sm-10 offset-'sm-1">
                                    <MissionStatement/>
                                </Col>
                            </Row>
                </div>
                        
                    </BrowserRouter>
            </div>
            </div>
        );
    };
};


export default connect(null, actions) (App);