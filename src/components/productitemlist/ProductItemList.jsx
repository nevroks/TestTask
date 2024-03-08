import React, {useContext, useEffect, useMemo, useState} from 'react';
import useGetData from "../../hooks/useGetData.js";
import classes from "./productsItemlist.module.css";
import {ProductArrayContext} from "../../providers/ProductArrayProvider.jsx";
import ProductItem from "../productitem/ProductItem.jsx";
import {ShopPageContext} from "../../providers/ShopPageProvider.jsx";


const ProductItemList = ({body,productsPerPage,filtered,searchQuery}) => {
    const {productsArray,setProductsArray}=useContext(ProductArrayContext)
    const {currentPage}=useContext(ShopPageContext)

    const [visitedPages,setVisitedPages]=useState([])

    const lastProductOnPage=currentPage*productsPerPage
    const firstProductOnPage=lastProductOnPage-productsPerPage
    const currentProductPage=productsArray.slice(firstProductOnPage,lastProductOnPage)

    const filteredBody =useMemo(()=>{
        return {
            "action": "filter",
            "params": {"product": `${searchQuery.toLowerCase()}`}}
    },[searchQuery])

    useEffect(()=>{
        setVisitedPages([...visitedPages,currentPage])
    },[currentPage])
    useEffect(()=>{
        filtered ?
            useGetData({url:'https://api.valantis.store:41000/',body:filteredBody}).then(data=>setProductsArray(data.result))
            :
            visitedPages.includes(currentPage) ? 1 :
                useGetData({url:'https://api.valantis.store:41000/',body}).then(data=>setProductsArray([...productsArray,data.result].flat()))
    },[filtered,body,filteredBody])

    // useEffect(()=>{
    //     if (isFilteredByPriceOrBrand){
    //         useGetData({url:'https://api.valantis.store:41000/',body:filteredBody}).then(data=>setFilteredArray(data.result))
    //     }
    // },[isFilteredByPriceOrBrand])
    return (
        <>
        <div className={classes.ProductsList}>
            {currentProductPage.map(product=>{return <ProductItem key={product} productId={product}/>})}
        </div>
        </>
    );
};

export default ProductItemList;