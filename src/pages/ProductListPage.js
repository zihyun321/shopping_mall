import React from 'react';
import ProductList from '../components/ProductList';

export default function ProductListPage({match}) {
    let category = match.params.category;

    return (
        <div class='mt-10'>
            <ProductList category={category}/>
        </div>
    )
}