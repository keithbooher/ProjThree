import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import { Row, Col } from "../../components/Grid";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import Anchor from "../../components/Anchor/Anchor";
import List from "../../components/List/List";
import UnorderedList from "../../components/List/UnorderedList";
import { Link } from "react-router-dom";

import "./Artists.css";

class Artists extends Component {
  state = {
    amount: 0,
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
        let convertRating = parseInt(rating, 16);
        pushedRatings.push(convertRating);
        console.log("rating", rating);
      }

      // var sum, avg = 0;
      let average =
        pushedRatings.reduce((a, b) => a + b, 0) / pushedRatings.length;
      // let firstName = this.state.users[i].firstName;

      let averageRounded = average.toFixed(1);
      let parsed = parseInt(averageRounded, 16);

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
      <div>
        {console.log("users ratings state: ", this.state.userRatings)}
        {this.state.user.admin ? <AdminHeader /> : <Header key="1" />}
        <Row>
          <Col size="sm-2 offset-'sm-11">
            <SideBar user={this.state.user} />
          </Col>
          <Col size="sm-10 offset-'sm-1">
            {this.state.users.map((user, i) => (
              <UnorderedList class="unorderedNameList" key={i}>
                <List class="nameList">
                  <Link to={`/artist/${user._id}`} className="artistNames">
                    {`${user.firstName} ${user.averageRating}`}
                  </Link>
                  {/* <Anchor
                    href={"/artist/" + user._id}
                    text={user.firstName + " " + user.averageRating}
                    class={"artistNames"}
                  /> */}
                </List>
              </UnorderedList>
            ))}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Artists);
