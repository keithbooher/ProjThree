import axios from "axios";

export default {
  // Gets all books
  getProducts: function() {
    return axios.get("/api/products");
  },
  // Gets the book with the given id
  getProduct: function(id) {
    return axios.get("/api/products/" + id);
  },
  // Deletes the book with the given id
  deleteProduct: function(id) {
    return axios.delete("/api/products/" + id);
  },
  // Saves a book to the database
  saveProduct: function(productData) {
    return axios.post("/api/products", productData);
  },
  // Saves a book to the database
  changeUser: function(_id) {
    return axios.put("/api/current_user/" + _id, true);
  },
  // Gets current user
  getUser: function() {
    return axios.get("/api/current_user");
  },
  // Gets current user
  createUser: function(stuff) {
    console.log("API")
    return axios.post("/api/current_user", stuff);
  },
}; 