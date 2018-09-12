import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import { Row, Col } from "../../components/Grid";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card";
import "./MostVisited.css";

import ArtistListItem from "../../components/List/ArtistList";
import ArtistUnorderedList from "../../components/List/ArtistUL";
import { Link } from "react-router-dom";

class MostVisited extends Component {
    state = {
        products: [],
        user: {},
        users: [],
        userRatings: [],
        productDataObjects: [],
        productObjects: [],        
        lastPostComplete: false,

        id: 0, 
        image: '', 
        price: 0, 
        productName:'',
        artistEmail:'',
        artistName:'',
        artistID:'',
        description:'',
        currentUserEmail:'',
        targetStripe:'',
        platformFee:0,
        productID:0,
        sold:false,
        quantity:0,
      };
    
      componentDidMount() {
        this.props.fetchUser();
        this.loadCurrentUser();
        
      }
    
      userRatings = () => {
        const users = this.state.users;
    
        for (let i = 0; i < users.length; i++) {
        //   console.log("*****USER****", users[i].firstName);
          let pushedRatings = [];
          let userRatingsArray = users[i].rating;
    
          for (let i = 0; i < userRatingsArray.length; i++) {
            let rating = userRatingsArray[i];
            let convertRating = parseInt(rating);
            pushedRatings.push(convertRating);
            // console.log("rating", rating);
          }
    
          let average = pushedRatings.reduce((a, b) => a + b, 0) / pushedRatings.length;
    
          let averageRounded = average.toFixed(1);
          let parsed = parseInt(averageRounded);
          console.log('parsed', parsed)
    
          if(!parsed){
            // (console.log('parsed test'))
            parsed=5
            this.setState()
          }
    
          const averageRatingObject = {
            averageRating: parsed
          };
    
          const currentUser = users[i];
        //   console.log("currentUser", currentUser);
        //   console.log("averageRatingObject", averageRatingObject);
    
          API.averageRating(currentUser._id, averageRatingObject)
            .then(console.log("success"))
            .catch(err => console.log(err));

          this.loadUsersLastPost();
            
        }
      };
    
      loadUsers = () => {
        console.log("test");
        API.getPopularUsers()
          .then(res => {
            console.log(this.state);
            this.setState({ users: res.data });
            this.userRatings();
          })
          .catch(err => console.log(err));
      };

      loadUsersLastPost = () => {
          if(!this.state.lastPostComplete){
            const users = this.state.users
            for (let i = 0; i < users.length; i++) {
                const userProducts = users[i].product
                for (let i = 0; i < userProducts.length; i++) {
                    const product = userProducts[userProducts.length-1]
                    // console.log('product', product)
                    let productsArray = this.state.products
                    productsArray.push(product)
                    this.setState({ products: productsArray });
                    // console.log('***state of products***', this.state.products)
                }
            }
            this.setState({ lastPostComplete: true })
            this.removeDuplicates()
        }       
      }

      removeDuplicates = () => {
        let unique_array = []
        let productsArray = this.state.products        
        for(let i = 0;i < productsArray.length; i++){
            if(unique_array.indexOf(productsArray[i]) == -1){
                unique_array.push(productsArray[i])
            }
        }
        this.setState({ products: unique_array}) 
        this.loadUsersProducts();
    }

    loadUsersProducts = () => {
        const productIDs = this.state.products;
        // const productObjectsArray = [];
        for (let i = 0; i < productIDs.length; i++) {
        API.getProduct(productIDs[i])
            .then(result => {
            this.setState({ productDataObjects: this.state.productDataObjects.concat(result.data)});
            //   this.finalizeProducts()
            this.consolelog()
            
            })
            .catch(err => console.log(err));
        }
      };
    
    finalizeProducts = () => {
        let productDataObjects = this.state.productDataObjects
        for (let i = 0; i < productDataObjects.length; i++) {
            this.setState({ productDataObjects: this.state.productObjects.concat(this.state.productObjects[i].data) });
        }
    }

    consolelog = () => {
        this.setState({ done: true })
        console.log( '****PRODUCTS****', this.state.productDataObjects[0].productName)
    }
    
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
              this.loadUsers();
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

      renderCard(product, i) {
          console.log('i', product)
        //   const parsedProduct = parseInt(product)
            API.getProduct(product)
            .then(result =>{
                console.log('result', result.data)
                this.setState({ id: i, 
                    image: result.data.img, 
                    price: result.data.price, 
                    productName:result.data.productName,
                    artistEmail:result.data.email,
                    artistName:result.data.artistName,
                    artistID:result.data.associatedID,
                    description:result.data.description,
                    currentUserEmail:this.state.user.email,
                    targetStripe:result.data.stripeAccount,
                    platformFee:result.data.platformFee,
                    productID:result.data._id,
                    sold:result.data.sold,
                    quantity:result.data.quantity,
                })
            })
      }
    
      render() {
        return (
          <div className="artistsGrid">
            {console.log("users ratings state: ************", this.state.productDataObjects[0])}
            {this.state.user.admin ? (
              <AdminHeader className="header" />
            ) : (
              <Header key="1" className="header" />
            )}
            <SideBar user={this.state.user} />
            <ArtistUnorderedList className="main">
            {this.state.users.map((user, i) => {
                  console.log("map", i);                  
                  return(
                <ArtistListItem className="nameList" key={i}>
                  <Link to={`/artist/${user._id}`} className="artistNames">
                    {`${user.firstName} ${!user.averageRating ? 5 : user.averageRating}`}
                  </Link>
                  {/* <div>
                    {this.renderCard(user.product[user.product.length-1], i)}
                    <Card
                        key={i}
                        id={i}
                        image={this.state.img}
                        price={this.state.price}
                        productName={this.state.productName}
                        artistEmail={this.state.email}
                        artistName={this.state.artistName}
                        artistID={this.state.associatedID}
                        description={this.state.description}
                        currentUserEmail={this.state.user.email}
                        targetStripe={this.state.stripeAccount}
                        platformFee={this.state.platformFee} 
                        productID={this.state._id}
                        sold={this.state.sold}
                        quantity={this.state.quantity}
                        // enlargeImage={this.enlargeImage}
                        // shrinkImage={this.shrinkImage}
                    />
                  </div> */}

                      <Card
                        key={i}
                        id={i}
                        image={this.state.productDataObjects[i].img}
                        price={this.state.productDataObjects[i].price}
                        productName={this.state.productDataObjects[i].productName}
                        artistEmail={this.state.productDataObjects[i].aristEmail}
                        artistName={this.state.productDataObjects[i].artistName}
                        artistID={this.state.productDataObjects[i].artistID}
                        description={this.state.productDataObjects[i].description}
                        currentUserEmail={this.state.user.email}
                        targetStripe={this.state.productDataObjects[i].targetStripe}
                        platformFee={this.state.productDataObjects[i].platformFee} 
                        productID={this.state.productDataObjects[i].productID}
                        sold={this.state.productDataObjects[i].sold}
                        quantity={this.state.productDataObjects[i].quantity}
                        // enlargeImage={this.enlargeImage}
                        // shrinkImage={this.shrinkImage}
                    />
                </ArtistListItem>
              )})} 

            </ArtistUnorderedList>
          </div>
        );
      }
}

export default connect(
  null,
  actions
)(MostVisited);