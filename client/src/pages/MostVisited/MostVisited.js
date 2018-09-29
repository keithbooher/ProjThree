import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import "./MostVisited.css";
import Footer from "../../components/Footer/Footer";
import ArtistListItem from "../../components/List/ArtistList";
import ArtistUnorderedList from "../../components/List/ArtistUL";
import { Link } from "react-router-dom";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

class MostVisited extends Component {
  state = {
    products: [],
    user: {},
    users: [],
    userRatings: [],
    productDataObjects: [],
    productObjects: [],
    admins: [],
    lastPostComplete: false,
    done: false,
    sidebarOpen: true,
    toggleID: " ",
    moveToggler: " ",
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadUsers();
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

  loadUsers = () => {
    console.log("test");
    API.getPopularUsers()
      .then(res => {
        console.log(this.state);
        this.setState({ users: res.data });
        this.loadCurrentUser();
        this.filterAdmin();
      })
      .catch(err => console.log(err));
  };

  filterAdmin = () => {
    let users = this.state.users;
    if (users.length <= 3) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].admin) {
          this.setState({ admins: this.state.admins.concat(users[i]) });
        }
      }
    } else {
      for (let i = 0; i < 3; i++) {
        if (users[i].admin) {
          this.setState({ admins: this.state.admins.concat(users[i]) });
        }
      }
    }

    console.log("NEWEST STATE: ", this.state);
    this.userRatings();
  };

  loadUsersLastPost = () => {
    if (!this.state.lastPostComplete) {
      const users = this.state.users;
      for (let i = 0; i < users.length; i++) {
        const userProducts = users[i].product;
        for (let i = 0; i < userProducts.length; i++) {
          const product = userProducts[userProducts.length - 1];
          let productsArray = this.state.products;
          productsArray.push(product);
          this.setState({ products: productsArray });
        }
      }
      this.setState({ lastPostComplete: true });
      this.removeDuplicates();
    }
  };

  removeDuplicates = () => {
    let unique_array = [];
    let productsArray = this.state.products;
    for (let i = 0; i < productsArray.length; i++) {
      if (unique_array.indexOf(productsArray[i]) === -1) {
        unique_array.push(productsArray[i]);
      }
    }
    this.setState({ products: unique_array });
    this.loadUsersProducts();
  };

  loadUsersProducts = () => {
    const productIDs = this.state.products;
    for (let i = 0; i < productIDs.length; i++) {
      API.getProduct(productIDs[i])
        .then(result => {
          this.setState({
            productDataObjects: this.state.productDataObjects.concat(
              result.data
            )
          });
          //   this.finalizeProducts()
          this.consolelog();
        })
        .catch(err => console.log(err));
    }
  };

  finalizeProducts = () => {
    let productDataObjects = this.state.productDataObjects;
    for (let i = 0; i < productDataObjects.length; i++) {
      this.setState({
        productDataObjects: this.state.productObjects.concat(
          this.state.productObjects[i].data
        )
      });
    }
    this.consolelog();
  };

  consolelog = () => {
    this.setState({ done: true });
    console.log(
      "****PRODUCTS****",
      this.state.productDataObjects[0].productName
    );
  };

  loadCurrentUser = () => {
    this.setState({
      isLoaded: true,
      user: this.props.auth
    });
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
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className="toggle">☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} />
        </div>

        <ArtistUnorderedList className="main">
          {!this.state.users
            ? " "
            : this.state.admins.map((user, i) => {
              console.log("map", user.product[0]);
              return (
                <ArtistListItem className="nameList" key={i}>
                  <Link to={`/artist/${user._id}`} className="artistNames">
                    {`${user.firstName}`}
                    {user.product.length === 0 ? (
                      " "
                    ) : (
                        <img
                          alt={user.product[user.product.length - 1].img}
                          className="userImage"
                          src={`${user.product[user.product.length - 1].img}`}
                        />
                      )}
                  </Link>
                </ArtistListItem>
              );
            })}{" "}

        </ArtistUnorderedList>
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
)(MostVisited);
