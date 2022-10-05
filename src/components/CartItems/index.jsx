import './styles.css';
import React from 'react';
import { useContext } from 'react';
import { Shop } from '../../context/CartContext';
import ordenGenerada from "../../services/generarOrden";
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const CartItems = () => {

  const {cart, removeItem, clearCart, totalPrice} = useContext(Shop);

  const renderImage = (image) => {
    return(
      <img src={image.value} alt="cart-product" style={{height: '150px'}}></img>
    )
  }

  const renderRemoveButton = (item) => {
    const product = item.value
    return(
      <Button onClick={()=> removeItem(product)} variant="contained" color="error">
        Remove
      </Button>
    )
  }

  const handleBuy = async () => {
    const importeTotal = totalPrice();
    const orden = ordenGenerada(
      "Leonel",
      "leo@live.com",
      1111111111,
      cart,
      importeTotal
    );
    console.log(orden);

    const docRef = await addDoc(collection(db, "orders"), orden);

    // Actualizamos el stock del producto
    cart.forEach(async (productoEnCarrito) => {
      //Primero accedemos a la referencia del producto
      const productRef = doc(db, "products", productoEnCarrito.id);
      //Llamamos al snapshot, llamando a firebase
      const productSnap = await getDoc(productRef);
      //En snapshot.data() no devuelve la informacion del documento a actualizar
      await updateDoc(productRef, {
        stock: productSnap.data().stock - productoEnCarrito.quantity,
      });
    });
    alert(
      `Gracias por su compra! se genero la orden generada con ID:  ${docRef.id}`
    );
  };

  const columns = [
    { field: 'image', width: 400, height: 400, renderCell: renderImage},
    { field: 'title', headerName: 'Product', width: 450 },
    { field: 'quantity', headerName: 'Quantity', width: 80 },
    { field: 'price', headerName: 'Price', width: 100 },
    {
      field: 'remove',
      headerName: 'Remove',
      renderCell: renderRemoveButton,
      width: 120,
    },
  ];

  const filas = []
  cart.forEach(item => {
    filas.push({
      id: item.id,
      image: item.image,
      title: item.title,
      quantity: item.quantity,
      remove: item,
      price: item.price * item.quantity,
    })
  })

  return (
    <section className='cart-shop'>
        {!cart.length 
        ? <div>
            <p>No hay productos en el carrito</p>
            <Link to="/"><button>Volver al home</button></Link>
          </div>
        
        : <div className='data-grid' style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={filas}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                color: 'white',
              }}
            />
            <Button onClick={clearCart} color="error" variant="outlined">Clear cart</Button>
            <Button onClick={handleBuy}>Confirmar compra</Button>
          </div>
        }
    </section>
  )
}

export default CartItems;