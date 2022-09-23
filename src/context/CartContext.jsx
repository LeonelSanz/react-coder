import React, { useState } from 'react';
import { createContext } from 'react';

export const Shop = createContext();

const CartContext = ({children}) => {

    const [cart, setCart] = useState([])

    const addItem = (item) => {
        
        const repeatProduct = isInCart(item.id);

        if (repeatProduct) {

            const cartModified = cart.map(product => {
                if (product.id === item.id) {
                    product.quantity += item.quantity
                    return product;
                }
                return product;
            });

            setCart(cartModified);

        } else {
            const cartModificado = [...cart, item];
            setCart(cartModificado);
        }
    }

    const isInCart = (id) => {
        return cart.some(product => product.id === id);
    }

    const removeItem = (id) => {
        const removedCart = cart.filter(product => product.id !== id);
        setCart(removedCart);
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        <Shop.Provider value={{cart, addItem, removeItem, clearCart}}>
            {children}
        </Shop.Provider>
    )
}

export default CartContext