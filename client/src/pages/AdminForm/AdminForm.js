import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Header from "../../components/Navs/Header";
// import { Row, Col } from "../../components/Grid";
import SideBar from "../../components/Sidebar/Sidebar";
import "./AdminForm.css";

class Admin extends Component {
  state = {
    user: {},
    stripe: ""
  };

  loadCurrentUser = () => {
    fetch("/api/current_user")
      .then(res => res.json())
      .then(
        result => {
          console.log("result", result);
          this.setState({
            isLoaded: true,
            user: result
          });
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

  componentDidMount() {
    console.log("COMPONENT MOUNTED");
    this.props.fetchUser();
    this.loadCurrentUser();
    console.log("user", this.state.user);
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
        <div className="adminMessage">
          <h2 className="adminHeader">
            Before you can get started, please make an account with Stripe at <a href="stripe.com">Stripe.com</a><br></br>
            After doing so, hit the button below and go through the sign up flow to start receiving payments through Art Gutter
          </h2>
          <button className="submit btn" id="stripeBtn">
            <a href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_KEY}&scope=read_write`}>
              Connect with Stripe
            </a>
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Admin);
