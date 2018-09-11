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
          <h3>Vincent Van Gogh</h3>
          <p>"Starry Night"</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="carouselImage"
          alt={props.secondImage}
          src={props.secondImage}
        />
        <Carousel.Caption>
          <h3>Katsushika Hokusai</h3>
          <p>"The Great Wave off Kanagawa"</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carouselImage"
          alt={props.thirdImage}
          src={props.thirdImage}
        />
        <Carousel.Caption>
          <h3>Pablo Picasso</h3>
          <p>"Kiss"</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    ;
  </div>
);

export default HomeArt;
