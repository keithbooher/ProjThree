import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import List from "../List/List";
// import Anchor from "../Anchor/Anchor";
import { Link } from "react-router-dom";

class AdminList extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadCurrentUser();
  }

  loadCurrentUser = () => {
    fetch("/api/current_user")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            user: result
          });

          // console.log('result', result)
          // let currentUser = this.state.user;
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
      <div>
        <List>
          <Link to="/customize">Customize Your Page</Link>
        </List>
        <List>
          <Link to="/post">Post New Art</Link>
        </List>
        <List>
          <Link to={`/artist/${this.state.user._id}`}>View Your Page</Link>
        </List>
        <List>
          <Link to="/inventory">Manage Inventory</Link>
        </List>
        <List>
          <Link to="/delete">Delete Products</Link>
        </List>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(AdminList);
