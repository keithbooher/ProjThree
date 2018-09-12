import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ReactDOM from "react-dom";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
// import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
// import Payments from '../../components/Navs/Payments';
import Card from "../../components/Card";
import Star from "../../components/Star/Star";

import "./Artist.css";

class Artist extends Component {
  state = {
    amount: 0,
    productIDs: [],
    products: [],
    pageArtist: {},
    user: {},
    currentUser: {},
    rating: 0,
    ratingSubmitted: false
  };

  componentDidMount() {
    this.props.fetchUser();
    this.loadCurrentUser();
    this.loadThispageArtist();
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
          this.isThisTheCurrentUsersPage();
        })
        .catch(err => console.log(err));
    }
  };

  consolelog = () => {
    console.log("productIDs", this.state.productIDs);
    console.log("products", this.state.products);
  };

  loadThispageArtist = () => {
    const url = window.location.href;
    console.log("url", url);
    const splitURL = url.split("/");
    console.log(splitURL[4]);
    const targetedID = splitURL[4];

    let users;

    API.getUser()
      .then(res => {
        users = res.data;
        console.log("users", users);
        for (let i = 0; i < users.length; i++) {
          // console.log('userID', users[i])
          // console.log('targetedID', targetedID)
          if (users[i]._id === targetedID) {
            this.setState({ user: users[i] });
            this.loadProductIds();
            this.pageView();
            console.log("success");
          }
        }
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

  star = id => {
    let rating = 0;
    console.log("id", id);
    const starInQuestion = document.getElementById(`star${id}`);
    if (starInQuestion.classList.contains("checked")) {
      for (let i = id + 1; i <= 5; i++) {
        document.getElementById(`star${i}`).classList.remove("checked");
        rating = id;
      }
    } else if (!starInQuestion.classList.contains("checked")) {
      for (let i = 1; i <= id; i++) {
        document.getElementById(`star${i}`).classList.add("checked");
        rating = i;
      }
    }
    console.log("rating", rating);

    const ratingObject = {
      rating: rating
    };

    this.setState({ rating: ratingObject });

    console.log("rating state", ratingObject);

    this.isRateStateFilled();
  };

  submitRating = () => {
    const currentUser = this.state.user._id;
    const ratingState = this.state.rating;

    API.changeRating(currentUser, ratingState)
      .then(this.setState({ ratingSubmitted: true }))
      .catch(err => console.log(err));
  };

  isRateStateFilled = () => {
    if (this.state.rating) {
      console.log("YOOOOOOOOOOOOOOOO", this.state.rating);
      return true;
    } else {
      return false;
    }
  };

  isThisTheCurrentUsersPage = () => {
    const url = window.location.href;
    console.log("url", url);
    const splitURL = url.split("/");
    console.log(splitURL[4]);
    const targetedID = splitURL[4];
    console.log(splitURL[4]);

    if (targetedID === this.state.currentUser._id) {
      return true;
    } else {
      return false;
    }
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

    console.log("modal", modal);
    console.log("modalImg", modalImg);
    console.log("captionText", captionText);
    console.log("src", img.src);

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

  pageView = () => {
    const pageViewCount = this.state.user.pageViews;
    const plusOne = pageViewCount + 1;
    const artistPage = this.state.user._id;

    const plusOneObject = {
      plusOne: plusOne
    };

    API.updatePageViews(artistPage, plusOneObject).catch(err =>
      console.log(err)
    );
  };

  render() {
    return (
      <div className="artistGrid">
        {this.state.user.admin ? (
          <AdminHeader amount={this.state.amount} />
        ) : (
          <Header key="1" amount={this.state.amount} />
        )}
        <SideBar user={this.state.user} />

        <div className="container productContent">
          <div className="userProfile artistProfile">
            <img src={`${this.state.user.img}`} className="userProfilePic" />
            <div className="userProfileFlex">
              <div className="userInfoFlex">
                <p className="userProfileKey">User:</p>
                <span className="userProfileValue">
                  {this.state.user.firstName}
                </span>
              </div>
              <div className="userInfoFlex">
                <p className="userProfileKey">Email:</p>
                <span className="userProfileValue">
                  {this.state.user.email}
                </span>
              </div>
              <div className="userInfoFlex">
                <p className="userProfileKey">Average Rating: </p>
                <span className="userProfileValue">
                  {this.state.user.averageRating}
                </span>
              </div>
              <div className="userInfoFlex">
                <p className="userProfileKey">Page Views: </p>
                <span className="userProfileValue">
                  {this.state.user.pageViews}
                </span>
              </div>
              <div className="userInfoFlex">
                <p className="userProfileKey">Description: </p>
                <span className="userProfileValue">
                  {this.state.user.aboutMe ? this.state.user.aboutMe : ""}
                </span>
              </div>
            </div>
            {this.isThisTheCurrentUsersPage() ? (
              " "
            ) : (
              <div className="artistRating">
                {this.state.ratingSubmitted ? (
                  <h4>Thank you for submitting your feedback</h4>
                ) : (
                  <div>
                    <Star
                      // user={this.state.user}
                      idOne={1}
                      idTwo={2}
                      idThree={3}
                      idFour={4}
                      idFive={5}
                      star={this.star}
                    />

                    {this.isRateStateFilled() ? (
                      <button
                        className="rating btn"
                        onClick={() => this.submitRating()}
                      >
                        Submit Rating
                      </button>
                    ) : (
                      " "
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="productCard">
            {console.log("MAP STATE", this.state.pageArtist)}
            {this.state.products.map((product, i) => {
              console.log("PRODUCT", i, product.data);
              return (
                <Card
                  key={i}
                  id={i}
                  image={product.data.img}
                  price={product.data.price}
                  description={product.data.description}
                  productName={product.data.productName}
                  artistEmail={product.data.email}
                  currentUserEmail={this.state.currentUser.email}
                  currentUserName={this.state.currentUser.firstName}
                  targetStripe={product.data.stripeAccount}
                  platformFee={product.data.platformFee}
                  productID={product.data._id}
                  sold={product.data.sold}
                  quantity={product.data.quantity}
                  enlargeImage={this.enlargeImage}
                  shrinkImage={this.shrinkImage}
                />
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
)(Artist);
