import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import SideBar from "../../components/Sidebar/Sidebar";
import ContactForm from "../../components/ContactForm/ContactForm";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import API from "../../utils/API";
import Footer from "../../components/Footer/Footer";
import "./PostPurchase.css";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

class PostPurchase extends Component {
    state = {
        user: {},
        sidebarOpen: true,
        toggleID: " ",
        moveToggler: " ",
        top: "toggle",
        sidebarMobile: "sideBarMobile",
    };
    componentDidMount() {
        this.props.fetchUser();
        this.loadCurrentUser();
        this.checkTop();
    }

    componentWillMount() {
        this.checkToggle();
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
            <div className="PostPurchaseGrid">

                <Header key="1" amount={this.state.amount} />
                <div className="postPurchase">
                    <br />
                    <h1>Thank you for using Art Gutter!</h1>
                    <br />
                    <br />
                    <h1>A Confirmation Email is on its way!</h1>
                </div>
                <SideBar user={this.state.user} />
                <div className="sidebarContainer" id={this.state.toggleID}>
                    <div onClick={this.toggle} id={this.state.moveToggler} className={this.state.top}>☰</div>
                    <SideBarMobile user={this.state.user} id={this.state.toggleID} sidebarMobile={this.state.sidebarMobile} />
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
)(PostPurchase);
