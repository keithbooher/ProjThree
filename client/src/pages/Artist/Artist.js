import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";
import {Row, Col} from "../../components/Grid"
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import SideBar from "../../components/Sidebar/Sidebar";
// import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
// import Payments from '../../components/Navs/Payments';
import Card from '../../components/Card';
import Star from '../../components/Star/Star';


import "./Artist.css"

class Artist extends Component {
    state = {
        amount: 0,
        productIDs: [],
        products: [],
        pageArtist: {},
        user: {},
        currentUser: {}
    }
    
    componentDidMount() {
        this.props.fetchUser();
        this.loadCurrentUser();
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
                // console.log('userID', users[i])
                // console.log('targetedID', targetedID)
                if(users[i]._id === targetedID) {
                    this.setState({ user: users[i] })
                    this.loadProductIds();
                    console.log('success')
                }
            }
        })                      
        .catch(err => console.log(err));
    }

    loadCurrentUser = () => {
        fetch("/api/current_user")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    currentUser: result
                });
        console.log("current user: ", this.state.currentUser)            

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

     star = (id) => {

        console.log("id", id)
        const starInQuestion = document.getElementById(`star${id}`);
        if(starInQuestion.classList.contains('checked')) {
            starInQuestion.classList.remove('checked');
        } else {
            starInQuestion.classList.add('checked');
        }
    }

    render() {
        return (
            <div>
                {this.state.user.admin ? <AdminHeader amount={this.state.amount}/> : <Header key="1" amount={this.state.amount}/>}
                <Row>
                    <Col size="sm-2 offset-'sm-11">
                        <SideBar user={this.state.user}/>
                    </Col>
                        <Col size="sm-3" offset="sm-1" Class="productCard">
                            <Star 
                                idOne={1}
                                idTwo={2}
                                idThree={3}
                                idFour={4}
                                idFive={5}
                                star={this.star} 
                            />
                        </Col>
                    </Row> 

                    <Row>
                        <Col size="sm-3" offset="sm-1" Class="productCard">
                            {console.log("MAP STATE" ,this.state.products)}
                            {this.state.products.map((product, i) => {
                                console.log("PRODUCT", i, product.data)
                                return (
                                <Card
                                    key={i}
                                    image={product.data.img}
                                    price={product.data.price}
                                    description={product.data.description}
                                    productName={product.data.productName}
                                    artistEmail={product.data.email}
                                    currentUserEmail={this.state.currentUser.email}
                                    currentUserName={this.state.currentUser.firstName}
                                    targetStripe={product.data.stripeAccount}
                                    platformFee={product.data.platformFee}
                                    productID={product.data._id}
                                />
                                )}
                                )}
                        </Col>
                    </Row> 
                </div>
        );
    };
};


export default connect(null, actions) (Artist);