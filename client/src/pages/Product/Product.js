import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";
import { Row, Col } from "../../components/Grid"
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import SideBar from "../../components/Sidebar/Sidebar";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import Footer from "../../components/Footer/Footer";
import "./Product.css";
import "./Mediaqueries.css";
import { Link } from "react-router-dom";
import Payments from "../../components/Payments/Payments";



class Product extends Component {
    state = {
        user: {},
        product: {},
        sidebarOpen: true,
        toggleID: " ",
        moveToggler: " ",
        user: {},
        top: "toggle",
        sidebarMobile: "sideBarMobile",
    }

    componentWillMount() {
        this.props.fetchUser();
        this.loadCurrentUser();
        this.loadProduct();
        this.checkToggle();
    }

    componentDidMount() {
        this.checkTop();
    }


    componentWillUnmount() {
        window.onscroll = null;
    }

    checkTop = () => {
        window.onscroll = function () {
            if (window.pageYOffset === 0) {
                this.setState({ top: "toggle", sidebarMobile: "sideBarMobile" })
            } else {
                this.setState({ top: "notTopToggle", sidebarMobile: "sideBarMobileNotTop" })
            }
        }.bind(this);

    }

    checkToggle = () => {
        if (this.state.sidebarOpen) {
            this.setState({ sidebarOpen: false, toggleID: "close", moveToggler: "moveTogglerClose" })
        } else {
            this.setState({ sidebarOpen: true, toggleID: " ", moveToggler: " " })
        }
    }

    toggle = () => {
        if (this.state.sidebarOpen) {
            this.setState({ sidebarOpen: false, toggleID: "close", moveToggler: "moveTogglerClose" })
        } else {
            this.setState({ sidebarOpen: true, toggleID: " ", moveToggler: " " })
        }
    }

    loadCurrentUser = () => {
        API.getCurrentUser()
            .then(result => {
                console.log(result.data),
                    this.setState({
                        user: result.data
                    })
                this.loadProduct();
            })
            .catch(err => console.log(err));
    };

    loadProduct = () => {
        const url = window.location.href;
        const splitURL = url.split("/");
        const targetedID = splitURL[4];
        console.log(targetedID)
        API.getProduct(targetedID)
            .then(res => {
                console.log(res)
                this.setState({ product: res.data })
            })
            .catch(err => console.log(err));
    };


    render() {
        return (
            <div className="productContentGrid">
                <Header key="1" />
                <SideBar user={this.state.user} />
                <div className="sidebarContainer" id={this.state.toggleID}>
                    <div onClick={this.toggle} id={this.state.moveToggler} className={this.state.top}>☰</div>
                    <SideBarMobile user={this.state.user} id={this.state.toggleID} sidebarMobile={this.state.sidebarMobile} />
                </div>
                {this.state.product ?
                    <div className="productInfo">
                        <div className="productGrid">
                            <Link to={`/artist/${this.state.product.associatedID}`} className="backLink"> Back To {this.state.product.artistName}'s Page </Link>
                            <img id="productImg" src={this.state.product.img} />
                            <div className="productDetails">
                                <h1>{this.state.product.productName}</h1>
                                <h4>${this.state.product.price}</h4>
                                <p className="desc">{this.state.product.description}</p>
                                <p>Quantity: {this.state.product.quantity}</p>
                                {console.log(this.state.product)}
                                {console.log(this.state.user)}
                                <div className="payments">
                                    <Payments
                                        price={this.state.product.price}
                                        targetStripe={this.state.product.stripeAccount}
                                        platformFee={this.state.product.platformFee}
                                        currentUserEmail={this.state.user.email}
                                        artistEmail={this.state.product.email}
                                        productName={this.state.product.productName}
                                        productID={this.state.product._id}
                                        image={this.state.product.image}
                                        firstName={this.state.user.firstName}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> : " "}

                < Footer />
            </div>
        );
    };
};


export default connect(null, actions)(Product);