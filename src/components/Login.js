import React, { useState } from 'react';

function Login() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        console.log('=== event.target.id: ', event.target.id);
        console.log('=== event.target.value: ', event.target.value);
        if (event.target.id === 'id') setId(event.target.value);
        else if (event.target.id === 'password') setPassword(event.target.value);
        //     console.log('id다');
        // this.setState({id: event.target.value});
    }

    const clickLogin = () => {
        console.log('=== clickLogin === ');
        
        const loginInfo = {
            id,
            password
        }

        fetch("http://localhost:3001/userLogin", {
            method: "post", //통신방법
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        })
            .then((res) => res.json())
            .then((json) => {
                console.log('json: ', json);
                // this.setState({text: json.text});
            });
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    // }

    return (
        <div class="w-full max-w-xs">
            <form
                class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="id">
                        Username
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="id"
                        type="text"
                        onChange={handleChange}
                        placeholder="Username"/>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input
                        class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        onChange={handleChange}
                        placeholder="******************"/>
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={clickLogin}
                        type="button">
                        Sign In
                    </button>
                    <a
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="/join">
                        Join
                    </a>
                </div>
            </form>
            <p class="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )
}

// class Login extends React.Component {     constructor(props) {
// super(props);         this.state = {value : '', id:''};     }
// handleChange(event) {         console.log('=== event.target.id: ',
// event.target.id);         console.log('=== event.target.value: ',
// event.target.value);         if (event.target.id === 'id')
// console.log('id다');         this.setState({id: event.target.value});     }
// handleSubmit(event) {         alert('A name was submitted: ' +
// this.state.value);         event.preventDefault();     }     render() {
// return (             <div class="w-full max-w-xs">                 <form
// class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
// onSubmit={this.handleSubmit}>                     <div class="mb-4">
// <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
// Username                         </label>                         <input
// class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
// leading-tight focus:outline-none focus:shadow-outline"
// id="id"                             type="text"
// onChange={this.handleChange}
// placeholder="Username"/>                     </div>                     <div
// class="mb-6">                         <label class="block text-gray-700
// text-sm font-bold mb-2" for="password">                             Password
// </label>                         <input
// class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3
// text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
// id="password"                             type="password"
// placeholder="******************"/>                         <p
// class="text-red-500 text-xs italic">Please choose a password.</p>
// </div>                     <div class="flex items-center justify-between">
// <button                             class="bg-blue-500 hover:bg-blue-700
// text-white font-bold py-2 px-4 rounded focus:outline-none
// focus:shadow-outline"                             type="button">
// Sign In                         </button>                         <a
// class="inline-block align-baseline font-bold text-sm text-blue-500
// hover:text-blue-800"                             href="#">
// Forgot Password?                         </a>                     </div>
// </form>                 <p class="text-center text-gray-500 text-xs">
// &copy;2020 Acme Corp. All rights reserved.                 </p>
// </div>         )     } }

export default Login;