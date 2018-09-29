import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import { Redirect } from "react-router-dom";
// import InventoryCard from "../../components/Card/InventoryCard";
import "./ManageInventory.css";
import Footer from "../../components/Footer/Footer";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

class ManageInventory extends Component {
  // contructor(props) {
  //  super(props)

  // }

  state = {
    user: {},
    productIDs: [],
    products: [],
    currentUser: {},
    value: [],
    quantity: 0,
    toDashboard: false
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

  //  Function to handle form input
  handleInputChange = event => {
    console.log(this.state);
    // console.log(`i: ${i}`);
    console.log("event", event);
    const target = event.target;
    const name = target.name;
    const value = target.value;
    // let tempVar = this.state.value;
    // tempVar[i] = event.target.value;
    // this.setState({ value: tempVar });
    this.setState({ [name]: value });
  };

  handleFormSubmit = id => {
    console.log("value", this.state.value);
    console.log("id", id);
    const value = this.state[id];
    console.log("value: ", value);
    const newQuantity = {
      quantity: value
    };

    console.log("id", id);

    if (value < 1) {
      API.updateSoldTrue(id).then(result => {
        console.log("SOLD", result);
      });
    } else {
      API.updateSold(id).then(result => {
        console.log("SOLD", result);
      });
    }

    API.updateQuantity(id, newQuantity)
      .then(dbModel => this.setState({ toDashboard: true }))
      .catch(err => console.log(err));
  };

  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }


  loadUsersProducts = () => {
    const productIDs = this.props.auth.product;
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
    this.setState({
      isLoaded: true,
      currentUser: this.props.auth,
      productIDs: this.props.auth.product,
      quantity: this.props.auth.quantity
    });
    console.log("current user: ", this.props);
    this.loadUsersProducts();
  };



  render() {
    if (this.state.toDashboard === true) {
      return (
        // <Redirect to={`/artist/${this.state.currentUser._id}`} test={"hello"} />
        <Redirect
          to={{
            pathname: `/artist/${this.state.currentUser._id}`,
            state: { hello: "test" }
          }}
        />
      );
    }
    return (
      <div className="artistGrid">

        <Header key="1" amount={this.state.amount} />

        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className="toggle">☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} />
        </div>

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
                    <form onKeyPress={this.onKeyPress} className="manageForm">
                      <div className="form-group">
                        <label htmlFor="description">Quantity: </label>
                        <input
                          name={product.data._id}
                          value={this.state.value[i]}
                          onChange={e => {
                            console.log(e);
                            this.handleInputChange(e);
                            //this.handleInputChange(i, e);
                          }}
                          type="integer"
                          className="form-control"
                          id="quantity"
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
        < Footer />
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  console.log(auth)

  return { auth };
}
export default connect(
  mapStateToProps,
  actions
)(ManageInventory);
