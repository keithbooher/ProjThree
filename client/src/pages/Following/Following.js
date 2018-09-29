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
import "./Following.css";

class Artists extends Component {
  state = {
    products: [],
    user: {},
    users: [],
    admins: [],
    following: [],
    followingObjects: []
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadCurrentUser();
  }

  componentWillMount() {
    this.checkToggle();

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

  loadFollowedArtists = () => {
    console.log('following', this.state.following)
    const following = this.props.auth.following
    for (let i = 0; i < following.length; i++) {
      console.log(following[i])
      let followedUser = following[i]
      API.getUserById(followedUser)
        .then(res => {
          console.log('users res', res)
          this.setState({ followingObjects: this.state.followingObjects.concat(res.data) })
          this.consolelog();

        })
        .catch(err => console.log(err));
    }

  }

  consolelog = () => {
    console.log('following', this.state.followingObjects)
  }


  loadCurrentUser = () => {
    if (this.props.auth) {
      this.setState({
        isLoaded: true,
        user: this.props.auth,
        following: this.props.auth.following
      });
      console.log("current user", this.props.auth.following);
      this.loadFollowedArtists()
    } else {
      return
    }
  };

  render() {
    return (
      <div className="artistsGrid">

        <Header key="1" className="header" />
        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className="toggle">☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} />
        </div>

        {this.state.followingObjects ? (
          <ArtistUnorderedList className="maincontent">
            {this.state.followingObjects.map((user, i) => (
              <ArtistListItem className="nameList" key={i}>
                <Link to={`/artist/${user._id}`} className="artistNames">
                  <img alt={user.img} className="smallImg" src={`${user.img}`} />
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
)
  (Artists);
