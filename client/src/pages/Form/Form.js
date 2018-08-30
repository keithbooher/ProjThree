import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";

import Header from '../../components/Navs/Header';
import AdminHeader from '../../components/Navs/AdminHeader';

class Form extends Component{

  state = {
    title: "",
    price: "",
    img: ""
  }

//  Function to handle form input
handleInputChange = event => {
  let { name, value } = event.target;
  console.log(value)
  this.setState({[name] : value})
};

//  Function to handle form submit
handleFormSubmit = event => {
  event.preventDefault();
  console.log(this.state)
  let { title, price, img } = this.state;
  let query = { title, price, img }
  console.log(query);
}
 

render() {
  return (
        <div size="sm-10 offset-'sm-1">
          <form>
            {}
            <div className="form-group">
              <label htmlFor="title">Title of work: </label>
                <input value={this.state.title} onChange={this.handleInputChange} type="text" className="form-control" id="title" name="title"  placeholder="Please enter a Title for your work"/>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input value={this.state.price} onChange={this.handleInputChange} type="integer" className="form-control" id="price" name="price" placeholder="Please set a price for your work"/>
              </div>
              <div className="form-group">
              <label htmlFor="img">Example file input</label>
                <input value={this.state.img} onChange={this.handleInputChange} type="file" className="form-control-file" id="img" name="img"/>
            </div>
             <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
          </form>
        </div> 
  );
};
}

export default Form;