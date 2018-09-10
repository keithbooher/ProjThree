import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";
import {Row, Col} from "../../components/Grid"
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import SideBar from "../../components/Sidebar/Sidebar";
import Card from '../../components/Card';

class Home extends Component {
    state = {
        amount: 0,
        products: [],
        currentUser: {}
    }

    componentDidMount() {
        // this.loadProducts();
        this.props.fetchUser();
        this.loadProducts();     
    }

    loadProducts = () => {
        API.getProducts()
        .then(res => this.setState({ products: res.data }))
        .then(res => console.log('res', this.state.products))        
        .catch(err => console.log(err))
        this.consolelog()
    };

    consolelog = () => {
        console.log(this.state.products)
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


    render() {
        return (
            <div>
                {this.state.currentUser.admin ? <AdminHeader /> : <Header key="1" />}
                <Row>
                    <Col size="sm-2 offset-'sm-11">
                        <SideBar user={this.state.user}/>
                    </Col>
                </Row> 
                <div className="container">

                    <Row>
                        <Col size="sm-3" offset="sm-1" Class="productCard">
                            {console.log("MAP STATE" ,this.state.products)}
                            {this.state.products.map((product, i) => {
                                console.log("PRODUCT", i, product.data)
                                return (
                                <Card
                                    key={i}
                                    image={product.img}
                                    price={product.price}
                                    productName={product.productName}
                                    artistEmail={product.email}
                                    artistName={product.artistName}
                                    artistID={product.associatedID}
                                    description={product.description}
                                    currentUserEmail={this.state.currentUser.email}
                                    targetStripe={product.stripeAccount}
                                    platformFee={product.platformFee}
                                    productID={product._id}
                                    sold={product.sold}
                                    quantity={product.quantity}
                                />
                                )}
                                )}

                        </Col>
                    </Row> 
                 
                </div>
            </div>
        );
    };
};


export default connect(null, actions) (Home);