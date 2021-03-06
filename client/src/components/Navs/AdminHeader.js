import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./nav.css";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1">
            <a href="/auth/google">Login With Google</a>
          </li>
        ];
      default:
        return [
          <li className="admin" key="2">
            Admin!
          </li>,
          <li key="3" style={{ margin: "0 10px" }}>
            <a href="/usersettings">Settings</a>
          </li>,
          <li key="4" style={{ margin: "0 10px" }}>
            {this.props.auth.firstName}
          </li>,
          <li key="5">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav className="header">
        <div className="nav-wrapper">
          <Link
            //if 'this.props.auth' returns a user then we go 'to/surveys', otherwise we go to '/'
            to={this.props.auth ? "/home" : "/"}
            className="left brand-logo"
          >
            Art Gutter
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

// telling this component if we are logged in or not and what to show occordingly
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
