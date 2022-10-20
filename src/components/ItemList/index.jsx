import React from 'react';

import './styles.css';
import Item from '../Item';

const ItemList = ({products}) => {

  return (
    <div className='container'>
        {products.map(product => {
            return <Item key={product.id} product={product} />
        })}
    </div>
  )
}

export default ItemList