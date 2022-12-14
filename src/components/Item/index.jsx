import React from "react";
import { useNavigate } from "react-router-dom";

import './styles.css';

import Card from "react-bootstrap/Card";

const Item = ({ product }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/detail/${product.id}`)
    }

    return (
        <Card className="card-container" onClick={handleNavigate} style={{ width: "18rem" }}>
            <Card.Img className="card-img" variant="top" src={product.image} />
            <Card.Title className="card-title">{product.title}</Card.Title>
        </Card>
    );
};

export default Item;
