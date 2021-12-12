import React from 'react'
import './products.css'

import Product from './Product/Product'

const Products = ({ products, onAddToCart }) => {
    const renderedContent = products.map((item) => {
        return (
            <Product 
                product={item} 
                onAddToCart={onAddToCart} 
                key={item.id} 
            />
        )
    })

    return (
        <div className='products'>
            {renderedContent}
        </div>
    )
}

export default Products
