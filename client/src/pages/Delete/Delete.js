import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import DeleteCard from "../../components/Card/DeleteCard";
import Footer from "../../components/Footer/Footer";
import "./Delete.css";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

class Delete extends Component {
  state = {
    amount: 0,
    productIDs: [],
    products: [],
    pageArtist: {},
    user: {},
    currentUser: {},
    sidebarOpen: true,
    toggleID: " ",
    moveToggler: " ",
    top: "toggle",
    sidebarMobile: "sideBarMobile"
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadUsersProducts();
    this.checkTop();
  }

  componentWillMount() {
    this.checkToggle();
    this.loadCurrentUser();
    console.log(this.props.auth)
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  checkTop = () => {
    window.onscroll = function () {
      if (window.pageYOffset === 0) {
        this.setState({ top: "toggle", sidebarMobile: "sideBarMobile" })
      } else {
        this.setState({ top: "notTopToggle", sidebarMobile: "sideBarMobileNotTop" })
      }
    }.bind(this);
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

  loadUsersProducts = () => {
    const productIDs = this.state.productIDs;
    console.log(productIDs)
    // const productObjectsArray = [];
    for (let i = 0; i < productIDs.length; i++) {
      API.getProduct(productIDs[i])
        .then(result => {
          console.log(result)
          this.setState({ products: this.state.products.concat(result) });
        })
        .catch(err => console.log(err));
    }
  };


  loadCurrentUser = () => {
    if (this.props.auth) {
      this.setState({
        isLoaded: true,
        productIDs: this.props.auth.product,
        user: this.props.auth
      });
      console.log(this.props.auth.product)
      this.loadUsersProducts();
    } else {
      return
    }

  };

  deleteProduct = id => {
    API.deleteProduct(id)
      .then(result => console.log("result", result))
      .catch(err => console.log(err));
    console.log("id", id);

    for (let i = 0; i < this.state.user.product.length; i++) {
      let productID;
      if (id === this.state.user.product[i]) {
        console.log("this.state.user._id", this.state.user._id);
        console.log("this.state.user.product[i]", this.state.user.product[i]);
        productID = { productID: this.state.user.product[i] };

        API.deleteUsersProduct(this.state.user._id, productID)
          .then(console.log("success"), window.location.reload())
          .catch(err => console.log(err));
      }
    }
  };

  render() {
    return (
      <div className="deleteGrid">
        <Header key="1" amount={this.state.amount} />

        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className={this.state.top}>☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} sidebarMobile={this.state.sidebarMobile} />
        </div>
        <div className="productContent">
          <div className="productCard">
            {console.log("MAP STATE", this.state.products)}
            {this.state.products
              ? this.state.products.map((product, i) => {
                return (
                  <DeleteCard
                    key={i}
                    image={product.data.img}
                    price={product.data.price}
                    productName={product.data.productName}
                    artistEmail={product.data.email}
                    currentUserEmail={this.state.currentUser.email}
                    targetStripe={product.data.stripeAccount}
                    platformFee={product.data.platformFee}
                    productID={product.data._id}
                    deleteProduct={this.deleteProduct}
                  />
                );
              })
              : ""}
          </div>
        </div>
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
)(Delete);
