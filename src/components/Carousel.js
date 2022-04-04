import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import '../styles/Carousel.css';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

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
        



    )
}

export default Carousel;