import React, {useState} from 'react';

function handleClickLogin(e) {
    window.location.href = '/login';
}

function handleClickJoin(e) {
    window.location.href = '/join';
}

function getProductData() {
    console.log('test');

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
                    <button onClick={getProductData} type="button">test</button>
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

// class Home extends React.Component {     constructor(props) { super(props);
// this.state = {             username: null         }; }
// componentDidMount() {         fetch('http://localhost:3001/api') .then(res =>
// res.json())             .then(data => this.setState({username:
// data.username}));     }     state = {         id: "",         password: "" }
// handleChange = (e) => {         this.setState({ [e.target.name]:
// e.target.value         });     }     handleSubmit = (e) => {
// e.preventDefault();         alert(`변경된 패스워드: ${this.state.id}`);     }
// submitId = () => {     const post = {         test: this.state.testbody };
// fetch("http://localhost:3001/idplz", {         method: "post",  통신방법 headers:
// {             "content-type": "application/json"         }, body:
// JSON.stringify(post)     })         .then((res) => res.json()) .then((json)
// => {             this.setState({testbody: json.text}); }); };     render() {
// const {username} = this.state;         return (             <div> <p>
// <button onClick={handleClickLogin}                         class="bg-blue-500
// hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Login
// </button>                 </p>                 <p> <button
// onClick={handleClickJoin} class="bg-orange-500 hover:bg-orange-700 text-white
// font-bold py-2 px-4 rounded">                         Join
// </button> </p>                 {/* Test1 */}                 <div> <form
// onSubmit={this.handleSubmit}>                         <input name="id"
// value={this.state.id} onChange={this.handleChange}
// class="bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4
// rounded"/> <button type="submit">Submit</button> <h1>{this.state.id}</h1>
// </form>                 </div> {/* Test2 */}                 <form ref="form"
// onSubmit={this.handleSubmit}> <button type="submit">Do the thing</button>
// </form> {/* <div>                     <form onSubmit={handleCreate}> <input
// type="text" name="input1" onChange={handleChange} value={input1}/> <input
// type="text" name="input2" onChange={handleChange} value={input2}/> <button
// type="submit">추가</button>                     </form> </div>
// <div>                     <ul> {                             list.map(item =>
// { return (                                     <li key={item.num}>
// {item.input1}                                         / {item.input2} <button
// onClick={() => handleRemove(item.num)}>X</button> </li>
// );                             }) }                     </ul>
// </div> */} <header className="App-header">                     ========== 테스트
// { username                             ? `Hello ${username}` : 'Hello World'
// }                 </header> <h1 className="text-3xl font-bold underline">
// Hello world!                 </h1>                 <div class="w-72 bg-white
// shadow rounded">                     w-72                 </div>
// <h1 className="text-3xl font-bold underline">                     Hello
// world! </h1>                 <div class="chat-notification-content"> <h4
// class="chat-notification-title">ChitChat</h4>                     <p
// class="chat-notification-message">You have a new message!</p> </div>
// </div>         )     } }

export default Home;