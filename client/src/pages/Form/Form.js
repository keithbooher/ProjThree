import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";

import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';

class Form extends Component{

  state = {
    productName: "",
    price: "",
    link: ""
  }

//  Function to handle form input
handleInputChange = event => {
  let { name, value } = event.target;
  console.log(value)
  this.setState({[name] : value})
};

onChange = (e) => {
  switch (e.target.name) {
    case 'selectedFile':
      this.setState({ selectedFile: e.target.files[0] });
      break;
    default:
      this.setState({ [e.target.name]: e.target.value });
  }
}

//  Function to handle form submit
handleFormSubmit = event => {
  event.preventDefault();
  console.log(this.state)
  let { productName, price, link } = this.state;
  let query = { productName, price, link }
  console.log(query);
  API.saveProduct(query);
}
 

render() {
  return (
        <div size="sm-10 offset-'sm-1">
          <form>
            {}
            <div className="form-group">
              <label htmlFor="productName">Title of work: </label>
                <input value={this.state.productName} onChange={this.handleInputChange} type="text" className="form-control" id="productName" name="productName"  placeholder="Please enter a Title for your work"/>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input value={this.state.price} onChange={this.handleInputChange} type="integer" className="form-control" id="price" name="price" placeholder="Please set a price for your work"/>
              </div>
              <div className="form-group">
                <label htmlFor="link">Lint to image</label>
                <input value={this.state.link} onChange={this.handleInputChange} type="integer" className="form-control" id="link" name="link" placeholder="Please provide a link to your work"/>
                <small>If you need a link for your work we recommend hosting it on imgur.</small>
              </div>
             <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
          </form>
        </div> 
  );
};
}

export default Form;