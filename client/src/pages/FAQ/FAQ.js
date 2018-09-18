import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import SideBar from "../../components/Sidebar/Sidebar";
import ContactForm from "../../components/ContactForm/ContactForm";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import API from "../../utils/API";
import "./FAQ.css";

class FAQ extends Component {
    state = {
        user: {}
    };
    componentDidMount() {
        this.props.fetchUser();
        this.loadCurrentUser();
        // this.loadThispageArtist();
    }

    loadCurrentUser = () => {
        fetch("/api/current_user")
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        user: result,
                        user: result
                    });
                    console.log("current user: ", this.state.currentUser);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    };


    render() {
        return (
            <div className="FAQGrid">
                {this.state.user.admin ? (
                    <AdminHeader amount={this.state.amount} />
                ) : (
                        <Header key="1" amount={this.state.amount} />
                    )}

                <div className="FAQ">
                    <h2>Does are there any fees?</h2>
                    <p>Art Gutter Takes a competitive 5% of sale price</p>
                    <br />
                    <h2>How can I change my user name?</h2>
                    <p>ArtGutter uses your Gmail first Name. You can either change your settings in your gmail, or make a Gmail specific to your artist brand.</p>
                    <br/>
                    <h2>GUIDE TO BECOME ADMIN</h2>
                    <h4>Here at ArtGutter artists are able to sell art after becoming an admin</h4>
                    <p>Art Gutter uses world trusted 3rd party payment prcessor, Stripe</p>                    
                    <ul>
                        <li>Sign in</li>
                        <li>Go to "Become Admin" located in the sidebar</li>
                        <li>Click the blue stripe word to go to stripe.com</li>
                        <li>Make a stripe account</li>
                        <li>Verify and activate you account by filling out your banking information</li>
                        <li>Once stripe account is made return back to the "Become Admin" page and hit the"connect with stripe" button</li>
                        <li>If prompted sign in with Stripe</li>
                        <li>You should be promptly returned to the ArtGutter hoome page. You may need to refresh in order to see new admin options</li>
                        <li>You are now ready to post your art!</li>
                    </ul>
                    <br />
                </div>
                <SideBar user={this.state.user} />

            </div>
        );
    }
}

export default connect(
    null,
    actions
)(FAQ);
