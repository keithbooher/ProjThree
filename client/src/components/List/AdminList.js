import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";

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
    API.getCurrentUser()
      .then(result => {
        this.setState({
          user: result.data
        })
      }
      )
      .catch(err => console.log(err));
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
          <Link to="/inventory">Manage Products</Link>
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
