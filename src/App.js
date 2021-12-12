import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Products from './components/Products/Products'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Details from './components/Details/Details'

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();

        setCart(cart);
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            
            setOrder(incomingOrder);
            refreshCart();
        } catch(error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    return (
        <BrowserRouter>
            <Navbar totalItems={cart.total_items} />
            <div>
                <Routes>
                    <Route path='/' element={<Products
                        products={products}
                        onAddToCart={handleAddToCart}
                    />} />
                    <Route path='/cart' element={<Cart
                        cart={cart}
                        onRemoveCart={handleRemoveFromCart}
                        onUpdateCart={handleUpdateCartQty}
                        onEmptyCart={handleEmptyCart}
                    />} />
                    <Route path='/checkout' element={<Checkout
                        cart={cart}
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}
                    />} />
                    <Route path='/details/:id' element={<Details />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
