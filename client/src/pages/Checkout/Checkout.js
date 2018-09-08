import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import { Row, Col } from "../../components/Grid";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import Payment from "../../components/Navs/Payments";
import { Form, Input, FormBtn, FormGroup, Label } from "../../components/Form";

class Checkout extends Component {
  state = {
    product: [],
    user: {},
    noResults: false,
    name: "",
    address: "",
    state: "",
    city: "",
    zipcode: ""
  };

  componentWillMount() {
    this.props.fetchUser();
    // this.loadCurrentUser();
    // this.consolelog();
  }

  componentDidMount() {
    this.props.fetchUser();
    // this.loadThisProduct();
    this.loadCurrentUser();
    // this.consolelog();
  }

  loadThisProduct = () => {
    const url = window.location.href;
    const splitURL = url.split("/");
    console.log(splitURL[4]);
    const targetedID = splitURL[4];

    API.getProduct(targetedID)
      .then(result => {
        console.log("RESULT", result.data);
        this.setState({
          product: this.state.product.concat(result.data),
          noResults: false
        });
        // console.log("STATE", this.state.product.length)
        this.consolelog();
      })
      .catch(err => console.log(err));
  };

  consolelog = () => {
    console.log("test", this.state.product[0]);
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

          // console.log('result', result)
          let currentUser = this.state.user;
          API.createUser(currentUser)
            .then(console.log("success"))
            .catch(err => console.log(err));

          // console.log("state", this.state.user)
          this.loadThisProduct();
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

  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let { name, address, state, city, zipcode } = this.state;
    let query = { name, address, state, city, zipcode };
    console.log("test");
  };

  preventDefault = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        {this.state.user.admin ? <AdminHeader /> : <Header key="1" />}
        <Row>
          <Col size="sm-2 offset-'sm-11">
            <SideBar user={this.state.user} />
          </Col>
        </Row>
        <div className="container">
          <Form>
            <FormGroup>
              <Label htmlFor="Name">Name: </Label>
              <Input
                onChange={this.handleInputChange}
                name="Name"
                value={this.state.name}
                placeholder="Name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="Address">Address: </Label>
              <Input
                onChange={this.handleInputChange}
                name="Address"
                value={this.state.address}
                placeholder="Address"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="City">City: </Label>
              <Input
                onChange={this.handleInputChange}
                name="City"
                value={this.state.city}
                placeholder="City"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="State">State: </Label>
              <Input
                onChange={this.handleInputChange}
                name="State"
                value={this.state.state}
                placeholder="State"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="Zipcode">Zipcode: </Label>
              <Input
                onChange={this.handleInputChange}
                name="Zipcode"
                value={this.state.zipcode}
                placeholder="Zipcode"
              />
            </FormGroup>
          </Form>
          {this.state.noResults ? (
            <h1>nope</h1>
          ) : this.state.product.length > 0 ? (
            <Payment
              targetStripe={this.state.product[0].stripeAccount}
              platformFee={this.state.product[0].platformFee}
              price={this.state.product[0].price}
              clicked={this.handleFormSubmit}
            />
          ) : (
            " "
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Checkout);
