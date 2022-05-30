/* eslint-disable */

import React, {useState} from 'react';
import SearchAddressModal from './modal/SearchAddressModal';
import DaumPostcode from 'react-daum-postcode';

function Join() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("");
    const [id, setId] = useState("");
    const [gender, setGender] = useState("F");

    const [errorMsgPassword, setErrorMsgPassword] = useState("");
    const [isSearchAddressModalOpen, setSearchAddressModalOpen] = useState(false);

    const [isDaumPost, setIsDaumPost] = useState(false);
    const [zoneCode, setZoneCode] = useState('');
    const [regionAddress, setRegionAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
        if (event.currentTarget.value !== password) 
            setErrorMsgPassword("비밀번호를 확인해주세요.");
        else 
            setErrorMsgPassword("");
        }
    
    const onPhoneHandler = (event) => {
        setPhone(event.currentTarget.value)
    }

    const onGenderHandler = (event) => {
        setGender(event.currentTarget.value)
    }

    const onDetailAddress = (event) => {
        setDetailAddress(event.currentTarget.value)
    }

    const handleAddress = (data) => {
        let AllAddress = data.address;
        let extraAddress = '';
        let zoneCodes = data.zonecode;

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (
                    extraAddress !== ''
                        ? `, ${data.buildingName}`
                        : data.buildingName
                );
            }
            AllAddress += (
                extraAddress !== ''
                    ? ` (${extraAddress})`
                    : ''
            );
        }

        setRegionAddress(AllAddress);
        setZoneCode(zoneCodes);
    }

    const modalStyle = {
        position: "absolute",
        top: "150px",
        left: "500px",
        zIndex: "100",
        border: "1px solid #000000",
        overflow: "hidden",
        width: "500px"
    }

    const openModal = {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const userInfo = {
            id,
            password,
            name,
            phone,
            zoneCode,
            regionAddress,
            detailAddress,
            gender
        }

        var hasEmptyInfo = false;
        for (var i in userInfo) {
            if (!userInfo[i]) {
                hasEmptyInfo = true;
            }
        }

        if (hasEmptyInfo) 
            alert('모든 항목을 다 입력해야 합니다.');
        else {
            createUserFetch(userInfo).then((data) => {
                if (data.success) {
                    console.log('성공!!!!! ');
                    alert(data.msg);
                    window.location.href = '/';
                } else {
                    alert(data.msg);
                }
            });
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

        const response = await fetch(
            'http://localhost:3001/createUser',
            requestOptions
        );
        const data = await response.json();
        return data
    }

    const handleOpenPost = () => {
        setIsDaumPost(!isDaumPost);
    }

    return (
        <div class="w-7/12	mx-auto text-black mb-3">
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
                            onChange={onIdHandler}/>
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
                        <label
                            class="block mr-4 md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="confirm-password">
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
                            placeholder="***********"/> {
                            errorMsgPassword !== ""
                                ? (<div class="text-red-600">{errorMsgPassword}</div>)
                                : null

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
                        <div className='mb-2'>
                            <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200  w-32 float-left py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                                id="address"
                                type="text"
                                placeholder='우편번호'
                                value={zoneCode}
                                onChange={handleOpenPost}/>
                            <button
                                className="w-20 inline-flex float-left border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                type="button"
                                onClick={() => {
                                    handleOpenPost()
                                }}>주소찾기</button>
                        </div>

                        <input
                            className="mb-1 mt-1 bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                            id="address"
                            type="text"
                            placeholder='지역주소'
                            value={regionAddress}
                            onChange={handleOpenPost}/>
                        <input
                            class="bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                            id="address"
                            type="text"
                            placeholder='세부주소'
                            value={detailAddress}
                            onChange={onDetailAddress}/>
                    </div>
                    <div class="md:w-1/3 break-all ml-3"></div>

                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label
                            class="block mr-4 md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-password">
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
                <div class="md:flex md:items-center justify-center">
                    <div >
                        <button
                            class="w-52 shadow bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                            onClick={onSubmit}
                            type="submit">
                            SIGN UP!
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
            {
                isDaumPost
                    ? <div className='openModal'>
                            <DaumPostcode
                                onComplete={handleAddress}
                                autoClose="autoClose"
                                style={modalStyle}
                                isDaumPost={isDaumPost}/>
                        </div>
                    : null
            }
        </div>
    );
};

export default Join;