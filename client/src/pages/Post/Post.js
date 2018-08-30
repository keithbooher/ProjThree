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
                <div size="sm-10 offset-'sm-1">
                    <form>
                        {}
                        <div className="form-group">
                        <label htmlFor="title">Title of work: </label>
                            <input value={this.state.title} onChange={this.handleInputChange} type="text" className="form-control" id="title" name="title"  placeholder="Please enter a Title for your work"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input value={this.state.price} onChange={this.handleInputChange} type="integer" className="form-control" id="price" name="price" placeholder="Please set a price for your work"/>
                        </div>
                        <div className="form-group">
                        <label htmlFor="img">Example file input</label>
                            <input value={this.state.img} onChange={this.handleInputChange} type="file" className="form-control-file" id="img" name="img"/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
                    </form>
                </div> 
            </div>
        );
    };
};


export default connect(null, actions) (Post);