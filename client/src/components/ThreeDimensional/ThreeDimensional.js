import React from "react";
import "./ThreeDimensional.css";
import Item from "./Item.js";

import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images,
      active: this.props.active,
      direction: ""
    };
    this.rightClick = this.moveRight.bind(this);
    this.leftClick = this.moveLeft.bind(this);
  }

  generateItems() {
    let images = [];
    let level;
    console.log(this.state.active);
    for (let i = this.state.active - 2; i < this.state.active + 3; i++) {
      let index = i;
      if (i < 0) {
        index = this.state.images.length + i;
      } else if (i >= this.state.images.length) {
        index = i % this.state.images.length;
      }
      level = this.state.active - i;
      images.push(
        <Item key={index} id={this.state.images[index]} level={level} />
      );
    }
    return images;
  }

  moveLeft() {
    let newActive = this.state.active;
    newActive--;
    this.setState({
      active: newActive < 0 ? this.state.images.length - 1 : newActive,
      direction: "left"
    });
  }

  moveRight() {
    let newActive = this.state.active;
    this.setState({
      active: (newActive + 1) % this.state.images.length,
      direction: "right"
    });
  }

  render() {
    return (
      <div id="carousel" className="noselect">
        <div className="arrow arrow-left" onClick={this.leftClick}>
          <i className="fi-arrow-left" />
        </div>
        <ReactCSSTransitionGroup transitionName={this.state.direction}>
          {this.generateItems()}
        </ReactCSSTransitionGroup>
        <div className="arrow arrow-right" onClick={this.rightClick}>
          <i className="fi-arrow-right" />
        </div>
      </div>
    );
  }
}

export default Carousel;
