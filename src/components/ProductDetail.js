import {render} from "react-dom";
import {useLocation, useHistory, withRouter} from "react-router-dom";
import React, {useState} from 'react'
import Modal from './Modal';

function ProductDetailPage() {
    const location = useLocation();
    // const { productInfo } = location.state; console.log('location.state: ',
    // location.state); const productImg = props.productImg;
    const data = location.state.productInfo;
    console.log('data: ', data);

    const [quantity, setQuantity] = useState(1);
    const [isCartModalOpen, setCartModalOpen] = useState(false);

    const history = useHistory();

    const handleCount = (type) => {
        var count = quantity;
        if (type === 'minus') {
            if (quantity != 0) 
                count--;
            }
        else {
            count++;
        }
        setQuantity(count);
    }

    const decrement = () => {
        console.log('감소');
        console.log('quantity: ', quantity);

        setQuantity(--quantity);
        console.log(quantity);
        // const btn = e     .target     .parentNode     .parentElement
        // .querySelector('button[data-action="decrement"]'); const target =
        // btn.nextElementSibling; let value = Number(target.value); value--;
        // target.value = value;
    }

    const increment = (e) => {
        console.log('증가');
        // const btn = e     .target     .parentNode     .parentElement
        // .querySelector('button[data-action="decrement"]'); const target =
        // btn.nextElementSibling; let value = Number(target.value); value++;
        // target.value = value;
    }

    // const decrementButtons = document.querySelectorAll(
    // `button[data-action="decrement"]` ); const incrementButtons =
    // document.querySelectorAll(     `button[data-action="increment"]` );
    // decrementButtons.forEach(btn => {     console.log('감소!');
    // btn.addEventListener("click", decrement); }); incrementButtons.forEach(btn =>
    // {     btn.addEventListener("click", increment); });

    const handleOpenCartModal = () => {
        console.log('창 닫기');
        setCartModalOpen(!isCartModalOpen);
        // history.push({
        //    pathname: '/ShoppingCart',
        //    state: {
        //        productInfo: data
        //    }  
        // });

    }

    return (
        <div>
            <div class="flex font-sans">
                <div class="flex-none w-48 relative">
                    <img
                        src={data.imgUrl}
                        alt=""
                        class="absolute inset-0 w-full h-full object-cover"/>
                </div>

                <form class="flex-auto p-6">
                    <div class="flex flex-wrap">
                        <h1 class="flex-auto text-lg font-semibold text-slate-900">
                            {data.productName}
                        </h1>
                        <div class="text-lg font-semibold text-slate-500">
                            {data.productPrice}
                        </div>
                        {/* <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                            In stock
                        </div> */
                        }
                    </div>
                    <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                        <div class="space-x-2 flex text-sm">
                            <label>
                                <input
                                    class="sr-only peer"
                                    name="size"
                                    type="radio"
                                    value="xs"
                                    checked="checked"/>
                                <div
                                    class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                    XS
                                </div>
                            </label>
                            <label>
                                <input class="sr-only peer" name="size" type="radio" value="s"/>
                                <div
                                    class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                    S
                                </div>
                            </label>
                            <label>
                                <input class="sr-only peer" name="size" type="radio" value="m"/>
                                <div
                                    class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                    M
                                </div>
                            </label>
                            <label>
                                <input class="sr-only peer" name="size" type="radio" value="l"/>
                                <div
                                    class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                    L
                                </div>
                            </label>
                            <label>
                                <input class="sr-only peer" name="size" type="radio" value="xl"/>
                                <div
                                    class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                    XL
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* counter22 */}
                    <div class="flex flex-row border h-10 w-24 mb-3 border-gray-300 relative">
                        <button
                            onClick={() => handleCount('minus')}
                            type="button"
                            class="font-semibold border-r border-gray-300 h-full w-20 flex rounded-l focus:outline-none cursor-pointer">
                            <span class="m-auto">-</span>
                        </button>
                        {/* input number로 할시, 문제가 아주 많다 */}
                        <input
                            type="hidden"
                            class="md:p-2 w-10 p-1 text-xs md:text-base border-gray-300 focus:outline-none text-center"
                            value={quantity}
                            name="custom-input-number"/>
                        <div
                            class="bg-white w-24 text-xs md:text-base flex items-center justify-center cursor-default">
                            <span>{quantity}</span>
                        </div>

                        <button
                            onClick={() => handleCount('plus')}
                            type="button"
                            class="font-semibold border-l border-gray-300 h-full w-20 flex rounded-r focus:outline-none cursor-pointer">
                            <span class="m-auto">+</span>
                        </button>
                    </div>

                    <div class="flex space-x-4 mb-6 text-sm font-medium">
                        <div class="flex-auto flex space-x-4">
                            <button
                                class="h-10 px-6 font-semibold bg-black text-white"
                                type="submit">
                                Buy now
                            </button>
                            <button
                                onClick={handleOpenCartModal}
                                class="h-10 px-6 font-semibold border border-slate-200 text-slate-900"
                                type="button">
                                Add to cart
                            </button>
                        </div>
                        <button
                            class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
                            type="button"
                            aria-label="Like">
                            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                            </svg>
                        </button>
                    </div>
                    <p class="text-sm text-slate-700">
                        Free shipping on all continental US orders.
                    </p>
                </form>
            </div>

            {
                isCartModalOpen && (
                    <div>
                        <Modal productInfo={data} close={handleOpenCartModal}/>
                    </div>
                )
            }
        </div>
    )
}

export default ProductDetailPage;