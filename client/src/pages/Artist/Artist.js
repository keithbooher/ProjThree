import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";
import {Row, Col} from "../../components/Grid"
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import SideBar from "../../components/Sidebar/Sidebar";
// import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Payments from '../../components/Navs/Payments';
import Card from '../../components/Card';

import "./Artist.css"
let i = 0;

class Artist extends Component {
    state = {
        amount: 0,
        productIDs: null,
        products: null,
        pageArtist: {},
        user: {},
    }
    
    componentDidMount() {
        this.props.fetchUser();
        this.loadThispageArtist();
    }

    loadProductIds = () => {
        const userProducts = this.state.user.product
        const userProductsArray = [];
        for (let i = 0; i < userProducts.length; i++) {
            userProductsArray.push(userProducts[i])
        }
        console.log('userProductsArray', userProductsArray)
        this.setState({ productIDs: userProductsArray })
        this.loadUsersProducts()
    }

    loadUsersProducts = () => {
        const productIDs = this.state.productIDs
        // const productObjectsArray = [];
        for (let i = 0; i < productIDs.length; i++) {
            API.getProduct(productIDs[i])
            .then(result => { this.setState({ products: this.state.products.concat(result)})})
            .catch(err => console.log(err));
        }
    }

    consolelog = () => {
        console.log('productIDs', this.state.productIDs)
        console.log('products', this.state.products) 
        console.log('MAP', this.state.products.length)
                 
    }

    loadThispageArtist = () => {
        const url = window.location.href
        console.log('url', url)
        const splitURL = url.split('/')
        console.log(splitURL[4])
        const targetedID = splitURL[4]

        let users;
        
        API.getUser()
        .then(res => { 
            users = res.data 
            console.log('users', users)
            for (let i = 0; i < users.length; i++) {
                if(users[i]._id == targetedID) {
                    this.setState({ user: users[i] })
                    this.loadProductIds();
                    console.log('success')
                }
            }

        })                      
        .catch(err => console.log(err));
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
                <div className="container productContent">
                    <Row>
                        <Col size="sm-3" offset="sm-1" Class="productCard">
                        {this.state.products ? 
                            this.state.products.map((product, i) => (
                                    <Card key={i}>
                                        <CardImg top width="100%" src={product.img} alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>{product.productName}</CardTitle>
                                            <CardSubtitle>{product.price}</CardSubtitle>
                                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                            <Payments price={product.price} targetStripe={product.stripeAccount} platformFee={product.platformFee}/>
                                        </CardBody>
                                    </Card>
                            )) : " "} 


                        </Col>
                    </Row> 

                </div>
            </div>
        );
    };
};


export default connect(null, actions) (Artist);