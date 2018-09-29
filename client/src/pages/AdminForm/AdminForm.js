import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import SideBar from "../../components/Sidebar/Sidebar";
import "./AdminForm.css";
import Footer from "../../components/Footer/Footer";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";


class Admin extends Component {
  state = {
    user: {},
    stripe: "",
    sidebarOpen: true,
    toggleID: " ",
    moveToggler: " ",
  };

  loadCurrentUser = () => {
    this.setState({
      isLoaded: true,
      user: this.props.auth
    });
    this.checkToggle();

  };

  componentDidMount() {
    console.log("COMPONENT MOUNTED");
    this.props.fetchUser();
    this.loadCurrentUser();
    console.log("user", this.state.user);
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

  changeUserStatus = () => {
    console.log("STATEEEEEEEEE", this.state.user);
    const currentUser = this.state.user._id;
    // const boolean = true
    API.changeUser(currentUser)
      .then(console.log("success"))
      .catch(err => console.log(err));
    window.location.reload();
  };

  //  Function to handle form input
  handleInputChange = event => {
    let { value } = event.target;
    console.log(value);
    this.setState({ stripe: value });
  };

  // Function to handle form submit
  handleFormSubmit = event => {
    const currentUser = this.state.user._id;
    const stripeAccount = { stripeAccount: this.state.stripe };
    console.log("stripeAccount", stripeAccount);
    console.log("currentUser", currentUser);

    API.changetoAdmin(currentUser, stripeAccount)
      .then(console.log("success"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="adminGrid">
        <Header />
        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className="toggle">☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} />
        </div>
        <div className="adminMessage">
          <h2 className="adminHeader">
            Before you can get started, please make an account with Stripe at <a href="https://stripe.com/" target="_blank">Stripe.com</a><br></br>
            After doing so, hit the button below and go through the sign up flow to start receiving payments through Art Gutter
          </h2>
          <button className="submit btn" id="stripeBtn">
            <a href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_KEY}&scope=read_write`}>
              Connect with Stripe
            </a>
          </button>
        </div>
        < Footer />
      </div>
    );
  }
}

// Telling this component if we are logged in or not and what to show occordingly
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(Admin);
