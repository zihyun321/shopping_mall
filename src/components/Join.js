import React, {useState} from 'react';
import styled from "styled-components";

// const dbErrorMsg = styled.div` `;

function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");
    const [gender, setGender] = useState("F");

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        console.log('event.currentTarget.value: ', event.currentTarget.value);
        setName(event.currentTarget.value)
    }
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onPhoneHandler = (event) => {
        setPhone(event.currentTarget.value)
    }

    const onAddressHandler = (event) => {
        setAddress(event.currentTarget.value)
    }

    const onGenderHandler = (event) => {
        setGender(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        console.log('password: ', password);
        console.log('confirmPassword: ', confirmPassword);

        event.preventDefault()
        if (password !== confirmPassword) {
            return alert('비밀번호와 비밀번호확인은 같아야 합니다.')
        }

        const userInfo = {
            id,
            password,
            name,
            phone,
            address,
            gender
        }

        console.log('userInfo: ', userInfo);

        fetch("http://localhost:3001/userJoin", {
            method: "post", //통신방법
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then((res) => res.json())
            .then((json) => {
                console.log('json: ', json);
                // this.setState({text: json.text});
            });
    }

    const checkDup = (id) => {
        console.log('=== checkDup ===');
        console.log('=== id: ', id);

    }

    return (
        <div class="loginregister w-full max-w-lg mx-auto text-black">

            <p class="pb-4 text-xl font-weight: 800;">
                Sign UP
            </p>
            <form>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block md:text-right mb-1 md:mb-0 pr-4" for="id">
                            아이디
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <input
                            required="required"
                            class="bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                            id="id"
                            type="text"
                            value={id}
                            onChange={onIdHandler}/> {/* <button onClick={(id) => checkDup(id)}>중복확인</button> */}
                    </div>
                    <div class="md:w-1/3 break-all ml-3"></div>
                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block md:text-right mb-1 md:mb-0 pr-4" for="password">
                            비밀번호
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <input
                            class="bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                            id="password"
                            type="password"
                            value={password}
                            onChange={onPasswordHandler}
                            placeholder="***********"/>
                    </div>
                    <div class="md:w-1/3 break-all ml-3"></div>
                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block md:text-right mb-1 md:mb-0 pr-4" for="confirm-password">
                            비밀번호확인
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <input
                            class="bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={onConfirmPasswordHandler}
                            placeholder="***********"/>
                    </div>
                    <div class="md:w-1/3 break-all ml-3"></div>

                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block md:text-right mb-1 md:mb-0 pr-4" for="name">
                            이름
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <input
                            class="bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                            id="name"
                            placeholder="ex) 홍길동"
                            value={name}
                            onChange={onNameHandler}/>
                    </div>
                    <div class="md:w-1/3 break-all ml-3"></div>

                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block md:text-right mb-1 md:mb-0 pr-4" for="phone">
                            핸드폰
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <input
                            class="bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                            id="phone"
                            type="text"
                            value={phone}
                            onChange={onPhoneHandler}
                            placeholder="010-0000-0000"/>
                    </div>
                    <div class="md:w-1/3 break-all ml-3"></div>

                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block md:text-right mb-1 md:mb-0 pr-4" for="address">
                            주소
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <input
                            class="bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                            id="address"
                            type="text"
                            value={address}
                            onChange={onAddressHandler}/>
                    </div>
                    <div class="md:w-1/3 break-all ml-3"></div>

                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                            성별
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <div>
                            <div class="flex place-content-evenly">
                                <div class="form-check">
                                    <input
                                        class="form-check-input rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                        type="radio"
                                        name="female"
                                        value="F"
                                        checked={gender === 'F'}
                                        onChange={onGenderHandler}
                                        id="female"/>
                                    <label class="form-check-label inline-block" for="female">
                                        여자
                                    </label>

                                </div>

                                <div class="form-check">
                                    <input
                                        class="form-check-input rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                        type="radio"
                                        value="M"
                                        name="male"
                                        checked={gender === 'M'}
                                        onChange={onGenderHandler}
                                        id="male"/>
                                    <label class="form-check-label inline-block" for="male">
                                        남자
                                    </label>

                                </div>

                            </div>
                            {/* <div class="md:w-1/3 break-all ml-3"></div> */}

                            {/* <input
                                type="radio"
                                id="female"
                                name="female"
                                value="F"
                                checked={gender === 'F'}
                                onChange={onGenderHandler}/>
                            <label for="female">여자</label>
                            <input
                                type="radio"
                                id="male"
                                name="male"
                                value="M"
                                checked={gender === 'M'}
                                onChange={onGenderHandler}/>
                            <label for="male">남자</label> */
                            }
                        </div>

                    </div>
                    <div class="md:w-1/3 break-all ml-3"></div>

                </div>
                {/* <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3"></div>
                    <label class="md:w-2/3 block text-gray-500 font-bold">
                        <input class="mr-2 leading-tight" type="checkbox"/>
                        <span class="text-sm">
                            Send me your newsletter!
                        </span>
                    </label>
                </div> */
                }
                <div class="md:flex md:items-center justify-center">
                    {/* <div class="md:w-1/3"></div> */}
                    <div >
                        <button
                            class="shadow bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                            type="submit">
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;