import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ItemDetail from '../../components/ItemDetail';
import { db } from '../../firebase/config';
import Loader from '../../components/Loader';
import useFirebase from '../../hooks/useFirebase';

import { doc, getDoc } from "firebase/firestore";

const ItemDetailContainer = () => {
    const [productDetail, setProductDetail] = useState({})

    const {productId} = useParams();

    const [loading, error] = useFirebase(productId);

    useEffect(() => {
        const getProducts = async () => {

            try {

                const docRef = doc(db, "products", productId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProductDetail({id: docSnap.id, ...docSnap.data()});
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();

    }, [productId])

    return (
        <>
            {loading ?
            <Loader />
            :
            <ItemDetail product={productDetail} />}
            {error && <h2>{error}</h2>}
        </>
    )
}

export default ItemDetailContainer;