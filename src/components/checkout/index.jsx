import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import './styles.css';
import { db } from '../../firebase/config';
import ordenGenerada from "../../services/generarOrden";
import { Shop } from '../../context/CartContext';
import ItemCart from '../ItemCart';

import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

const Checkout = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const { cart, totalPrice, clearCart } = useContext(Shop);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = () => {
        const email1 = watch("email");
        const email2 = watch("email2");
        return email1 === email2;
    }

    const productsInCart = [];
    cart.forEach(item => {
        productsInCart.push(item);
    })

    const onSubmit = async (data) => {
        setLoading(true);

        const importeTotal = totalPrice();
        const orden = ordenGenerada(
            data.name,
            data.surname,
            data.phone,
            data.email,
            data.email2,
            data.terms,
            cart,
            importeTotal
        );

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
        setLoading(false);
        clearCart();
        Swal.fire({
            icon: 'success',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            html:
                `Gracias por su compra! se genero la orden generada con ID:  ${docRef.id}`
        });
        navigate("/")
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="checkout">
            <div>
                <h2>Productos: </h2>
                {cart.map(product => {
                    return <ItemCart key={product.id} product={product}/>
                })}
                <p className="checkout-total">Total: ${totalPrice()}</p>
            </div>
            <div className="form-container">
                <h2>Complete los datos</h2>
                <div className="checkout-data">
                    <label htmlFor="name">Nombre</label>
                    <input placeholder="Nombre" {...register("name", {required: true})} />
                    {errors.name?.type === "required" && <p>Campo requerido</p>}
                </div>
                <div className="checkout-data">
                    <label htmlFor="surname">Apellido</label>
                    <input placeholder="Apellido" {...register("surname", {required: true})} />
                    {errors.surname?.type === "required" && <p>Campo requerido</p>}
                </div>
                <div className="checkout-data">
                    <label htmlFor="phone">Telefono</label>
                    <input placeholder="Telefono" {...register("phone", {required: true})} />
                    {errors.phone?.type === "required" && <p>Campo requerido</p>}
                </div>
                <div className="checkout-data">
                    <label htmlFor="email">E-mail</label>
                    <input placeholder="email@email.com" type="email" {...register("email", {required: true})} />
                </div>
                <div className="checkout-data">
                    <label htmlFor="email2">Repita el e-mail</label>
                    <input placeholder="email@email.com" type="email" {...register("email2", {required: true, validate: validateEmail})} />
                    {errors.email2?.type === "validate" && <p>Los emails no coinciden</p>}
                </div>
                <div className="checkout-data">
                    <input type="checkbox" {...register("terms", {required: true})} />
                    <p>Aceptar términos y condiciones</p>
                    {errors.terms?.type === "required" && <p>Este campo es requerido.</p>}
                </div>
                <div className="checkout-data">
                    {cart.length > 0
                    ? <input type="submit" value="Realizar compra" />
                    : <p>Es necesario añadir productos</p>}
                    {loading && <CircularProgress/> }
                </div>
            </div>
        </form>                                                                         
    )
}

export default Checkout;