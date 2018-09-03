import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";
import {Row, Col} from "../../components/Grid"
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import SideBar from "../../components/Sidebar/Sidebar";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Payments from '../../components/Navs/Payments';

import "./Artist.css"

class Artist extends Component {
    state = {
        amount: 0,
        productIDs: [],
        products: [],
        user: {},
    }

    componentDidMount() {
        this.props.fetchUser();
        this.loadCurrentUser();    
         
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
        const productObjectsArray = [];
        for (let i = 0; i < productIDs.length; i++) {
            API.getProduct(productIDs[i])
            .then(result => productObjectsArray.push(result.data))
            .catch(err => console.log(err));
        }
        console.log('productObjectsArray', productObjectsArray)
        this.setState({ products: productObjectsArray })
        this.consolelog()
    }

    consolelog = () => {
        console.log('productIDs', this.state.productIDs)
        console.log('products', this.state.products)        
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

                console.log('result', result)
                let currentUser=this.state.user
                API.createUser(currentUser)
                .then( console.log("success"))
                .catch(err => console.log(err));

                console.log("state", this.state.user)    
                this.loadProductIds();
                        
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
                {this.state.user.admin ? <AdminHeader amount={this.state.amount}/> : <Header key="1" amount={this.state.amount}/>}
                <Row>
                    <Col size="sm-2 offset-'sm-11">
                        <SideBar user={this.state.user}/>
                    </Col>
                </Row> 
                <div className="container productContent">
                    <Row>
                        <Col size="sm-3" offset="sm-1" Class="productCard">
                            {/* {this.state.products.map((product, i) => (
                                <Card key={i}>
                                    <CardImg top width="100%" src={`${product.img}`} alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>{product.productName}</CardTitle>
                                        <CardSubtitle>{product.price}</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Payments price={product.price} targetStripe={product.stripeAccount} platformFee={product.platformFee}/>
                                    </CardBody>
                                </Card>
                            ))} */}

                            <Card>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>stuff</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                    <Payments price={10000}/>
                                </CardBody>
                            </Card>
 

                        </Col>
                    </Row> 

                </div>
            </div>
        );
    };
};


export default connect(null, actions) (Artist);