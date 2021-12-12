import React, { useState, useEffect } from 'react'
import { commerce } from '../../lib/commerce.js'
import './details.css'

const Details = () => {
    const [product, setProduct] = useState(null);
    const id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    const fetchProduct = async () => {
        const product = await commerce.products.retrieve(id);

        setProduct(product);
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    if (!product) {
        return (
            <div>Loading . . .</div>
        )
    }

    return (
        <div className='item'>
            <h2>{product.name}</h2>
            <div className="details">
                <img className='item-img' src={product.image.url} alt="" />
                <div className="item-content">
                    <div className="desc" dangerouslySetInnerHTML={{ __html: product.description }} />
                    <div className="price">
                        Price: {product.price.formatted_with_code}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
