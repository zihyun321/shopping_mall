import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {
    UserOutlined,
    LoginOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    ShoppingFilled
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {useSelector} from 'react-redux';
import {useHistory, withRouter} from 'react-router-dom';

const headerMenu = styled.div `
    font: large;
`;

const menu = {
    fontSize: '18px'
};

const headerStyle = {
    fontSize: '27px'
};


const handleClickCart = () => {

}




function LoggedinHeader() {
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    
    const handleClickLogout = () => {
        window.location.href = '/';
    }
    
    const handleClickProfile = () => {
        console.log('click Profile');
        setProfileModalOpen(!isProfileModalOpen);
    }


    return (
        <div>
            <div
                class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div class="ml-3 relative">
                    <div>
                        <button type="button" class="mt-1 p-1" onClick={handleClickLogout}>
                            <LogoutOutlined/>
                            <p class="text-xs mb-1">Logout</p>
                        </button>
                    </div>
                </div>
                <div class="ml-3 relative">
                    <div>
                        <button type="button" class="mt-1 p-1" onClick={handleClickProfile}>
                            <UserOutlined/>
                            <p class="text-xs mb-1">My</p>
                        </button>
                    </div>
                </div>
                <div class="ml-3 relative">
                    <div>
                        <button type="button" class="mt-1 p-1" onClick={handleClickCart}>
                            <ShoppingCartOutlined/>
                            <p class="text-xs mb-1">Cart</p>
                        </button>
                    </div>
                </div>
            </div>
            {
                isProfileModalOpen
                    ? (
                        // Dropdown menu, show/hide based on menu state.

                        //         Entering: "transition ease-out duration-100"
                        //         From: "transform opacity-0 scale-95"
                        //         To: "transform opacity-100 scale-100"
                        //         Leaving: "transition ease-in duration-75"
                        //         From: "transform opacity-100 scale-100"
                        //         To: "transform opacity-0 scale-95"
                        <div>
                            <div
                                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                                tabindex="-1">
                                {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                                <a
                                    href="#"
                                    class="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    tabindex="-1"
                                    id="user-menu-item-0">Your Profile</a>
                                <a
                                    href="#"
                                    class="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    tabindex="-1"
                                    id="user-menu-item-1">Settings</a>
                                <a
                                    href="#"
                                    class="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    tabindex="-1"
                                    id="user-menu-item-2">Sign out</a>
                            </div>
                        </div>
                    )
                    : null
            }
        </div>
    )
}

function LoggedOutHeader() {

    function handleClickLogin() {
        window.location.href = '/login';
    }
    
    function handleClickJoin() {
        window.location.href = '/join';
    }


    
    return (
        <div>
            <div
                class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div class="ml-3 relative">
                    <div>
                        <button type="button" class="mt-1 p-1" onClick={handleClickJoin}>
                            <UserOutlined/>
                            <p class="text-xs mb-1">Join</p>
                        </button>
                    </div>
                </div>
                <div class="ml-3 relative">
                    <div>
                        <button type="button" class="mt-1 p-1" onClick={handleClickLogin}>
                            <LoginOutlined/>
                            <p class="text-xs mb-1">Login</p>
                        </button>
                    </div>
                </div>
                <div class="ml-3 relative">
                    <div>
                        <button type="button" class="mt-1 p-1" onClick={handleClickCart}>
                            <ShoppingCartOutlined/>
                            <p class="text-xs mb-1">Cart</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

function Header() {

    const [userInfo, setUserInfo] = useState({});
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const clickProfile = () => {
        console.log('click Profile');
        setProfileModalOpen(!isProfileModalOpen);
    }
    const loginStatus = useSelector((state) => state);

    useEffect(() => {
        setIsUserLogin(loginStatus.currentUser.login);
        setUserInfo(loginStatus.currentUser.user);
    }, [loginStatus])

    /**
     * - React Hook을 사용할 경우 => 메서드명 맨앞 글자가 대문자
     * - React Custom Hook을 사용할 경우 => 메서드명 맨앞에 use 붙이기
     */
    const useHandleClickHome = () => {
        const history = useHistory();
        history.push('/');
    }

    return (
        <div class="font-[BebasNeue] text-xl">
            <nav>
                <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div class="relative flex items-center justify-between h-16">
                        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* <!-- Mobile menu button--> */}
                            <button
                                type="button"
                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                {/* <!--
                                Icon when menu is closed.

                                Heroicon name: outline/menu

                                Menu open: "hidden", Menu closed: "block"
                            --> */
                                }
                                {/* <svg
                                        class="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg> */
                                }
                                {/* <!--
                                Icon when menu is open.

                                Heroicon name: outline/x

                                Menu open: "block", Menu closed: "hidden"
                            --> */
                                }
                                <svg
                                    class="hidden h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div
                            class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div class="flex-shrink-0 flex items-center">
                                <p class="my-0	cursor-pointer" onClick={useHandleClickHome} style={headerStyle}>Shopping Mall</p>
                            </div>
                        </div>

                        {
                            isUserLogin
                                ? <LoggedinHeader/>
                                : <LoggedOutHeader/>
                        }


                    </div>
                </div>

                {/* <!-- Mobile menu, show/hide based on menu state. --> */}
                {/* <div class="sm:hidden" id="mobile-menu">
                    <div class="px-2 pt-2 pb-3 space-y-1" style={menu}>
                        <a
                            href="#"
                            class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                            aria-current="page">Dashboard</a>

                        <a
                            href="#"
                            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

                        <a
                            href="#"
                            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

                        <a
                            href="#"
                            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                    </div>
                </div> */
                }
            </nav>

            <nav class="bg-black">
                <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div class="relative flex items-center justify-between h-16">
                        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* <!-- Mobile menu button--> */}
                            <button
                                type="button"
                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                {/* <!--
                                Icon when menu is closed.

                                Heroicon name: outline/menu

                                Menu open: "hidden", Menu closed: "block"
                            --> */
                                }
                                <svg
                                    class="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                                {/* <!--
                                Icon when menu is open.

                                Heroicon name: outline/x

                                Menu open: "block", Menu closed: "hidden"
                            --> */
                                }
                                <svg
                                    class="hidden h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>

                        <div
                            class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-around">
                            <div class="hidden sm:block sm:ml-6">
                                <div class="flex space-x-4">
                                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                                    <a
                                        href="/ProductList/Outer"
                                        style={menu}
                                        class="text-white hover:text-teal-100 px-3 py-2 rounded-md text-sm font-medium"
                                        aria-current="page">Outer</a>
                                    <a
                                        href="/ProductList/Top"
                                        style={menu}
                                        class="text-white hover:text-teal-100 px-3 py-2 rounded-md text-sm font-medium"
                                        aria-current="page">Top</a>

                                    <a
                                        href="/ProductList/Bottom"
                                        style={menu}
                                        class="text-white hover:text-teal-100 px-3 py-2 rounded-md text-sm font-medium">Bottom</a>

                                    <a
                                        href="/ProductList/Shoes"
                                        style={menu}
                                        class="text-white hover:text-teal-100 px-3 py-2 rounded-md text-sm font-medium">Shoes</a>
                                    <a
                                        href="/ProductList/Bag"
                                        style={menu}
                                        class="text-white hover:text-teal-100 px-3 py-2 rounded-md text-sm font-medium">Bag</a>

                                    <a
                                        href="/ProductList/Acc"
                                        style={menu}
                                        class="text-white hover:text-teal-100 px-3 py-2 rounded-md text-sm font-medium">Acc</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </nav>
        </div>
    )
}

export default Header
