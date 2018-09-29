import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
// import { Row, Col } from "../../components/Grid";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import NewArtCard from "../../components/Card/NewArtCard";
import Footer from "../../components/Footer/Footer";
import "./NewArt.css";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

class Home extends Component {
  state = {
    products: [],
    currentUser: {},
    sidebarOpen: true,
    toggleID: " ",
    moveToggler: " ",
  };

  componentDidMount() {
    // this.loadProducts();
    this.props.fetchUser();
    this.loadProducts();
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

  loadProducts = () => {
    API.getProducts()
      .then(res => this.setState({ products: res.data }))
      .then(res => console.log("res", this.state.products))
      .catch(err => console.log(err));
    this.consolelog();
  };

  consolelog = () => {
    console.log(this.state.products);
  };

  loadCurrentUser = () => {
    this.setState({
      isLoaded: true,
      currentUser: this.props.auth
    });
  };

  enlargeImage = i => {
    // Get the modal
    let img;
    let modal;
    let modalImg;
    let captionText;
    let node = ReactDOM.findDOMNode(this);
    // Get child nodes
    if (node instanceof HTMLElement) {
      img = node.querySelector(`.images${i}`);
      modal = node.querySelector(`.myModal${i}`);
      modalImg = node.querySelector(`.img${i}`);
      captionText = node.querySelector(`.caption${i}`);
    }

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
  };

  shrinkImage = i => {
    let modal;
    let node = ReactDOM.findDOMNode(this);

    if (node instanceof HTMLElement) {
      modal = node.querySelector(`.myModal${i}`);
    }
    modal.style.display = "none";
  };

  render() {
    return (
      <div className="newArtGrid">
        {this.state.currentUser.admin ? (
          <AdminHeader />
        ) : (
            <Header key="1" />
          )}
        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className="toggle">☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} />
        </div>

        {console.log("MAP STATE", this.state.products)}
        <div className="allCards">
          {this.state.products ?
            this.state.products.map((product, i) => {
              console.log("PRODUCT", i, product.productName);
              return (
                <NewArtCard
                  key={i}
                  id={i}
                  image={product.img}
                  price={product.price}
                  productName={product.productName}
                  artistEmail={product.email}
                  artistName={product.artistName}
                  artistID={product.associatedID}
                  description={product.description}
                  currentUserEmail={this.state.currentUser.email}
                  targetStripe={product.stripeAccount}
                  platformFee={product.platformFee}
                  productID={product._id}
                  sold={product.sold}
                  quantity={product.quantity}
                  enlargeImage={this.enlargeImage}
                  shrinkImage={this.shrinkImage}
                />
              );
            }) : " "}

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
)(Home);
