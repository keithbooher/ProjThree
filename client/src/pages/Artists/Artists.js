import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
// import Anchor from "../../components/Anchor/Anchor";
import ArtistListItem from "../../components/List/ArtistList";
import ArtistUnorderedList from "../../components/List/ArtistUL";
// import UnorderedList from "../../components/List/UnorderedList";
import { Link } from "react-router-dom";

import "./Artists.css";

class Artists extends Component {
  state = {
    products: [],
    user: {},
    users: [],
    admins: []
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadUsers();
  }

  loadUsers = () => {
    console.log("test");
    API.getUser()
      .then(res => {
        console.log(this.state);
        this.setState({ users: res.data });
        this.filterAdmin();
        this.loadCurrentUser();

        console.log("NEWEST STATE: ", this.state);
      })
      .catch(err => console.log(err));
  };

  filterAdmin = () => {
    let users = this.state.users;
    for (let i = 0; i < users.length; i++) {
      if (users[i].admin) {
        this.setState({ admins: this.state.admins.concat(users[i]) });
      }
    }
    console.log("NEWEST STATE: ", this.state);
  };

  loadCurrentUser = () => {
    fetch("/api/current_user")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            user: result
          });
          console.log("result", result);
          // this.loadUsers();
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
      <div className="artistsGrid">
        {console.log("users ratings state: ", this.state.users)}
        {this.state.user.admin ? (
          <AdminHeader className="header" />
        ) : (
          <Header className="header" />
        )}
        <SideBar user={this.state.user} />

        {this.state.admins ? (
          <ArtistUnorderedList className="maincontent">
            {this.state.admins.map((user, i) => (
              <ArtistListItem className="nameList" key={i}>
                <Link to={`/artist/${user._id}`} className="artistNames">
                  <img
                    alt={user.img}
                    className="smallImg"
                    src={`${user.img}`}
                  />
                  {`${user.firstName}`}
                </Link>
              </ArtistListItem>
            ))}
          </ArtistUnorderedList>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Artists);
