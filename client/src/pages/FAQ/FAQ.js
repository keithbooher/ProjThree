import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import SideBar from "../../components/Sidebar/Sidebar";
import ContactForm from "../../components/ContactForm/ContactForm";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import API from "../../utils/API";
import Footer from "../../components/Footer/Footer";
import "./FAQ.css";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

class FAQ extends Component {
    state = {
        user: {},
        sidebarOpen: true,
        toggleID: " ",
        moveToggler: " ",
    };
    componentDidMount() {
        this.props.fetchUser();
        this.loadCurrentUser();
        // this.loadThispageArtist();
    }

    componentWillMount() {
        this.checkToggle();

    }

    checkToggle = () => {
        this.setState({ sidebarOpen: false, toggleID: "close", moveToggler: "moveTogglerClose" })

    }

    toggle = () => {
        if (this.state.sidebarOpen) {
            this.setState({ sidebarOpen: false, toggleID: "close", moveToggler: "moveTogglerClose" })
        } else {
            this.setState({ sidebarOpen: true, toggleID: " ", moveToggler: " " })
        }
    }

    loadCurrentUser = () => {
        this.setState({
            isLoaded: true,
            user: this.props.auth
        });
        console.log("current user: ", this.props.auth);
    };


    render() {
        return (
            <div className="FAQGrid">

                <Header key="1" amount={this.state.amount} />
                <div className="FAQ">
                    <h2>Are there any fees?</h2>
                    <p>Art Gutter Takes a competitive 5% of sale price</p>
                    <br />
                    <h2>How can I change my user name?</h2>
                    <p>ArtGutter uses your Gmail first Name. You can either change your settings in your gmail, or make a Gmail specific to your artist brand.</p>
                    <br />
                    <h2>How long until I recieve payment?</h2>
                    <p>Artists! payment upon purchase of your product may take up to 5 business days</p>
                    <br />
                    <h2>What is the shipping time?</h2>
                    <p>Shipping Time is up to the artist, so communication with the artist will be your best bet on ETA. Email is provided on user profile and purchase confirmation email.</p>
                    <br />
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
                <div className="sidebarContainer" id={this.state.toggleID}>
                    <div onClick={this.toggle} id={this.state.moveToggler} className="toggle">☰</div>
                    <SideBarMobile user={this.state.user} id={this.state.toggleID} />
                </div>
                < Footer />
            </div>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(
    mapStateToProps,
    actions
)(FAQ);
