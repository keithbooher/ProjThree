import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";
import {Row, Col} from "../../components/Grid"
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import SideBar from "../../components/Sidebar/Sidebar";

import "./Post.css";


class Post extends Component {
    state = {
        amount: 0,
        user: {},
        title: "",
        price: "",
        img: ""
    }

    componentDidMount() {
        // this.loadProducts();
        this.props.fetchUser();
        this.loadCurrentUser();     
    }

    //  Function to handle form input
    handleInputChange = event => {
    let { name, value } = event.target;
    console.log(value)
    this.setState({[name] : value})
    };

    //  Function to handle form submit
    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state)
        let { title, price, img } = this.state;
        let query = { title, price, img }
        console.log(query);

        const newProduct = {
            title: this.state.title,
            price: this.state.price,
            img: this.state.img,
            stripeAccount: this.state.user.stripeAccount,
            associatedID: this.state.user._id,
            platformFee: (this.state.price * .1)
        }

        API.saveProduct(this.state.user._id, newProduct)
        .then( console.log("success"))
        .catch(err => console.log(err));

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
                <div className="container productForm">
                    <div size="sm-10 offset-'sm-1">
                        <form>
                            <div className="form-group">
                                <label className="title" htmlFor="title">Title of work: </label>
                                <input value={this.state.title} onChange={this.handleInputChange} type="text" className="form-control titleInput" id="title" name="title"  placeholder="Please enter a Title for your work"/>
                            </div>
                            <div className="form-group">
                                <label className="price" htmlFor="price">Price: </label>
                                <input value={this.state.price} onChange={this.handleInputChange} type="integer" className="form-control priceInput" id="price" name="price" placeholder="Please set a price for your work"/>
                            </div>
                            <div className="form-group">
                                <label className="imageFile" htmlFor="img">Image File</label>
                                <input value={this.state.img} onChange={this.handleInputChange} type="file" className="form-control-file imageFileInput" id="img" name="img"/>
                            </div>
                            <button type="submit" className="btn btn-primary form-group" onClick={this.handleFormSubmit}>Submit</button>
                        </form>
                    </div> 
                </div>
            </div>
        );
    };
};


export default connect(null, actions) (Post);