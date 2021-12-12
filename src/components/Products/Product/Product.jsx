import React from 'react'
import { Link } from 'react-router-dom'
import './product.css'

const Product = ({ product, onAddToCart }) => {
    return (
        <div className='product'>
            <h2 className='header'>{product.name}</h2>
            <img className='product-img' src={product.image.url} alt="" />
            <div className="purchase">
                {product.price.formatted_with_code}
                <i className="fas fa-cart-plus" onClick={() => onAddToCart(product.id, 1)}></i>
            </div>
            <Link 
                to={`/details/${product.id}`} 
                className='details'
            >
                More Details
            </Link>
        </div>
    )
}

export default Product
