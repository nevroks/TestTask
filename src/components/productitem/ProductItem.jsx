import React, {useEffect, useState} from 'react';
import useGetData from "../../hooks/useGetData.js";
import classes from "./productitem.module.css";
import productImg from './../../assets/productImg.jpg'
const ProductItem = ({productId}) => {
    const body={
        "action": "get_items",
        "params": {"ids": [`${productId}`]}
    }
    const [product,setProduct]=useState({})
    useEffect(()=>{
        useGetData({url:"https://api.valantis.store:41000/",body}).then(data=>{setProduct(data.result[0])})
    },[product])

    return (
        <div className={classes.product_card}>
            <div className={classes.product_card__img}>
                <img src={productImg} alt=""/>
            </div>
            <h2>{product.product}</h2>
            <p>{product.price} Рублей</p>
            <p>{product.brand === null ? "Бренд неизвестен" : product.brand}</p>
        </div>
    );
};

export default ProductItem;