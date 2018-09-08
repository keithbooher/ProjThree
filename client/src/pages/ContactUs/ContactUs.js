import React, { Component } from 'react';
import "./contactUs.css";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SideBar from "../../components/Sidebar/Sidebar";
import ContactForm from "../../components/ContactForm/ContactForm";
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import {Row, Col} from "../../components/Grid"

class ContactUs extends Component{
    state={
        currentUser:{},
        user: {}
    }
    componentDidMount() {
        this.props.fetchUser();
        this.loadCurrentUser();
        // this.loadThispageArtist();
    }

    loadCurrentUser = () => {
        fetch("/api/current_user")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    currentUser: result,
                    user: result
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
    

    render(){
    return(
        <div>
            {this.state.user.admin ? <AdminHeader amount={this.state.amount}/> : <Header key="1" amount={this.state.amount}/>}
            <div className="container">
                <div className="row">
                    <div className="col-md-2"/>
                    <h4 className="contactTitle">Contact Us</h4>
                </div>
                <div className="row">
                    <div className="col-md-2">
                    <SideBar user={this.state.user}/>
                    </div>
                    <div className="col-md-10">
                    <ContactForm/>
                    </div>
                </div>
            </div>
        </div>
            );
    };
}

export default connect(null, actions) (ContactUs);