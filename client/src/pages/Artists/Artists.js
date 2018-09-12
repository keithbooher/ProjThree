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

import "./Artists.css";

class Artists extends Component {
  state = {
    products: [],
    user: {},
    users: []
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadCurrentUser();
  }

  averageStars = () => {
    const users = this.state.users;
    console.log("users", users);
    const artistAverageRating = this.state.user.averageRating;
    for (let j = 0; j < users.length; j++) {
      let thisUser = users[j].firstName;
      console.log("thisUser", thisUser);
      for (let i = 1; i <= artistAverageRating; i++) {
        document
          .getElementById(`${thisUser}averageStar${i}`)
          .classList.add("checked");
      }
    }
  };

  loadUsers = () => {
    console.log("test");
    API.getUser()
      .then(res => {
        console.log(this.state);
        this.setState({ users: res.data });
        this.averageStars();
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
        {console.log("users ratings state: ", this.state.users)}
        {this.state.user.admin ? (
          <AdminHeader className="header" />
        ) : (
          <Header key="1" className="header" />
        )}
        <SideBar user={this.state.user} />

        {!this.state.users ? (
          ""
        ) : (
          <ArtistUnorderedList className="main">
            {this.state.users.map((user, i) => (
              <ArtistListItem className="nameList" key={i}>
                <Link to={`/artist/${user._id}`} className="artistNames">
                  <img className="smallImg" src={`${user.img}`} />
                  {`${user.firstName} ${
                    !user.averageRating ? (
                      ""
                    ) : (
                      <AverageStar name={user.firstName} />
                    )
                  } Stars`}
                </Link>
              </ArtistListItem>
            ))}
          </ArtistUnorderedList>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Artists);
