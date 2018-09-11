import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import { Row, Col } from "../../components/Grid";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card";
import "./NewArt.css";

class Home extends Component {
  state = {
    products: [],
    currentUser: {}
  };

  componentDidMount() {
    // this.loadProducts();
    this.props.fetchUser();
    this.loadProducts();
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
    fetch("/api/current_user")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            currentUser: result
          });
          console.log("current user: ", this.state.currentUser);
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

  enlargeImage = (i) => {
    // Get the modal
    let img; 
    let modal;
    let modalImg;
    let captionText;
    let node = ReactDOM.findDOMNode(this);    
    // Get child nodes
    if (node instanceof HTMLElement) {
       img = node.querySelector(`.images${i}`)
       modal = node.querySelector(`.myModal${i}`);
       modalImg = node.querySelector(`.img${i}`);
       captionText = node.querySelector(`.caption${i}`);
    }

    console.log('modal', modal)
    console.log('modalImg', modalImg)
    console.log('captionText', captionText)
    console.log('src', img.src)

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;

  }

  shrinkImage = (i) => {
    let modal;
    let node = ReactDOM.findDOMNode(this);    

    if (node instanceof HTMLElement) {
      modal = node.querySelector(`.myModal${i}`);
   }
    modal.style.display = "none";
  }

  render() {
    return (
      <div className="newArtGrid">
        {this.state.currentUser.admin ? (
          <AdminHeader/>
        ) : (
          <Header key="1"/>
        )}
        <SideBar user={this.state.user} />
        {console.log("MAP STATE", this.state.products)}
        <div className="allCards">
          {this.state.products.map((product, i) => {
            console.log("PRODUCT", i, product.data);
            return (
              <Card
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
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Home);