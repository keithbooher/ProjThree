import React from 'react';

const Gallery = props => {
    console.log(props.route)
    return (
        <div style={{  }}> 
            <br/>
            <button className="product" data-price="5" data-name="Five dollar item" data-productID="1" onClick={() => props.clicked()}>click here to add $5 art to your basket</button>
            <br/>
            <br/>
            <button className="product" data-price="10" data-name="Ten dollar item" data-productID="2" onClick={() => props.clicked()}>click here to add $10 art to your basket</button>            
        </div>
    );
};

export default Gallery