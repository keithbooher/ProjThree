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
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

class UserSettings extends Component {

  state = {
    user: {},
    title: "",
    price: "",
    description: "",
    img: "",
    file: null,
    alertTitle: "hide",
    alertPrice: "hide",
    alertImg: "hide",
    toDashboard: false,
    sidebarOpen: true,
    toggleID: " ",
    moveToggler: " ",
    top: "toggle",
    sidebarMobile: "sideBarMobile",
  };

  componentWillMount() {
    this.props.fetchUser();
    this.checkToggle();
  }

  componentDidMount() {
    this.loadCurrentUser();
    this.checkTop();
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

  handleFileInput = event => {
    this.setState({ file: event.target.files });
  };

  loadCurrentUser = () => {
    console.log(this.props.auth)
    API.getCurrentUser()
      .then(result => {
        console.log(this.props.auth),
          this.setState({
            user: result.data
          })
        this.averageStars();

      }

      )
      .catch(err => console.log(err));
  };

  averageStars = () => {
    const artistAverageRating = this.state.user.averageRating;
    for (let i = 1; i <= artistAverageRating; i++) {
      document.getElementById(`averageStar${i}`).classList.add("checked");
    }
  };

  render() {
    // if (this.state.toDashboard === true) {
    //   return <Redirect to={`/artist/${this.state.user._id}`} />;
    // }
    return (
      <div className="userSettingsGrid">
        <Header key="1" />
        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className={this.state.top}>☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} sidebarMobile={this.state.sidebarMobile} />
        </div>

        <div className="userProfile userProfileGrid">
          <br />
          <br />
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
)(UserSettings);
