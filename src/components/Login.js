import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import allActions from "../redux/reducers";


function Login() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordError, setPasswordError] = useState('');
    const [checkPassword, setCheckPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const dispatch = useDispatch();
    const updateUserInfo = (loginInfo) => {
        console.log('dispatch!!');
        console.log('loginInfo: ', loginInfo);
        // dispatch(allActions.userActions.loginUser(loginInfo));
        dispatch({type: 'LOG_IN', user: loginInfo});
    };

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
            method: "POST", //통신방법
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        })
            .then((res) => res.json())
            .then((res) => {
                setErrorMsg('');
                if (res.success) {
                    // TODO 여기에 redux에 user 정보 넣기
                    updateUserInfo(loginInfo);
                    window.location.href = '/';
                } else if (res.errorCode == 'checkPassword' || 'thereIsNoInfo') {
                    setCheckPassword(true);
                    setErrorMsg(res.msg);
                }

                // this.setState({text: json.text});
            })
            .catch((err) => {
                console.error(new Error("로그인중 에러발생"));
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
                    <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 lead" +
                                "ing-tight focus:outline-none focus:shadow-outline" + (
                            checkPassword
                                ? "border-red-500"
                                : "border-green-500"
                        )}
                        // class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" onChange={doSaveLoginInfo} placeholder="******************"/> {
                        checkPassword
                            ? <p class="text-red-500 text-xs italic">{errorMsg}</p>
                            : null
                    }
                </div>
                <div class="flex items-center justify-center">
                    <button
                        class="bg-black hover:text-teal-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={clickLogin}
                        type="button">
                        Sign In
                    </button>
                    <a
                        class="inline-block align-baseline font-bold text-sm text-black hover:text-teal-100 ml-5"
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