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
import Footer from "../../components/Footer/Footer";
// import UnorderedList from "../../components/List/UnorderedList";
import { Link } from "react-router-dom";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

import "./Artists.css";

class Artists extends Component {
  state = {
    products: [],
    user: {},
    users: [],
    admins: [],
    sidebarOpen: true,
    toggleID: " ",
    moveToggler: " ",
  };

  componentWillMount() {
    this.checkToggle();

  }
  componentDidMount() {
    this.props.fetchUser();
    this.loadUsers();
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
    this.setState({
      isLoaded: true,
      user: this.props.auth
    });
    console.log(this.props.auth)
  };

  render() {
    return (
      <div className="artistsGrid">
        {console.log("users ratings state: ", this.state.users)}
        <Header className="header" />
        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className="toggle">☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} />
        </div>

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
)(Artists);
