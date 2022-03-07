import React, {useEffect, useState} from 'react';

function handleClickLogin(e) {
    window.location.href = '/login';
}

function handleClickJoin(e) {
    window.location.href = '/join';
}





function PasswordUpdate() {
    const [password, setPassword] = useState("");

    const handleChange = ({target: {
            value
        }}) => setPassword(value);

    return (
        <form>
            <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}/>
            <button type="submit">비밀번호 변경</button>
        </form>
    );
}

function nextSlide() {
    let activeSlide = document.querySelector('.slide.translate-x-0');
    activeSlide
        .classList
        .remove('translate-x-0');
    activeSlide
        .classList
        .add('-translate-x-full');

    let nextSlide = activeSlide.nextElementSibling;
    nextSlide
        .classList
        .remove('translate-x-full');
    nextSlide
        .classList
        .add('translate-x-0');
}

function previousSlide() {
    let activeSlide = document.querySelector('.slide.translate-x-0');
    activeSlide
        .classList
        .remove('translate-x-0');
    activeSlide
        .classList
        .add('translate-x-full');

    let previousSlide = activeSlide.previousElementSibling;
    previousSlide
        .classList
        .remove('-translate-x-full');
    previousSlide
        .classList
        .add('translate-x-0');
}

function Home(props) {

    var test = props.name;

    return (
        <div>
            <div
                id="carouselExampleSlidesOnly"
                class="carousel slide"
                data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="image/acc6.jpg" class="d-block w-100" alt="..."/>
                    </div>
                </div>
            </div>


        </div>
    )
}


export default Home;