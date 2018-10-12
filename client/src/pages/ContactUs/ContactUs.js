import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import SideBar from "../../components/Sidebar/Sidebar";
import ContactForm from "../../components/ContactForm/ContactForm";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import API from "../../utils/API";
import "./Contact.css";
import Footer from "../../components/Footer/Footer";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

class ContactUs extends Component {
  state = {
    currentUser: {},
    user: {},
    name: "",
    email: "",
    subject: "",
    textBody: "",
    sidebarOpen: true,
    toggleID: " ",
    moveToggler: " ",
    top: "toggle",
    sidebarMobile: "sideBarMobile"
  };

  componentWillMount() {
    this.checkToggle();

  }

  componentDidMount() {
    this.props.fetchUser();
    this.loadCurrentUser();
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
      currentUser: this.props.auth,
      user: this.props.auth
    });
    console.log(this.props.auth)
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

  submitContactForm = event => {
    console.log("button Works");
    console.log(this.state.name);
    console.log(this.state.email);
    console.log(this.state.subject);
    console.log(this.state.textBody);
    let name = this.state.name;
    let email = this.state.email;
    let subject = this.state.subject;
    let textBody = this.state.textBody;

    let formData = {
      name: name,
      email: email,
      subject: subject,
      text: textBody
    };
    console.log(formData);

    if (!name || !email || !subject || !textBody) {
      alert("Please fill out all fields");
    } else {
      API.contactUsForm(formData).then(console.log("It did it"));

      this.setState({
        name: "",
        email: "",
        textBody: "",
        subject: ""
      });
    }
  };

  render() {
    return (
      <div className="contactGrid">
        <Header key="1" amount={this.state.amount} />
        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className={this.state.top}>☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} sidebarMobile={this.state.sidebarMobile} />
        </div>
        <ContactForm
          name={this.state.name}
          email={this.state.email}
          subject={this.state.subject}
          textBody={this.state.textBody}
          submit={this.submitContactForm}
          onChange={this.handleInputChange}
        />
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
)(ContactUs);
