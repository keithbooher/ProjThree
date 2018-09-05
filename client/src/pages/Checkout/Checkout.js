import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";
import {Row, Col} from "../../components/Grid"
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import SideBar from "../../components/Sidebar/Sidebar";
import Payment from "../../components/Navs/Payments";


class Checkout extends Component {
    state = {
        product: [],
        user: {}
    }

    componentWillMount() {
        this.props.fetchUser();
        this.loadCurrentUser();     
    }

    componentDidMount() {
        this.props.fetchUser();
        // this.consolelog()   
    }

    loadThisProduct = () => {
        const url = window.location.href
        const splitURL = url.split('/')
        console.log(splitURL[4])
        const targetedID = splitURL[4]

        API.getProduct(targetedID)
        .then(result => console.log('result', result.data))        
        .then(result => {
            console.log("RESULT", result.data)
            this.setState({ product: this.state.product.concat(result.data)})
            console.log("STATE", this.state.product[0])
        })
        .catch(err => console.log(err));

    }


    consolelog = () => {
        console.log('test', this.state.product)

    }

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

                // console.log("state", this.state.user)  
                this.loadThisProduct();          
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



    render() {

        return (
            <div>
                {this.state.user.admin ? <AdminHeader /> : <Header key="1" />}
                <Row>
                    <Col size="sm-2 offset-'sm-11">
                        <SideBar user={this.state.user}/>
                    </Col>
                </Row> 
                <div className="container">
                 
                 <Payment 
                    // image={this.state.product.}
                 />
                </div>
            </div>
        );
    };
};


export default connect(null, actions) (Checkout);