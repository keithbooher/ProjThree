import axios from "axios";

export default {
  // Gets all books
  getProducts: function() {
    return axios.get("/api/product");
  },
  // Gets the book with the given id
  getProduct: function(id) {
    return axios.get("/api/product/" + id);
  },
  // Deletes the book with the given id
  deleteProduct: function(id) {
    console.log("id", id);
    return axios.delete("/api/product/" + id);
  },
  // Saves a book to the database
  saveProduct: function(id, productData) {
    return axios.post("/api/product/" + id, productData);
  },
  saveImage: function(imageData, type) {
    return axios.post("/api/uploadImage", imageData, type);
  },

  // change a user to admin
  changetoAdmin: function(_id, stripe) {
    return axios.put("/api/user/" + _id, stripe);
  },
  // Gets current user
  getUser: function() {
    return axios.get("/api/user");
  },
  getUserById: function(id) {
    return axios.get("/api/user/" + id);
  },
  // Gets current user
  createUser: function(stuff) {
    return axios.post("/api/user", stuff);
  },
  deleteUsersProduct: function(userID, productID) {
    return axios.put("/api/user/product/" + userID, productID);
  },

  contactUsForm: function(data){
    return axios.post("/api/contactus", data);
  }
};
