import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

const imgStyle = {
    // width: "40rem",
    // height: "45rem"
}

function Home(props) {
    return (
        <div>
            <div
                id="carouselExampleSlidesOnly"
                class="carousel slide"
                data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active ">
                        <img src="image/acc6.jpg" class="d-block w-100" alt="..." style={imgStyle}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Home;