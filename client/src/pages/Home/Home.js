import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";
import MissionStatement from "../../components/MissionStatement/missionStatement";
import {Row, Col} from "../../components/Grid"
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import SideBar from "../../components/Sidebar/Sidebar";
import HomeArt from "../../components/HomeArt/HomeArt";
import firstImage from "../../assets/images/art-1.jpeg";
import secondImage from "../../assets/images/art-2.jpg";
import thirdImage from "../../assets/images/art-3.jpg";
import Card from "../../components/Card/Card";


class App extends Component {
    state = {
        amount: 0,
        products: [],
        user: {},
        firstImage,
        secondImage,
        thirdImage
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
                                                                          
                    <Col size="sm-8 offset-'sm-1">
                        <MissionStatement/>
                        <HomeArt 
                            imagePlaceholder={this.state.imagePlaceholder}
                            firstImage={this.state.firstImage}
                            secondImage={this.state.secondImage}
                            thirdImage={this.state.thirdImage}
                                    />
                    </Col>
                </Row>

                              
                
            </div>
        );
    };
};


export default connect(null, actions) (App);