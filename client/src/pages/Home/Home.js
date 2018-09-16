import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import MissionStatement from "../../components/MissionStatement/missionStatement";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import HomeArt from "../../components/HomeArt/HomeArt";
// import firstImage from "../../assets/images/art1.jpg";
// import secondImage from "../../assets/images/art2.jpg";
// import thirdImage from "../../assets/images/art3.jpg";
import "./Home.css";

class App extends Component {
  state = {
    amount: 0,
    carousel: [],
    carouselImageURLs: [],
    carouselImageProduct: [],
    carouselImageArtist: [],
    user: {}
  };

  componentDidMount() {
    // this.loadProducts();
    this.props.fetchUser();
    this.loadCarouselProducts();
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
      console.log("images", carouselObjects[i].img);
      this.setState({
        carouselImageURLs: this.state.carouselImageURLs.concat(
          carouselObjects[i].img
        )
      });
      console.log("*****LOOK HERE**********", this.state.carouselImageURLs);
    }

    this.getProducts();

    this.loadCurrentUser();
  };

  getProducts = () => {
    const carouselObjects = this.state.carousel;

    for (let i = 0; i < carouselObjects.length; i++) {
      console.log("product Name", carouselObjects[i].productName);
      this.setState({
        carouselImageProduct: this.state.carouselImageProduct.concat(
          carouselObjects[i].productName
        )
      });
      console.log("*****LOOK HERE**********", this.state.carouselImageProduct);
    }
    this.getArtists();
  };

  getArtists = () => {
    const carouselObjects = this.state.carousel;

    for (let i = 0; i < carouselObjects.length; i++) {
      console.log("artist Name", carouselObjects[i].artistName);
      this.setState({
        carouselImageArtist: this.state.carouselImageArtist.concat(
          carouselObjects[i].artistName
        )
      });
      console.log("*****LOOK HERE**********", this.state.carouselImageArtist);
    }
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

  clicked = name => {
    console.log("test");
    console.log("name", name); // trying to return the name of the product name

    const updatedAmount = this.state.amount + 1;
    this.setState({ amount: updatedAmount });
  };

  render() {
    return (
      <div className="homeGrid">
        {this.state.user.admin ? (
          <AdminHeader amount={this.state.amount} />
        ) : (
          <Header key="1" amount={this.state.amount} />
        )}
        {this.state.carouselImageArtist ? (
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
          />
        ) : (
          ""
        )}
        <SideBar user={this.state.user} />
        <MissionStatement />
        {/* <HomeArt
          imagePlaceholder={this.state.imagePlaceholder}
          // firstImage={this.state.carousel[0].img}
          // secondImage={this.state.carousel[1].img}
          // thirdImage={this.state.carousel[2].img}
          // fourthImage={this.state.carousel[3].img}
          // fifthImage={this.state.carousel[4].img}
          // sixthImage={this.state.carousel[5].img}
        /> */}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
