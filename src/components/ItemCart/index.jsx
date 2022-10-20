import React from 'react'
import { useContext } from 'react';

import './styles.css';
import { Shop } from '../../context/CartContext';

const ItemCart = ({product}) => {

  const {removeItem} = useContext(Shop);

  return (
    <div>
      <div className="checkout-items-end">
        <div className="cart-product">
          <p>{product.price * product.quantity}€</p>
          <p>Subtotal</p>
        </div>
        <div className="cart-product">
          <p>{product.quantity}</p>
          <p>Cantidad</p>
        </div>
        <button className="remove-button" onClick={()=> removeItem(product)}>X</button>
      </div>
      <div className="checkout-items">
        <img  width="100px" height="100px" src={product.image} alt=""/>
        <div className="cart-product">
          <p>{product.title}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemCart;