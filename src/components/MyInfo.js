import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import '../styles/Table.css'
import {useHistory, useLocation, withRouter} from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';

const MyInfo = () => {
    const loginStatus = useSelector((state) => state);
    const [userInfo, setUserInfo] = useState({});

    const [isDaumPost, setIsDaumPost] = useState(false);
    const [zoneCode, setZoneCode] = useState(userInfo.zoneCode);
    const [regionAddress, setRegionAddress] = useState(userInfo.regionAddress);
    const [detailAddress, setDetailAddress] = useState(userInfo.detailAddress);

    const [phone, setPhone] = useState(userInfo.phone);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMsgPassword, setErrorMsgPassword] = useState("");

    useEffect(() => {
        console.log('loginStatus.currentUser.user: ', loginStatus.currentUser.user);
        setUserInfo(loginStatus.currentUser.user);
    }, []);

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

    const clickChangeInfo = () => {
        
    }

    const handleOpenPost = () => {
        console.log('=== handleOpenPost ===');
        setIsDaumPost(!isDaumPost);
    }

    const onDetailAddress = (event) => {
        setDetailAddress(event.currentTarget.value)
    }

    const handleAddress = (data) => {
        console.log('=== handleAddress ===');
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

        console.log('AllAddress: ', AllAddress);
        console.log('zoneCodes: ', zoneCodes);
        setRegionAddress(AllAddress);
        setZoneCode(zoneCodes);
    }

    const modalStyle = {
        position: "absolute",
        top: "30%",
        left: "30%",
        zIndex: "100",
        border: "1px solid #000000",
        overflow: "hidden",
        width: "500px"
    }

    const handleChangeUserInfo = () => {
        const changedInfo = {
            zoneCode: zoneCode,
            regionAddress: regionAddress,
            detailAddress: detailAddress,
            phone: phone,
            password: password
        }

        changeUserInfo(changedInfo).then((data) => {
            if (data.success) {
                alert('정상적으로 변경되었습니다.');
            } else {}
        })
    }

    async function changeUserInfo(changedInfo) {
        const requestOptions = {
            method: "post", //통신방법
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(changedInfo)
        };

        const response = await fetch(
            'http://localhost:3001/createUser',
            requestOptions
        );
        const data = await response.json();
        console.log('response: ', response);
        console.log('data: ', data);

        return data
    }

    return (
        <div className='flex'>
            <div className='container'>
                <div className='text-2xl font-bold mb-2 float-left'>내 정보</div>
                <br/>

                <table className='user-info'>
                    <tbody>
                        <tr>
                            <th>아이디</th>
                            <td className='text-left'>
                                {userInfo.id}
                            </td>
                        </tr>

                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input
                                    class="bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={onPasswordHandler}
                                    placeholder="***********"/>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인</th>
                            <td>
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
                            </td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td className='text-left'>
                                {userInfo.name}
                                {/* <input
                            className='focus:bg-white focus:outline-black w-96'
                            value={userInfo.name}
                            // onChange = {(e) => setOrderer(e.target.value)}
                            ></input> */
                                }
                            </td>
                        </tr>

                        <tr>
                            <th>핸드폰</th>
                            <td>
                                <input
                                    class="bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                                    id="phone"
                                    type="text"
                                    value={phone}
                                    onChange={onPhoneHandler}
                                    placeholder="010-0000-0000"/>
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <div className='mb-2'>
                                <div className='mb-2'>
                                    <input
                                        class="bg-gray-200 appearance-none border-2 border-gray-200  w-32 float-left py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
                                        id="address"
                                        type="text"
                                        placeholder='우편번호'
                                        value={zoneCode}
                                        onChange={handleOpenPost}/>
                                    <button className="w-20 inline-flex float-left border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        // className="border-gray-300 w-20 float-left ml-3 flex focus:outline-none cursor-pointer bg-slate-200 hover:bg-slate-300 "
                                        type="button" onClick={() => {
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

                        </tr>
                    </tbody>
                </table>
                <div className='mt-3'>
                    <button
                        class="w-52 shadow bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                        onClick={clickChangeInfo}
                        type="button">
                        변경하기
                    </button>
                </div>
            </div>
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

    )
}

export default MyInfo