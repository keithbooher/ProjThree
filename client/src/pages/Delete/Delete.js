import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import DeleteCard from "../../components/Card/DeleteCard";
import "./Delete.css";

class Delete extends Component {
  state = {
    amount: 0,
    productIDs: [],
    products: [],
    pageArtist: {},
    user: {},
    currentUser: {}
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadCurrentUser();
    // this.loadThispageArtist();
  }

  loadProductIds = () => {
    const userProducts = this.state.user.product;
    const userProductsArray = [];
    for (let i = 0; i < userProducts.length; i++) {
      userProductsArray.push(userProducts[i]);
    }
    console.log("userProductsArray", userProductsArray);
    this.setState({ productIDs: userProductsArray });
    this.loadUsersProducts();
  };

  loadUsersProducts = () => {
    const productIDs = this.state.productIDs;
    // const productObjectsArray = [];
    for (let i = 0; i < productIDs.length; i++) {
      API.getProduct(productIDs[i])
        .then(result => {
          this.setState({ products: this.state.products.concat(result) });
        })
        .catch(err => console.log(err));
    }
  };

  consolelog = () => {
    console.log("productIDs", this.state.productIDs);
    console.log("products", this.state.products);
  };

  loadCurrentUser = () => {
    fetch("/api/current_user")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            currentUser: result,
            user: result
          });
          console.log("current user: ", this.state.currentUser);
          this.loadProductIds();
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
        {this.state.user.admin ? (
          <AdminHeader amount={this.state.amount} />
        ) : (
          <Header key="1" amount={this.state.amount} />
        )}
        <SideBar user={this.state.user} />
        <div className="productContent">
          <div className="productCard">
            {console.log("MAP STATE", this.state.products)}
            {this.state.productIDs
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
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Delete);
