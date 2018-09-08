import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import { Row, Col } from "../../components/Grid";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";

import "./Post.css";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      user: {},
      title: "",
      price: "",
      file: null
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
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    API.saveImage(formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        console.log("so far so good");
        this.setState({ file: null }, console.log("NEWER STATE", this.state));
        // console.log("EVENT TARGET VALUE: ", event.target.value);
      })
      .catch(error => {
        console.log(error);
      });

    // console.log(this.state)
    let { title, price, img } = this.state;
    let query = { title, price, img };
    // console.log(query);

    const convertedPrice = this.state.price;
    const prePlatformFee = this.state.price * 0.05;
    const platformFee = Math.round(prePlatformFee);

    const newProduct = {
      productName: this.state.title,
      price: convertedPrice,
      img: this.state.img,
      email: this.state.user.email,
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
          file: null
        })
      )
      .catch(err => console.log(err));
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
    return (
      <div>
        {this.state.user.admin ? <AdminHeader /> : <Header key="1" />}
        <Row>
          <Col size="sm-3 offset-'sm-11">
            <SideBar user={this.state.user} />
          </Col>
          <Col size="sm-9 offset-'sm-1">
            <form className="postForm">
              <div className="form-group">
                <label htmlFor="title">Title of work: </label>
                <input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  type="text"
                  className="form-control bg-white"
                  id="title"
                  name="title"
                  placeholder="Please enter a Title for your work"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  value={this.state.price}
                  onChange={this.handleInputChange}
                  type="integer"
                  className="form-control bg-white"
                  id="price"
                  name="price"
                  placeholder="Please set a price for your work"
                />
              </div>
              <div className="form-group">
                <label htmlFor="img">Example file input</label>
                <input
                  onChange={this.handleFileInput}
                  type="file"
                  className="form-control-file"
                  id="img"
                  name="img"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary submitBtn"
                onClick={this.handleFormSubmit}
              >
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Post);
