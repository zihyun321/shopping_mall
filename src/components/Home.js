import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

const imgStyle = {
    // width: "640px",
    // height: "600px"
}

function Home(props) {
    return (
        <div class="w-screen">
            
            <div class="float-left">
                <img src="image/carousel1.jpg"/>
            </div>
            <div class="float-left">
                <img src="image/carousel2.jpg"/>
            </div>
            <div class="float-left">
                <img src="image/carousel3.jpg"/>
            </div>


            {/* <div
                id="carouselExampleSlidesOnly"
                class="carousel slide"
                data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="image/acc6.jpg" class="d-block w-100" alt="..." style={imgStyle}/>
                    </div>
                </div>
            </div> */}
        </div>
    )
}


export default Home;