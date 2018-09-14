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
import AverageStar from "../../components/Star/AverageStar";

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

  loadFollowedArtists = () => {
    console.log('following', this.state.following)    
    const following = this.state.following
      for (let i = 0; i < following.length; i++) {
        console.log(following[i])
        let followedUser = following[i]
        API.getUserById(followedUser)
        .then(res => {
            console.log('users res', res)
            this.setState({ followingObjects: this.state.followingObjects.concat(res.data) })
            this.consolelog();
            
        } )
        .catch(err => console.log(err));
      }
      
  }

  consolelog = () => {
      console.log('following', this.state.followingObjects)
  }


  loadCurrentUser = () => {
    fetch("/api/current_user")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            user: result,
            following: result.following
          });
          console.log("result", result);
          this.loadFollowedArtists()        
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
        {this.state.user.admin ? (
          <AdminHeader className="header" />
        ) : (
          <Header key="1" className="header" />
        )}
        <SideBar user={this.state.user} />

        {this.state.followingObjects ? (
          <ArtistUnorderedList className="maincontent">
            {this.state.followingObjects.map((user, i) => (
              <ArtistListItem className="nameList" key={i}>
                <Link to={`/artist/${user._id}`} className="artistNames">
                  <img className="smallImg" src={`${user.img}`} />
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
