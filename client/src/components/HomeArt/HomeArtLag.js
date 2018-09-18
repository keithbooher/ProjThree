import React from "react";
import { Carousel } from "react-bootstrap";
import "./HomeArt.css";

import { Link } from "react-router-dom";

const HomeArt = props => (
    <div className="carouselLag">
        <Carousel>

            <Carousel.Item>
                <img
                    className="carouselImage"
                    alt={props.secondImage}
                    src={props.secondImage}
                />
                <Carousel.Caption>
                    <h3>{props.secondProductName}</h3>
                    <Link to={`/artist/${props.secondArtistIDs}`}>
                        <p>{props.secondArtistName}</p>
                    </Link>
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
                    <Link to={`/artist/${props.thirdArtistIDs}`}>
                        <p>{props.thirdArtistName}</p>
                    </Link>
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
                    <Link to={`/artist/${props.fourthArtistIDs}`}>
                        <p>{props.fourthArtistName}</p>
                    </Link>
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
                    <Link to={`/artist/${props.fifthArtistIDs}`}>
                        <p>{props.fifthArtistName}</p>
                    </Link>
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
                    <Link to={`/artist/${props.sixthArtistIDs}`}>
                        <p>{props.sixthArtistName}</p>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="carouselImage"
                    alt={props.firstImage}
                    src={props.firstImage}
                />
                <Carousel.Caption>
                    <h3>{props.firstProductName}</h3>
                    <Link to={`/artist/${props.firstArtistIDs}`}>
                        <p>{props.firstArtistName}</p>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        ;
  </div>
);

export default HomeArt;
