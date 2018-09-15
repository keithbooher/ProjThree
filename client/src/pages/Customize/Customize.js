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
    dropdownBordersOpen: false,
    dropdownOpen: false
    
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
  

  handleStyleSubmit = input => {
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

        <div className="stuff">
        {/* <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Borders
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" onClick={this.handleStyleInput('dotted')} id='dotted' value='dotted' href="#">dotted</a>
            <a className="dropdown-item" onClick={this.handleStyleInput('dashed')} id='dashed' value='dashed' href="#">dashed action</a>
            <a className="dropdown-item" onClick={this.handleStyleInput('solid')} id='solid'value='solid' href="#">Something else here</a>
          </div>
        </div> */}

        <select>
          <option onClick={this.handleBorderInput} id='dotted' value='dotted' >dotted</option>
          <option onClick={this.handleBorderInput} id='dashed' value='dashed' >dashed</option>
          <option onClick={this.handleBorderInput} id='solid'value='solid'>solid</option>
        </select>

        <select>
          <option onClick={this.handleTextColorInput} id='blue' value='blue' >blue</option>
          <option onClick={this.handleTextColorInput} id='red' value='red' >red</option>
          <option onClick={this.handleTextColorInput} id='green'value='green'>green</option>
        </select>

        
          <Dropdown isOpen={this.state.dropdownBorderOpen} toggle={this.toggleBorders}>
            <DropdownToggle caret>
              Borders
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.handleBorderInput} id='dotted' value='dotted' >dotted</DropdownItem>
              <DropdownItem onClick={this.handleBorderInput} id='dashed' value='dashed' >dashed</DropdownItem>
              <DropdownItem onClick={this.handleBorderInput} id='solid'value='solid'>solid</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Text Color
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.handleTextColorInput} id='blue' value='blue' >blue</DropdownItem>
              <DropdownItem onClick={this.handleTextColorInput} id='red' value='red' >red</DropdownItem>
              <DropdownItem onClick={this.handleTextColorInput} id='green'value='green'>green</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <select>
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>

        </div>

        <div className="menu">
          <h2>Choose a Style</h2>
          <button onClick={this.handleStyleSubmit} >dashed</button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Customize);