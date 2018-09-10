import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import { Row, Col } from "../../components/Grid";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";

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
    // console.log(this.state)
    if (!this.state.title.trim()) {
      console.log("yo mane");
      this.setState({ alertTitle: "show" });
    } else if (!this.state.price.trim()) {
      console.log("yo mane");
      this.setState({ alertPrice: "show" });
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

          const NewProfilePic = {
            img: this.state.img,
          };

          API.saveProfilePic(this.state.user._id, NewProfilePic)
            .then(
              console.log("success"),
              this.setState({
                file: null,
              })
            )
            .catch(err => console.log(err));
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

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
          API.createUser(currentUser)
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
      <div>
        {this.state.user.admin ? <AdminHeader /> : <Header key="1" />}
        <Row>
          <Col size="sm-3 offset-'sm-11">
            <SideBar user={this.state.user} />
          </Col>
          <Col size="sm-9 offset-'sm-1">
            <form className="postForm">
              {/* User Profile Pic */}
              <div className="form-group">
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
                className="btn btn-primary submitBtn"
                onClick={this.handleFormSubmit}
              >
                Submit
              </button>
            </form>
            <div className={this.state.alertImg}>
              <h3>Please show me</h3>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(UserSettings);