import React, {useState} from 'react';

function Login() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordError, setPasswordError] = useState('');

    const doSaveLoginInfo = (event) => {
        if (event.target.id === 'id') 
            setId(event.target.value);
        else if (event.target.id === 'password') 
            setPassword(event.target.value);
            //     console.log('id다'); this.setState({id: event.target.value});
        }
    
    const clickLogin = () => {
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
            .then((res) => {
                console.log(res);
                // this.setState({text: json.text});
            });
    }

    // const handleSubmit = (event) => {     event.preventDefault(); }

    return (
        <div class="w-full max-w-xs mx-auto">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="id">
                        Username
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="id"
                        type="text"
                        onChange={doSaveLoginInfo}
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
                        onChange={doSaveLoginInfo}
                        placeholder="******************"/>
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div class="flex items-center justify-center">
                    <button
                        class="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={clickLogin}
                        type="button">
                        Sign In
                    </button>
                    <a
                        class="inline-block align-baseline font-bold text-sm text-black hover:text-blue-800 ml-5"
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


export default Login;