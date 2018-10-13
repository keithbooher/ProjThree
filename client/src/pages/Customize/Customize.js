import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import "./Customize.css";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Footer from "../../components/Footer/Footer";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import "./Mediaqueries.css";

class Customize extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      products: [],
      user: {},
      dropdownBordersOpen: true,
      dropdownOpen: true,
      borderStyle: "dashed",
      borderColor: "blue",
      borderWidth: "1",
      fontColor: "red",
      fontFamily: "Courier",
      sidebarOpen: true,
      toggleID: " ",
      moveToggler: " ",
      top: "toggle",
      sidebarMobile: "sideBarMobile"
    };

  }

  //https://artgutter.s3.amazonaws.com/1537045224351

  componentWillMount() {
    this.checkToggle();
  }

  componentDidMount() {
    // this.loadProducts();
    this.props.fetchUser();
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
      .then(window.location.replace(`/artist/${this.state.user._id}`))
      .catch(err => console.log(err));
    console.log(styleData)

  }

  loadCurrentUser = () => {
    // console.log(this.props.auth)
    API.getCurrentUser()
      .then(result => {
        this.setState({
          user: result.data
        })
      })
      .catch(err => console.log(err));
  };




  render() {

    let styles = {
      border: this.state.borderStyle,
      bordercolor: this.state.borderColor,
      borderwidth: this.state.borderWidth,
      fontColor: this.state.fontColor,
      fontFamily: this.state.fontFamily
    }
    return (
      <div className="customizeGrid">
        <Header key="1" />
        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className={this.state.top}>☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} sidebarMobile={this.state.sidebarMobile} />
        </div>

        <div className="menu">
          <h2 className="customizeTitle">Customize your product cards!</h2>
          <br />
          <h3 className="customizeHeader">Set Border Style</h3>
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
          <h3 className="customizeHeader">Set Border Color</h3>
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
          <h3 className="customizeHeader">Set Border Width</h3>
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
          <h3 className="customizeHeader">Set Text Color</h3>
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
          <h3 className="customizeHeader">Set Text Style</h3>
          <select onChange={this.handleTextStyleInput} value={this.state.fontStyle}>
            <option disabled>Set Text Style</option>
            <option id='Courier' value="Courier New', Courier, monospace">Courier</option>
            <option id='Trebuchet' value="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" >Trebuchet</option>
            <option id='Arial' value="Arial, Helvetica, sans-serif">Arial</option>
            <option id='default' value="'Times New Roman', Times, serif">Default</option>
          </select>
          <br />
          <button className="submitBtn btn btn-info custBtn" onClick={this.handleStyleSubmit}>Submit</button>

          <div className="sampleCard1" style={{ border: styles.border, borderColor: styles.bordercolor, borderWidth: styles.borderwidth, display: 'none' }}>
            <img
              className="card-img-top"
              src='https://artgutter.s3.amazonaws.com/1537045224351'
              alt='artgutter'
            />
            <div className="card-body">
              <h5 className="card-title" style={{ color: styles.fontColor, fontFamily: styles.fontFamily }}>Test</h5>
              <p className="card-text" style={{ color: styles.fontColor, fontFamily: styles.fontFamily }}>
                $---
              </p>
              <p className="card-text description" style={{ color: styles.fontColor, fontFamily: styles.fontFamily }}>Test Description</p>
              <span>
                <button className="checkout btn">Buy</button>
              </span>
            </div>
          </div>

        </div>

        <div className="sampleCard" style={{ border: styles.border, borderColor: styles.bordercolor, borderWidth: styles.borderwidth }}>
          <img
            className="card-img-top"
            src='https://artgutter.s3.amazonaws.com/1537045224351'
            alt='artgutter'
          />
          <div className="card-body">
            <h5 className="card-title" style={{ color: styles.fontColor, fontFamily: styles.fontFamily }}>Test</h5>
            <p className="card-text" style={{ color: styles.fontColor, fontFamily: styles.fontFamily }}>
              $---
              </p>
            <p className="card-text description" style={{ color: styles.fontColor, fontFamily: styles.fontFamily }}>Test Description</p>
            <span>
              <button className="checkout btn">Buy</button>
            </span>
          </div>
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
)(Customize);