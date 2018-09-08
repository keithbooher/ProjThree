import React, { Component } from 'react';
import "./contactUs.css";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SideBar from "../../components/Sidebar/Sidebar";
import ContactForm from "../../components/ContactForm/ContactForm";
import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';
import API from "../../utils/API";


class ContactUs extends Component{
    state={
        currentUser:{},
        user: {},
        name: "",
        email: "",
        subject: "",
        textBody: ""
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

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;

        if (name === "subject") {
            value = value.substring(0, 25);
          }
        // Updating the input's state
        this.setState({
          [name]: value
        });
      };
    
    submitContactForm = event =>{

        
        console.log("button Works");
        console.log(this.state.name);
        console.log(this.state.email);
        console.log(this.state.subject);
        console.log(this.state.textBody);

        let formData={
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            text: this.state.textBody
        }
        console.log(formData)

        API.contactUsForm(formData).then(
            console.log("It did it")
        )


        this.setState({
            name: "",
            email: "",
            textBody: "",
            subject: ""
        })

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
                    <ContactForm 
                        name={this.state.name}
                        email={this.state.email}
                        subject={this.state.subject}
                        textBody={this.state.textBody}
                        submit={this.submitContactForm}
                        onChange={this.handleInputChange}/>
                    </div>
                </div>
            </div>
        </div>
            );
    };
}

export default connect(null, actions) (ContactUs);