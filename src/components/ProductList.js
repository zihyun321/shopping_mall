import {width} from "@mui/system";
import React, {useEffect, useState} from "react";
import styled from "styled-components";

// const Img = styled.img`     width: 15rem,     height: 20rem `;

const imgStyle = {
    width: "15rem",
    height: "20rem"
}

function ProductList(props) {

    const [testData, setTestData] = useState([]);

    const testProps = () => {
        console.log('prop: ', props.category);
    }

    // useEffect 뒤에 ,[] 붙이면 한번만 실행된다.
    useEffect(() => fetch("http://localhost:3001/getProduct", {
        method: "POST", //통신방법
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify()
    }).then((res) => res.json()).then((json) => {
        console.log('json: ', json);
        json.map(data => setTestData(json))
        // , tempData.push(data));
        console.log('testData: ', testData);
        // console.log('testData: ', testData);
    }), []);

    return (
        <div>
            <ul class="inline-grid grid-cols-3 gap-4">
                <div>{props.category}</div>
                <div>
                <button
                            class="shadow bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                            onClick={testProps}
                            type="submit">
                            test
                        </button>

                </div>
            {
                        testData.map(data => {
                            return (
                                <div key={data.id}>
                                    <img src={data.imgUrl} class="d-block w-100" alt="..." style={imgStyle}/>
                                </div>
                                
                            )
                        })
                    }
                <li>
                    <img src="image/acc1.jpg" style={imgStyle}/>
                </li>
                <li>
                    <img src="image/acc1.jpg" style={imgStyle}/>
                </li>
                <li>
                    <img src="image/acc1.jpg" style={imgStyle}/>
                </li>
            </ul>

            <ul
                class="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
                <li x-for="project in projects">
                    {/* <a :href="project.url"
                    class="hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm"> */
                    }
                    <dl class="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                        <div>
                            <dt class="sr-only">Title</dt>
                            <dd class="group-hover:text-white font-semibold text-slate-900">
                                product title
                            </dd>
                        </div>
                        <div>
                            <dt class="sr-only">Category</dt>
                            <dd class="group-hover:text-blue-200">product category</dd>
                        </div>
                        <div class="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-0 xl:mt-4">
                            <dt class="sr-only">Users</dt>
                            <dd
                                x-for="user in project.users"
                                class="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">
                                <img
                                    src="image/acc6.jpg"
                                    class="w-6 h-6 rounded-full bg-slate-100 ring-2 ring-white"
                                    loading="lazy"/></dd>
                        </div>
                    </dl>
                    {/* </a> */}
                </li>
                <li class="flex">
                    <a
                        href="/new"
                        class="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
                        <svg
                            class="group-hover:text-blue-500 mb-1 text-slate-400"
                            width="20"
                            height="20"
                            fill="currentColor"
                            aria-hidden="true">
                            <path
                                d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z"/>
                        </svg>
                        New project
                    </a>
                </li>
            </ul>
            {/* <span class="inline-grid grid-cols-3 gap-4">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
                <span>06</span>
            </span> */
            }
        </div>
    )
}

export default ProductList