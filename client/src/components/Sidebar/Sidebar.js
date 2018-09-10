import React, { Component } from "react";
import { connect } from "react-redux";

import List from "../List/List";
import UnorderedList from "../List/UnorderedList";
import "./Sidebar.css";
// import Anchor from "../Anchor/Anchor";
import AdminList from "../List/AdminList";
import { Link } from "react-router-dom";


class Sidebar extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    this.loggedIn();
    this.loadCurrentUser();
  }

  loggedIn = () => {
    if (Object.keys(this.state.user).length === 0) {
      // console.log("not logged in")
      return false;
    } else {
      // console.log("logged in")
      return true;
    }
  };

  adminStatus = () => {
    if (this.loggedIn() === true) {
      if (this.state.user.admin === false || null) {
        // console.log("not an admin")
        return false;
      } else {
        // console.log("you are an admin")
        return true;
      }
    } else {
      return false;
    }
  };

  loadCurrentUser = () => {
    fetch("/api/current_user")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            user: result
          });
          // console.log("state", this.state.user)
          this.loggedIn();
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
      <div className="sideBar">
        <h5 className="sidebarTitle">Explore the Gutter</h5>
        <UnorderedList>
          <List>
            <Link to="/new">New Art</Link>
          </List>
          <List>
            <Link to="/artists">View All Artists</Link>
          </List>

          {this.adminStatus() ? <AdminList /> : ""}
          {this.adminStatus() ? (
            ""
          ) : (
            <List>
              <Link to={this.loggedIn() ? "/adminform" : "/auth/google"}>
                Become Admin
              </Link>
            </List>
          )}
          <List>
            <Link to="/contactUs">Contact Us</Link>
          </List>
        </UnorderedList>
      </div>
    );
  }
}

// Telling this component if we are logged in or not and what to show occordingly
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Sidebar);
