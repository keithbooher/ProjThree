import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
// import { Row, Col } from "../../components/Grid";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";

import "./Post.css";
import { Redirect } from "react-router-dom";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      title: "",
      price: "",
      description: "",
      quantity: "",
      img: "",
      file: null,
      alertTitle: "hide",
      alertPrice: "hide",
      alertDescription: "hide",
      alertQuantity: "hide",
      alertImg: "hide",
      toDashboard: false
    };
  }

  componentDidMount() {
    // this.loadProducts();
    this.props.fetchUser();
    this.loadCurrentUser();
  }

  //  Function to handle form input
  handleInputChange = event => {
    let { name, value } = event.target;
    // console.log(value)

    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // console.log(this.state)
    if (!this.state.title.trim()) {
      console.log("yo mane");
      this.setState({ alertTitle: "show" });
    } else if (!this.state.price.trim()) {
      console.log("yo mane");
      this.setState({ alertPrice: "show" });
    } else if (!this.state.description.trim()) {
      console.log("yo mane");
      this.setState({ alertDescription: "show" });
    } else if (!this.state.quantity.trim()) {
      console.log("yo mane");
      this.setState({ alertQuantity: "show" });
    } else if (!this.state.file) {
      console.log("yo mane");
      this.setState({ alertImg: "show" });
    } else {
      const formData = new FormData();
      //state file is being added upon forminput
      formData.append("file", this.state.file[0]);
      API.saveImage(formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(response => {
          console.log("so far so good");
          console.log(response.data);
          this.setState({ img: response.data });
          // console.log(query);

          // let { title, price, img, description } = this.state;
          // let query = { title, price, img };

          const convertedPrice = this.state.price;
          const prePlatformFee = this.state.price * 0.05;
          const platformFee = Math.round(prePlatformFee);

          const newProduct = {
            productName: this.state.title,
            price: convertedPrice,
            img: this.state.img,
            description: this.state.description,
            email: this.state.user.email,
            artistName: this.state.user.firstName,
            quantity: this.state.quantity,
            stripeAccount: this.state.user.stripeAccount,
            associatedID: this.state.user._id,
            platformFee: platformFee,
            date: Date.now()
          };

          API.saveProduct(this.state.user._id, newProduct)
            .then(
              console.log("success"),
              this.setState({
                title: "",
                price: "",
                description: "",
                quantity: "",
                file: null,
                toDashboard: true
              })
              // window.location.replace(`/artist/${this.state.user._id}`)
            )
            .catch(err => console.log(err));
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleFileInput = event => {
    this.setState({ file: event.target.files });
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
          let currentUser = this.state.user;
          API.createUser(currentUser)
            .then(console.log("success"))
            .catch(err => console.log(err));

          console.log("state", this.state.user);
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

  handleFileInput = event => {
    this.setState({ file: event.target.files });
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
          let currentUser = this.state.user;
          API.createUser(currentUser)
            .then(console.log("success"))
            .catch(err => console.log(err));

          console.log("state", this.state.user);
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
    if (this.state.toDashboard === true) {
      return <Redirect to={`/artist/${this.state.user._id}`} />;
    }
    return (
      <div className="postGrid">
        {this.state.user.admin ? <AdminHeader /> : <Header key="1" />}

        <SideBar user={this.state.user} />

        <form className="postForm">
          {/* Title of Art */}
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              value={this.state.title}
              onChange={this.handleInputChange}
              type="integer"
              className="form-control "
              id="title"
              name="title"
              placeholder="example: &quot;The Starry Night&quot;"
            />
          </div>
          {/* Price of Art */}
          <div className="form-group">
            <label htmlFor="price">Price: </label>
            <input
              value={this.state.price}
              onChange={this.handleInputChange}
              type="integer"
              className="form-control"
              id="price"
              name="price"
              placeholder="example: 100"
            />
          </div>
          {/* Description of Art */}
          <div className="form-group">
            <label htmlFor="description">Description: </label>
            <textarea
              value={this.state.description}
              onChange={this.handleInputChange}
              rows="5"
              type="text"
              className="form-control "
              id="description"
              name="description"
              placeholder="example: &quot;The village is painted with dark colors but the brightly lit windows create a sense of comfort.&quot;"
            />
          </div>
          {/* Quantity of Art */}
          <div className="form-group">
            <label htmlFor="description">Quantity: </label>
            <input
              value={this.state.quantity}
              onChange={this.handleInputChange}
              type="integer"
              className="form-control "
              id="quantity"
              name="quantity"
              placeholder="Enter Quantity"
            />
          </div>
          {/* Image file of Art */}
          <div className="form-group">
            <label htmlFor="img">Image File:</label>
            <input
              onChange={this.handleFileInput}
              type="file"
              className="form-control-file"
              id="img"
              name="img"
            />
          </div>
          <div className="postFormFlex">
            <button
              type="submit"
              className="btn btn-info submitBtn"
              onClick={this.handleFormSubmit}
            >
              Submit
            </button>
            <div className={this.state.alertTitle}>
              <h3 className="warning">Title required</h3>
            </div>
            <div className={this.state.alertPrice}>
              <h3 className="warning">Price required</h3>
            </div>
            <div className={this.state.alertDescription}>
              <h3 className="warning">Description required</h3>
            </div>
            <div className={this.state.alertQuantity}>
              <h3 className="warning">Quantity required</h3>
            </div>
            <div className={this.state.alertImg}>
              <h3 className="warning">Image required</h3>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Post);
