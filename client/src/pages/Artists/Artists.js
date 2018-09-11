import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import { Row, Col } from "../../components/Grid";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
// import Anchor from "../../components/Anchor/Anchor";
import ArtistListItem from "../../components/List/ArtistList";
import ArtistUnorderedList from "../../components/List/ArtistUL";
import UnorderedList from "../../components/List/UnorderedList";
import { Link } from "react-router-dom";

import "./Artists.css";

class Artists extends Component {
  state = {
    products: [],
    user: {},
    users: [],
    userRatings: []
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadCurrentUser();
  }

  userRatings = () => {
    const users = this.state.users;

    for (let i = 0; i < users.length; i++) {
      console.log("*****USER****", users[i].firstName);
      let pushedRatings = [];
      let userRatingsArray = users[i].rating;

      for (let i = 0; i < userRatingsArray.length; i++) {
        let rating = userRatingsArray[i];
        let convertRating = parseInt(rating);
        pushedRatings.push(convertRating);
        console.log("rating", rating);
      }

      let average = pushedRatings.reduce((a, b) => a + b, 0) / pushedRatings.length;

      let averageRounded = average.toFixed(1);
      let parsed = parseInt(averageRounded);
      console.log('parsed', parsed)

      if(!parsed){
        (console.log('parsed test'))
        parsed=5
        this.setState()
      }

      const averageRatingObject = {
        averageRating: parsed
      };

      const currentUser = users[i];
      console.log("currentUser", currentUser);
      console.log("averageRatingObject", averageRatingObject);

      API.averageRating(currentUser._id, averageRatingObject)
        .then(console.log("success"))
        .catch(err => console.log(err));
    }
  };

  loadUsers = () => {
    console.log("test");
    API.getUser()
      .then(res => {
        console.log(this.state);
        this.setState({ users: res.data });
        this.userRatings();
      })
      .catch(err => console.log(err));
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
          this.loadUsers();
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
        {console.log("users ratings state: ", this.state.userRatings)}
        {this.state.user.admin ? (
          <AdminHeader amount={this.state.amount} className="header" />
        ) : (
          <Header key="1" amount={this.state.amount} className="header" />
        )}
        <SideBar user={this.state.user} />
        <ArtistUnorderedList className="main">
          {this.state.users.map((user, i) => (
            <ArtistListItem className="nameList" key={i}>
              <Link to={`/artist/${user._id}`} className="artistNames">
              <img className="smallImg" src={`${user.img}`}></img>
                {`${user.firstName} ${!user.averageRating ? 5 : user.averageRating} Stars`}
              </Link>
            </ArtistListItem>
          ))}
        </ArtistUnorderedList>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Artists);
