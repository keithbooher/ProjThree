import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import "./Customize.css";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class Customize extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);

  this.state = {
    amount: 0,
    products: [],
    user: {},
    dropdownBordersOpen: true,
    dropdownOpen: true,
    border: "none",
    color: ""
  };

  }

  toggleBorders() {
    this.setState(prevState => ({
      dropdownBordersOpen: !prevState.dropdownBordersOpen
    }));
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidMount() {
    // this.loadProducts();
    this.props.fetchUser();
    this.loadCurrentUser();
  }

  // loadProducts = () => {
  //     API.getProducts()
  //         .then(res => this.setState({ products: res.data }))
  //         .catch(err => console.log(err));
  // };

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

  handleBorderInput = event => {
    this.setState({
      dropdownBorderOpen: !this.state.dropdownBorderOpen,
      value: event.target.innerText
    });  
    console.log(event.target.innerText)
  }

  handleTextColorInput = event => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });  
    console.log(event.target.innerText)
  }
  

  handleStyleSubmit = event => {
    event.preventDefault();
    console.log("well, this is good?")
    const currentUser = this.state.user._id;
    const styleData = {
      border: input.target.value
    }
    API.changeStyle(currentUser, styleData)
      .then(console.log("success"))
      .catch(err => console.log(err));
    console.log(styleData)
    
  }


  render() {
    return (
      <div className="customizeGrid">
        {this.state.user.admin ? (
          <AdminHeader amount={this.state.amount} />
        ) : (
          <Header key="1" amount={this.state.amount} />
        )}
        <SideBar user={this.state.user} />


        <div className="menu">
        <select>
          <option disabled selected value> borders </option>
          <option onClick={this.handleBorderInput} id='dotted' value='dotted' >dotted</option>
          <option onClick={this.handleBorderInput} id='dashed' value='dashed' >dashed</option>
          <option onClick={this.handleBorderInput} id='solid'value='solid'>solid</option>
          <option onClick={this.handleBorderInput} id='none'value='none'>none</option>
        </select>
        <br/>
        <select>
          <option disabled selected value> colors </option>
          <option onClick={this.handleTextColorInput} id='blue' value='blue' >blue</option>
          <option onClick={this.handleTextColorInput} id='red' value='red' >red</option>
          <option onClick={this.handleTextColorInput} id='green'value='green'>green</option>
        </select>
        <br/>
        <button onClick={handleStyleSubmit}>Submit</button>
          {/* <h2>Choose a Style</h2>
          <button onClick={this.handleStyleSubmit} >dashed</button> */}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Customize);