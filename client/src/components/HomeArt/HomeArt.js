import React from "react";
import { Carousel } from "react-bootstrap";
import "./HomeArt.css";
const HomeArt = props => (
  <div className="carousel">
    <Carousel>
      <Carousel.Item>
        <img
          className="carouselImage"
          alt={props.firstImage}
          src={props.firstImage}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="carouselImage"
          alt={props.secondImage}
          src={props.secondImage}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carouselImage"
          alt={props.thirdImage}
          src={props.thirdImage}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    ;
  </div>
);

export default HomeArt;
