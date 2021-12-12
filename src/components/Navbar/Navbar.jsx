import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = ({totalItems}) => {
    return (
        <div className="navbar">
            <span className="logo">
                <Link to='/' className='logo-link'>
                    <img src="../../../assets/logo.png" alt="aaa" className="logo-img" />
                    <p>HOME</p>
                </Link>
            </span>

            <ul className="list">
                <li className="list-item">
                    <Link to='/cart' className='cart'>
                        <i className="fas fa-shopping-cart fa-lg"></i>
                        <span className='counter'>{totalItems}</span>
                    </Link>

                </li>
            </ul>
        </div>
    )
}

export default Navbar
