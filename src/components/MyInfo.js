import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import '../styles/Table.css'
import {useHistory, useLocation, withRouter} from 'react-router-dom';

const MyInfo = () => {
    const loginStatus = useSelector((state) => state);
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        setUserInfo(loginStatus.currentUser.user);
    }, []);

  return (
    <div className='flex'>
        <div className='container'>
        <div className='text-2xl font-bold mb-2 float-left'>내 정보</div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <th>이름</th>
                        <td>
                            <input 
                            className='focus:bg-white focus:outline-black w-96'
                            value={userInfo.name}
                            // onChange = {(e) => setOrderer(e.target.value)}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td>dd</td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인</th>
                        <td>dd</td>
                    </tr>
                    <tr>
                        <th>휴대폰</th>
                        <td>dd</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>dd</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MyInfo