import React from "react";
import { Carousel } from "react-bootstrap";
import "./HomeArt.css";

import { Link } from "react-router-dom";

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
          <h3>{props.firstProductName}</h3>
          <p>{props.firstArtistName}</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="carouselImage"
          alt={props.secondImage}
          src={props.secondImage}
        />
        <Carousel.Caption>
          <h3>{props.secondProductName}</h3>
          <p>{props.secondArtistName}</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="carouselImage"
          alt={props.thirdImage}
          src={props.thirdImage}
        />
        <Carousel.Caption>
          <h3>{props.thirdProductName}</h3>
          <p>{props.thirdArtistName}</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="carouselImage"
          alt={props.fourthImage}
          src={props.fourthImage}
        />
        <Carousel.Caption>
          <h3>{props.fourthProductName}</h3>
          <p>{props.fourthArtistName}</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="carouselImage"
          alt={props.fifthImage}
          src={props.fifthImage}
        />
        <Carousel.Caption>
          <h3>{props.fifthProductName}</h3>
          <p>{props.fifthArtistName}</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="carouselImage"
          alt={props.sixthImage}
          src={props.sixthImage}
        />
        <Carousel.Caption>
          <h3>{props.sixthProductName}</h3>
          <p>{props.sixthArtistName}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    ;
  </div>
);

export default HomeArt;
