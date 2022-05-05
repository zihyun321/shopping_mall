/* eslint-disable */

import React, {useState} from 'react';
import SearchAddressModal from './modal/SearchAddressModal';

function Join() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");
    const [gender, setGender] = useState("F");
    
    const [errorMsgPassword, setErrorMsgPassword] = useState("");
    const [isSearchAddressModalOpen, setSearchAddressModalOpen] = useState(false);

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
        
        if (event.currentTarget.value !== password) setErrorMsgPassword("비밀번호를 확인해주세요.");
        else setErrorMsgPassword("");
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

    const handleOpenSearchModal = () => {
        setSearchAddressModalOpen(!isSearchAddressModalOpen);
    }


    // 원래꺼
    const onSubmit = (event) => {
        event.preventDefault();        

        const userInfo = {
            id,
            password,
            name,
            phone,
            address,
            gender
        }

        // TODO 해당 처리 고민하기.. 해당 필드들 필수값 지정하는거... null 값 이렇게 하는게 맞나?
        var hasEmptyInfo = false;
        for (var i in userInfo) {
            if (!userInfo[i]) {
                hasEmptyInfo = true;                
            }
        }

        if (hasEmptyInfo) alert('모든 항목을 다 입력해야 합니다.');
        else {

            createUserFetch(userInfo).then(
                (data) => {
                    if (data.success) {
                        console.log('성공!!!!! ');
                        alert(data.msg);
                        window.location.href = '/';                                
                    } else {
                        alert(data.msg);
                    }
                } 
            );


            // const result = createUserFetch(userInfo);
            // console.log('=== result: ', result);
            // if (result.success) {
            //     console.log('성공!!!!! ');

            //     alert(result.msg);
            //     window.location.href = '/';
            // } else {
            //     alert(result.msg);
            // }


            // fetch("http://localhost:3001/createUser", {
            //     method: "post", //통신방법
            //     headers: {
            //         "content-type": "application/json"
            //     },
            //     body: JSON.stringify(userInfo)
            // })
            //     .then((res) => res.json())
            //     .then((res) => {
            //         if (res.success) {
            //             alert(res.msg);
            //             window.location.href = '/';
            //         } else {
            //             alert(res.msg);
            //         }
            //         // this.setState({text: json.text});
            //     });
            }

    }

    async function createUserFetch(userInfo) {
        const requestOptions = {
            method: "post", //통신방법
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userInfo)
        };

        const response = await fetch('http://localhost:3001/createUser', requestOptions);
        const data = await response.json();
        console.log('response: ', response);
        console.log('data: ', data);

        return data
    }
    
     
    /**
     * Todo
     * - 비밀번호 해시값 처리해서 저장하기
     */
    return (
        // <div class="w-full max-w-lg mx-auto text-black">

        <div class="max-w-lg mx-auto text-black">
            <form>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block mr-4 md:text-right mb-1 md:mb-0 pr-4" htmlFor="id">
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
                        <label class="block mr-4 md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
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
                        <label class="block mr-4 md:text-right mb-1 md:mb-0 pr-4" htmlFor="confirm-password">
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
                            {
                                errorMsgPassword !== "" ? (
                                    <div class="text-red-600">{errorMsgPassword}</div>) : null
                                    
                            }
                            
                    </div>
                    <div class="md:w-1/3 break-all ml-3"></div>
                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block mr-4 md:text-right mb-1 md:mb-0 pr-4" htmlFor="name">
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
                        <label class="block mr-4 md:text-right mb-1 md:mb-0 pr-4" htmlFor="phone">
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
                        <label class="block mr-4 md:text-right mb-1 md:mb-0 pr-4" htmlFor="address">
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
                        <button
                        className="border-gray-300 w-20 flex focus:outline-none cursor-pointer bg-slate-200 hover:bg-slate-300 "
                        type="button"
                        onClick={() => {
                            handleOpenSearchModal()
                        }}>주소찾기</button>

                    </div>
                    <div class="md:w-1/3 break-all ml-3"></div>

                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block mr-4 md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
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
                                    <label class="form-check-label inline-block" htmlFor="female">
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
                                    <label class="form-check-label inline-block" htmlFor="male">
                                        남자
                                    </label>

                                </div>

                            </div>
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
                            onClick={onSubmit}
                            type="submit">
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
            {
                        isSearchAddressModalOpen && (
                            <div>
                                <SearchAddressModal/>
                            </div>
                        )
                    }

        </div>        
    );
};



export default Join;