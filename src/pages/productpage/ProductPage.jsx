import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useGetData from "../../hooks/useGetData.js";
import Button from "../../components/Ui/button/Button.jsx";

const ProductPage = () => {
    const {id}=useParams()
    const [product,setProduct]=useState({})
    const navigate=useNavigate()
    const body={
        "action": "get_items",
        "params": {"ids": [`${id}`]}
    }
    useEffect(()=>{
        useGetData({url:"https://api.valantis.store:41000/",body}).then(data=>{setProduct(data.result[0])})
    },[id])
    const handleClick=()=>{
        navigate(-1)
    }
    return (
        <div>
            <Button onClick={handleClick}>Назад</Button>
            <h2>{product.product}</h2>
            <p>{product.price} Рублей</p>
            <p>{product.brand === null ? "Бренд неизвестен" : product.brand}</p>
        </div>
    );
};

export default ProductPage;