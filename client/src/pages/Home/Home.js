import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import MissionStatement from "../../components/MissionStatement/missionStatement";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import SideBarMobile from "../../components/Sidebar/SidebarMobile";
import HomeArt from "../../components/HomeArt/HomeArt";
// import HomeArtLag from "../../components/HomeArt/HomeArtLag";
import Footer from "../../components/Footer/Footer";

// import { Carousel } from '3d-react-carousal';

import "./Home.css";
import "./Mediaqueries.css";

class App extends Component {

  state = {
    amount: 0,
    carousel: [],
    carouselImageURLs: [],
    carouselImageProduct: [],
    carouselImageArtist: [],
    carouselArtistIDs: [],
    sidebarOpen: true,
    toggleID: " ",
    moveToggler: " ",
    user: {}
  };

  componentWillMount() {
    this.checkToggle();
  }

  componentDidMount() {
    // this.loadProducts();
    this.props.fetchUser();
    this.loadCarouselProducts();
  }

  checkToggle = () => {
    if (this.state.sidebarOpen) {
      this.setState({ sidebarOpen: false, toggleID: "close", moveToggler: "moveTogglerClose" })
    } else {
      this.setState({ sidebarOpen: true, toggleID: " ", moveToggler: " " })
    }
  }

  loadCarouselProducts = () => {
    API.getCarouselProduct()
      .then(res => {
        this.setState({ carousel: res.data });
        this.getURLS();
      })
      .catch(err => console.log(err));
  };

  getURLS = () => {
    const carouselObjects = this.state.carousel;
    for (let i = 0; i < carouselObjects.length; i++) {
      this.setState({
        carouselImageURLs: this.state.carouselImageURLs.concat(
          carouselObjects[i].img
        )
      });
    }

    this.getProducts();

    this.loadCurrentUser();
  };

  getProducts = () => {
    const carouselObjects = this.state.carousel;

    for (let i = 0; i < carouselObjects.length; i++) {
      this.setState({
        carouselImageProduct: this.state.carouselImageProduct.concat(
          carouselObjects[i].productName
        )
      });
    }
    this.getArtists();
  };

  getArtists = () => {
    const carouselObjects = this.state.carousel;

    for (let i = 0; i < carouselObjects.length; i++) {
      this.setState({
        carouselImageArtist: this.state.carouselImageArtist.concat(
          carouselObjects[i].artistName
        )
      });
    }
    this.getArtistIDs();
  };

  getArtistIDs = () => {
    const carouselObjects = this.state.carousel;

    for (let i = 0; i < carouselObjects.length; i++) {
      this.setState({
        carouselArtistIDs: this.state.carouselArtistIDs.concat(
          carouselObjects[i].associatedID
        )
      });
    }

    console.log(this.props.auth)

  };


  loadCurrentUser = () => {
    this.setState({
      isLoaded: true,
      user: this.props.auth
    });
  };

  toggle = () => {
    if (this.state.sidebarOpen) {
      this.setState({ sidebarOpen: false, toggleID: "close", moveToggler: "moveTogglerClose" })
    } else {
      this.setState({ sidebarOpen: true, toggleID: " ", moveToggler: " " })
    }
  }

  render() {
    return (
      <div className="homeGrid">

        <Header key="1" />

        {this.state.carouselArtistIDs ? (

          <HomeArt
            imagePlaceholder={this.state.imagePlaceholder}
            firstImage={this.state.carouselImageURLs[0]}
            secondImage={this.state.carouselImageURLs[1]}
            thirdImage={this.state.carouselImageURLs[2]}
            fourthImage={this.state.carouselImageURLs[3]}
            fifthImage={this.state.carouselImageURLs[4]}
            sixthImage={this.state.carouselImageURLs[5]}
            ///////////////////////////////////////////////
            firstProductName={this.state.carouselImageProduct[0]}
            secondProductName={this.state.carouselImageProduct[1]}
            thirdProductName={this.state.carouselImageProduct[2]}
            fourthProductName={this.state.carouselImageProduct[3]}
            fifthProductName={this.state.carouselImageProduct[4]}
            sixthProductName={this.state.carouselImageProduct[5]}
            ///////////////////////////////////////////////
            firstArtistName={this.state.carouselImageArtist[0]}
            secondArtistName={this.state.carouselImageArtist[1]}
            thirdArtistName={this.state.carouselImageArtist[2]}
            fourthArtistName={this.state.carouselImageArtist[3]}
            fifthArtistName={this.state.carouselImageArtist[4]}
            sixthArtistName={this.state.carouselImageArtist[5]}
            ///////////////////////////////////////////////
            firstArtistIDs={this.state.carouselArtistIDs[0]}
            secondArtistIDs={this.state.carouselArtistIDs[1]}
            thirdArtistIDs={this.state.carouselArtistIDs[2]}
            fourthArtistIDs={this.state.carouselArtistIDs[3]}
            fifthArtistIDs={this.state.carouselArtistIDs[4]}
            sixthArtistIDs={this.state.carouselArtistIDs[5]}
          />

        ) : (
            ""
          )}
        <MissionStatement />
        <Footer />
        <SideBar user={this.state.user} />
        <div className="sidebarContainer" id={this.state.toggleID}>
          <div onClick={this.toggle} id={this.state.moveToggler} className="toggle">☰</div>
          <SideBarMobile user={this.state.user} id={this.state.toggleID} />
        </div>

      </div >
    );
  }
}

// telling this component if we are logged in or not and what to show occordingly
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(App);
