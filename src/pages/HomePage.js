import React from 'react';
import Home from '../components/Home';
import Carousel from '../components/Carousel';

const data = {
    slider: [
        {
            imgUrl: 'image/carousel1.jpg'    
        },
        {
            imgUrl: 'image/carousel2.jpg'    
        },
        {
            imgUrl: 'image/carousel3.jpg'    
        },
    ]
};

export default function HomePage() {
    return(
        <div>
            <Carousel dataSlider={data.slider}/>
        </div>
    )
}