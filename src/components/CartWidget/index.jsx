import React from 'react';
import { useContext } from 'react';

import './styles.css';
import { Shop } from '../../context/CartContext';

import {HiShoppingCart} from 'react-icons/hi';

const CartWidget = () => {

  const {totalProducts} = useContext(Shop);

  return (
    <div className='shopping-cart'>
        <HiShoppingCart size={30} />
        {totalProducts() !== 0 
        ? <div className="total-products">
          {totalProducts()}
        </div>
        : ""}
    </div>
  )
}

export default CartWidget;