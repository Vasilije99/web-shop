import React from 'react'
import { Link } from 'react-router-dom'
import './cart.css'

const Cart = ({ cart, onRemoveCart, onUpdateCart, onEmptyCart }) => {
    const EmptyCart = () => {
        return (
            <div className="emptyCart">
                <h2>You have not items in your shopping cart!</h2>
                <Link to='/'>Back to Home</Link>
            </div>
        )
    }

    const FilledCart = () => {
        return (
            <div className="filledCart">
                <h1 className='filledCart-header'>Your shopping cart:</h1>
                <div className="first-cart-section">
                    <h3>Subtotal: {cart.subtotal.formatted_with_code}</h3>
                    <div className="buttons">
                        <button onClick={() => onEmptyCart()}>EMPTY CART</button>
                        <Link to='/checkout'><button>CHECKOUT</button></Link>
                    </div>
                </div>
                <div className="cart-items">
                    {cart.line_items.map((item) => {
                        return (
                            <div className="cart-item" key={item.id} >
                                <img src={item.image.url} alt='cart-item' className='cart-item-img' />
                                <div className="content">
                                    <h3>{item.name}</h3>
                                    {item.price.formatted_with_code}
                                </div>
                                <div className="quantity-section">
                                    <span className="minus" onClick={() => onUpdateCart(item.id, item.quantity - 1)}>
                                        -
                                    </span>
                                    <span className="quantity">{item.quantity}</span>
                                    <span className="plus" onClick={() => onUpdateCart(item.id, item.quantity + 1)}>
                                        +
                                    </span>
                                </div>
                                <button className="remove" onClick={() => onRemoveCart(item.id)}>REMOVE</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div>
            {cart.line_items.length === 0 ? <EmptyCart /> : <FilledCart />}
        </div>
    )
}

export default Cart
