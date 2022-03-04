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

function Home() {

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
                    <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="..."/>
                    </div>
                </div>
            </div>

            <div class="relative">
                <div
                    class="absolute inset-0 w-screen h-screen bg-pink-500 text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-0 slide">Hello</div>
                <div
                    class="absolute inset-0 w-screen h-screen bg-purple-500 text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-full slide">There</div>
                <div
                    class="absolute inset-0 w-screen h-screen bg-teal-500 text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-full slide">Booya!</div>
                <div
                    onclick="nextSlide()"
                    class="fixed bottom-0 right-0 bg-white w-16 h-16 flex items-center justify-center text-black cursor-pointer">&#x276F;</div>
                <div
                    onclick="previousSlide()"
                    class="fixed bottom-0 right-0 bg-white w-16 h-16 mr-16 border-r border-gray-400 flex items-center justify-center text-black cursor-pointer">&#x276E;</div>
            </div>
        </div>
    )
}


export default Home;