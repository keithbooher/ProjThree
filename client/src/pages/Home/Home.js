import React, { Component } from 'react';
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
import HomeArt from "../../components/HomeArt/HomeArt";
import imagePlaceholder from "../../assets/images/placeholder.png"

class App extends Component {
    state = {
        amount: 0,
        products: [],
        user: {},
        imagePlaceholder
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

                // console.log('result', result)
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
                <Row>
                    <Col size="sm-2 offset-'sm-11">
                        <SideBar user={this.state.user}/>
                    </Col>
                </Row>

                <div className="container">
                    <div>
                        <Row>
                            <Col size="sm-10 offset-'sm-1">
                                <MissionStatement/>
                            </Col>
                        </Row>
                        <Row>
                            <Col size="sm-10 offset-'sm1">
                                <HomeArt imagePlaceholder={this.state.imagePlaceholder}/>
                            </Col>
                        </Row>
                    </div>                        
                </div>
            </div>
        );
    };
};


export default connect(null, actions) (App);