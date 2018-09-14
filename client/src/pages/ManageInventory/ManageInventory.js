import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
// import InventoryCard from "../../components/Card/InventoryCard";
import "./ManageInventory.css";

class ManageInventory extends Component {
  // contructor(props) {
  //  super(props)

  // }

  state = {
    productIDs: [],
    products: [],
    currentUser: {},
    value: "",
    quantity: 0
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadCurrentUser();
  }

  //  Function to handle form input
  handleInputChange = event => {
    console.log("event", event.target.value);
    this.setState({ value: event.target.value });
  };

  handleFormSubmit = id => {
    console.log("value", this.state.value);
    console.log("id", id);

    const newQuantity = {
      quantity: this.state.value
    };

    API.updateQuantity(id, newQuantity)
      .then(dbModel => {
        console.log(dbModel);
        // if (dbModel.data.quantity === 0) {
          API.updateSold(id).then(result => console.log("success"));
        // }
      })
      .catch(err => console.log(err));
  };

  loadProductIds = () => {
    const userProducts = this.state.currentUser.product;
    const userProductsArray = [];
    for (let i = 0; i < userProducts.length; i++) {
      userProductsArray.push(userProducts[i]);
    }
    console.log("userProductsArray", userProductsArray);
    this.setState({
      productIDs: userProductsArray,
      quantity: this.state.currentUser.quantity
    });
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
            currentUser: result
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

  render() {
    return (
      <div className="artistGrid">
        {this.state.currentUser.admin ? (
          <AdminHeader amount={this.state.amount} />
        ) : (
          <Header key="1" amount={this.state.amount} />
        )}
        <SideBar user={this.state.user} />

        <div className="container productContent">
          <div className="productCard">
            {console.log("MAP STATE", this.state.products)}
            {this.state.products.map((product, i) => {
              console.log("PRODUCT", i, product.data);
              return (
                <div className="artCard" key={i}>
                  <img
                    className="card-img-top"
                    src={product.data.img}
                    alt={product.data.productName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.data.productName}</h5>
                    <p className="card-text">
                      ${product.data.price + product.data.platformFee}
                    </p>
                    <p className="card-text">{product.data.description}</p>
                    <form className="manageForm">
                      <div className="form-group">
                        <label htmlFor="description">Quantity: </label>
                        <input
                          value={this.state.value}
                          onChange={this.handleInputChange}
                          type="integer"
                          className="form-control"
                          id="quantity"
                          name="quantity"
                          placeholder={product.data.quantity}
                        />
                      </div>
                      {/* <div className={this.state.alertQuantity}>
                        <p>Please enter quantity</p>
                      </div> */}
                    </form>
                    <span>
                      <button
                        className="checkout btn"
                        onClick={() => this.handleFormSubmit(product.data._id)}
                      >
                        Update
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(ManageInventory);
