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
  changeUser: function(productData) {
    return axios.put("/api/current_user", id);
  },
  // Gets current user
  getUser: function() {
    return axios.get("/api/current_user");
  },
}; 