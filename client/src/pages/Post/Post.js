import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
// import { Row, Col } from "../../components/Grid";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import "./Post.css";
import { Redirect } from "react-router-dom";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

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
      toDashboard: false,
      sidebarOpen: true,
      toggleID: " ",
      moveToggler: " ",
      top: "toggle",
      sidebarMobile: "sideBarMobile",
    };
  }

  componentDidMount() {
    this.props.fetchUser();
    this.loadCurrentUser();
    this.checkTop();
  }

  componentWillMount() {
    this.checkToggle();
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
          let sold = false;


          if (this.state.quantity < 1) {
            sold = true
          }

          const newProduct = {
            productName: this.state.title,
            price: convertedPrice,
            img: this.state.img,
            description: this.state.description,
            email: this.state.user.email,
            sold: sold,
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
    this.setState({
      isLoaded: true,
      user: this.props.auth
    });

  };

  handleFileInput = event => {
    this.setState({ file: event.target.files });
  };


  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to={`/artist/${this.state.user._id}`} />;
    }
    return (
      <div className="postGrid">
        <Header key="1" />

        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className={this.state.top}>☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} sidebarMobile={this.state.sidebarMobile} />
        </div>

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
              rows="7"
              type="text"
              className="form-control "
              id="description"
              name="description"
              placeholder="example: &quot;10x10 Canvas done with Acrylic. Was inspired by the waves of life.&quot;"
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
)(Post);
