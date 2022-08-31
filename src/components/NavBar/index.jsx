import React from 'react';
import './styles.css';

const NavBar = () => {
    return (
        <div>
            <ul>
                <li><a href="#home" className='logo'>Ecommerce</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </div>
    )
}

export default NavBar;