import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
// import { Row, Col } from "../../components/Grid";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import AverageStar from "../../components/Star/AverageStar";
import Footer from "../../components/Footer/Footer";
import "./UserSettings.css";
import { Redirect } from "react-router-dom";

class UserSettings extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      user: {},
      title: "",
      price: "",
      description: "",
      img: "",
      file: null,
      alertTitle: "hide",
      alertPrice: "hide",
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

    if (!this.state.file) {
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

          const NewProfilePic = {
            img: this.state.img
          };

          API.saveProfilePic(this.state.user._id, NewProfilePic)
            .then(
              console.log("success"),
              this.setState({
                file: null,
                img: NewProfilePic
              }),
              window.location.reload()
            )
            .catch(err => console.log(err));
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleAboutMeSubmit = event => {
    event.preventDefault();

    if (!this.state.description.trim()) {
      console.log("yo mane");
      this.setState({ alertDescription: "show" });
    } else {
      const newDescription = {
        description: this.state.description
      };

      API.saveDescription(this.state.user._id, newDescription)
        .then(
          console.log("success"),
          this.setState({
            description: " "
          })
        )
        .catch(err => console.log(err));
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
          API.createUser(currentUser).catch(err => console.log(err));
          this.averageStars();
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

  averageStars = () => {
    const artistAverageRating = this.state.user.averageRating;
    for (let i = 1; i <= artistAverageRating; i++) {
      document.getElementById(`averageStar${i}`).classList.add("checked");
    }
  };

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to={`/artist/${this.state.user._id}`} />;
    }
    return (
      <div className="userSettingsGrid">
        {this.state.user.admin ? <AdminHeader /> : <Header key="1" />}
        <SideBar user={this.state.user} />
        <div className="userProfile">
          <img
            alt={this.state.user.img}
            src={`${this.state.user.img}`}
            className="userProfilePic"
          />
          <div className="userProfileFlex">
            <div className="userInfoFlex">
              <p className="userProfileKey">User:</p>
              <span className="userProfileValue">
                {this.state.user.firstName}
              </span>
            </div>
            <div className="userInfoFlex">
              <p className="userProfileKey">Email:</p>
              <span className="userProfileValue">{this.state.user.email}</span>
            </div>
            <div className="userInfoFlex">
              <p className="userProfileKey">Average Rating: </p>
              <span className="userProfileStars">
                <AverageStar />
              </span>
            </div>
            <div className="userInfoFlex">
              <p className="userProfileKey">Page Views: </p>
              <span className="userProfileValue">
                {this.state.user.pageViews}
              </span>
            </div>
            <div className="userInfoFlex">
              <p className="userProfileKey">Products: </p>
              <span className="userProfileValue">
                {this.state.user.product ? this.state.user.product.length : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="userSettingsForm">
          <form className="profilePicForm">
            {/* User Profile Pic */}
            <div className="form-group">
              <h3 className="userSettingsHeader">Change profile picture: </h3>
              <label htmlFor="img">Image File: </label>
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
              className="btn btn-info submitBtn"
              onClick={this.handleFormSubmit}
            >
              Submit
            </button>
          </form>
          <form className="aboutMeForm">
            {/* About Me */}
            <div className="form-group">
              <h3 className="userSettingsHeader">Change your description: </h3>
              <label htmlFor="description">Description: </label>
              <textarea
                value={this.state.description}
                onChange={this.handleInputChange}
                rows="3"
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Tell us something about yourself."
              />
            </div>
            <button
              type="submit"
              className="btn btn-info submitBtn"
              onClick={this.handleAboutMeSubmit}
            >
              Submit
            </button>
          </form>
        </div>
        < Footer />
        {/* <div className={this.state.alertImg}>
          <h3 className="warning">Enter a picture</h3>
        </div> */}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(UserSettings);
