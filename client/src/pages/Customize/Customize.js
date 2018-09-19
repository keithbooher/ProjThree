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
    this.state = {
      amount: 0,
      products: [],
      user: {},
      dropdownBordersOpen: true,
      dropdownOpen: true,
      borderStyle: "none",
      borderColor: "blue",
      borderWidth: "",
      fontColor: "red",
      fontFamily: "",
    };

  }

  handleBorderStyleInput = event => {
    this.setState({ borderStyle: event.target.value })
    console.log(event.target.value)
  }

  handleTextColorInput = event => {
    this.setState({ fontColor: event.target.value });
  }

  handleTextStyleInput = event => {
    this.setState({ fontFamily: event.target.value });
  }

  handleBorderWidthInput = event => {
    this.setState({ borderWidth: event.target.value });
  }

  handleBorderColorInput = event => {
    this.setState({ borderColor: event.target.value });
  }

  handleStyleSubmit = event => {
    event.preventDefault();
    console.log("well, this is good?")
    console.log(this.state.border)
    const currentUser = this.state.user._id;
    const styleData = {
      borderStyle: this.state.borderStyle,
      fontColor: this.state.fontColor,
      fontFamily: this.state.fontFamily,
      borderWidth: this.state.borderWidth,
      borderColor: this.state.borderColor
    }
    API.changeStyle(currentUser, styleData)
      .then(console.log("success"))
      .catch(err => console.log(err));
    console.log(styleData)

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
          <select value={this.state.borderStyle} onChange={this.handleBorderStyleInput}>
            <option disabled>Set Border Style</option>
            <option id='dotted' value='dotted' >Dotted</option>
            <option id='dashed' value='dashed' >Dashed</option>
            <option id='solid' value='solid'>Solid</option>
            <option id='none' value='none'>Default</option>
          </select>
          <br />
          <br />
          <br />
          <select onChange={this.handleBorderColorInput} value={this.state.borderColor}>
            <option disabled>Set Border Color</option>
            <option id='blue' value='blue' >Blue</option>
            <option id='red' value='red' >Red</option>
            <option id='green' value='green'>Green</option>
            <option id='green' value='#ffffff'>Default</option>
          </select>
          <br />
          <br />
          <br />
          <select onChange={this.handleBorderWidthInput} value={this.state.borderWidth}>
            <option disabled>Set Border Width</option>
            <option id='blue' value='1px' >1</option>
            <option id='red' value='2px' >2</option>
            <option id='green' value='3px'>3</option>
            <option id='blue' value='4px' >4</option>
            <option id='red' value='5px' >5</option>
            <option id='green' value='0px'>Default</option>
          </select>
          <br />
          <br />
          <br />
          <select onChange={this.handleTextColorInput} value={this.state.fontColor}>
            <option disabled>Set Text Color</option>
            <option id='blue' value='blue' >Blue</option>
            <option id='red' value='red' >Red</option>
            <option id='green' value='green'>Green</option>
            <option id='default' value='#ffffff'>Default</option>
          </select>
          <br />
          <br />
          <br />
          <select onChange={this.handleTextStyleInput} value={this.state.fontStyle}>
            <option disabled>Set Text Style</option>
            <option id='Courier' value="Courier New', Courier, monospace">Courier</option>
            <option id='Trebuchet' value="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" >Trebuchet</option>
            <option id='Arial' value="Arial, Helvetica, sans-serif">Arial</option>
            <option id='default' value="'Times New Roman', Times, serif">Default</option>
          </select>
          <br />
          <button onClick={this.handleStyleSubmit}>Submit</button>
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