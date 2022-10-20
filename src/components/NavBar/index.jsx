import React from 'react';
import {Link} from 'react-router-dom';

import './styles.css';
import CartWidget from '../CartWidget';

const NavBar = () => {
    return (
        <div>
            <ul>
                <li><Link to="/" className='logo'>Raazor PC</Link></li>
                <li><Link to="/category/Accesorios de PC">Accesorios de PC</Link></li>
                <li><Link to="/category/Componentes de PC">Componentes de PC</Link></li>
                <li><Link to="/category/Almacenamiento">Almacenamiento</Link></li>
                <li><Link to="/category/Notebooks">Notebooks</Link></li>
                <li><Link to="/category/PC armada">PC armada</Link></li>
                <div className='cart-widget'>
                <Link to="/cart"><CartWidget /></Link>
                </div>
            </ul>
        </div>
    )
}

export default NavBar;