import axios from "axios";

export default {

  getCurrentUser: function () {
    return axios.get('/api/current_user');
  },
  // Gets all books
  getProducts: function () {
    return axios.get("/api/product");
  },
  // Gets the book with the given id
  getProduct: function (id) {
    return axios.get("/api/product/" + id);
  },
  // Gets the book with the given id
  getCarouselProduct: function (id) {
    return axios.get("/api/carousel/");
  },
  // Deletes the book with the given id
  deleteProduct: function (id) {
    console.log("id", id);
    return axios.delete("/api/product/" + id);
  },
  // Saves a book to the database
  saveProduct: function (id, productData) {
    return axios.post("/api/product/" + id, productData);
  },
  saveImage: function (imageData, type) {
    return axios.post("/api/uploadImage", imageData, type);
  },
  updateQuantity: function (id, quantity) {
    return axios.put("/api/updatequantity/" + id, quantity);
  },
  updateSold: function (id) {
    return axios.put("/api/updatesold/" + id);
  },
  updateSoldTrue: function (id) {
    return axios.put("/api/updatesoldtrue/" + id);
  },

  setStyle: function (id) {
    return axios.post("/api/styleSet/" + id, "dashed");
  },
  // change user styles
  changeStyle: function (id, styleData) {
    return axios.put("/api/style/" + id, styleData);
  },
  getStyle: function (id) {
    return axios.get("/api/style/" + id);
  },
  // change a user to admin
  changetoAdmin: function (_id, stripe) {
    return axios.put("/api/user/" + _id, stripe);
  },
  // Gets current user
  getUser: function () {
    return axios.get("/api/user");
  },
  // Gets current user
  getPopularUsers: function () {
    return axios.get("/api/user/popular");
  },
  getUserById: function (id) {
    return axios.get("/api/user/" + id);
  },
  // Gets current user
  createUser: function (stuff) {
    return axios.post("/api/user", stuff);
  },
  deleteUsersProduct: function (userID, productID) {
    return axios.put("/api/user/product/" + userID, productID);
  },
  saveProfilePic: function (userID, img) {
    return axios.put("/api/user/pic/" + userID, img);
  },
  saveDescription: function (userID, desc) {
    return axios.put("/api/user/description/" + userID, desc);
  },
  addRating: function (userID, rating) {
    return axios.put("/api/user/rating/" + userID, rating);
  },
  averageRating: function (userID, average) {
    return axios.put("/api/user/averageRating/" + userID, average);
  },
  updatePageViews: function (userID, plusOne) {
    return axios.put("/api/user/pageview/" + userID, plusOne);
  },
  followArtist: function (userID, follow) {
    return axios.put("/api/user/follow/" + userID, follow);
  },
  // artistsFollowed: function(userID, follow) {
  //   return axios.put("/api/user/following/" + userID, follow);
  // },

  contactUsForm: function (data) {
    return axios.post("/api/contactus", data);
  }
};
