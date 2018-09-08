import React from "react";
import {Carousel} from 'react-bootstrap'
const HomeArt = props =>(
   
    <div className="carousel">
        <Carousel>
        <Carousel.Item>
            <img width={900} height={400} alt="900x500" src={props.firstImage} />
            <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img width={900} height={400} alt="900x500" src={props.secondImage}/>
        </Carousel.Item>

        </Carousel>;
    </div>

)

export default HomeArt