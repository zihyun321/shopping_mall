import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import '../styles/Carousel.css';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';


const imgStyle = {
    // width: "640px", height: "600px"
}

const Container = styled.div `
    width: 300vw;
    transition: transform 0.5s;
`;
    // transform: translate(-100vw);


const InnerContainer = styled.div `
    width: 100vw;
    float: left;
`;

function Carousel(props) {
    const dataSlider = props.dataSlider;

    const [current, setCurrent] = useState(0);
    const slideLength = dataSlider.length;

    const moveSlide = (direction) => {
        if (direction === 'prev') setCurrent(current === 0 ? slideLength - 1 : current - 1);
        else setCurrent(current === slideLength - 1 ? 0 : current + 1);
    }

    if (!Array.isArray(dataSlider) || dataSlider.lengh <= 0) {
        return null;
    }

    return (
        <div>
            <div className='container-slider'>
            <LeftOutlined className='left-arrow' onClick={() => moveSlide('prev')}/>
            <RightOutlined className='right-arrow' onClick={() => moveSlide('next')}/>

            {
                dataSlider && 
                dataSlider.map((data, index) => {
                    return (
                        <div className={index === current ? 'slide active' : 'slide'} key={index}>
                            {
                                index === current &&
                                <img className='img' src={data.imgUrl} alt="slide img"/>
                            }
                        </div>
                    )
                })
            }
            </div>
        </div>
        


        // <div class="overflow-hidden">
        //     <Container>
        //         <InnerContainer>
        //             <img src="image/carousel1.jpg"/>
        //         </InnerContainer>
        //         <InnerContainer>
        //             <img src="image/carousel2.jpg"/>
        //         </InnerContainer>
        //         <InnerContainer>
        //             <img src="image/carousel3.jpg"/>
        //         </InnerContainer>
        //     </Container>
        //     <button
        //         class="shadow ml-3 bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
        //     >1</button>
        //     <button
        //         class="shadow border hover:bg-slate-200 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4"
        //     >2</button>
        //     <button
        //         class="shadow ml-3 bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
        //     >3</button>

        // </div>
    )
}

export default Carousel;