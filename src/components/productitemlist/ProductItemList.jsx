import React, {lazy, Suspense, useContext, useEffect, useState} from 'react';
import useGetData from "../../hooks/useGetData.js";
import classes from "./productsItemlist.module.css";
import {ProductArrayContext} from "../../providers/ProductArrayProvider.jsx";
import ProductItem from "../productitem/ProductItem.jsx";


const ProductItemList = ({body,currentPage,productsPerPage,filtered,searchQuery}) => {
    const {productsArray,setProductsArray}=useContext(ProductArrayContext)

    const lastProductOnPage=currentPage*productsPerPage
    const firstProductOnPage=lastProductOnPage-productsPerPage
    const currentProductPage=productsArray.slice(firstProductOnPage,lastProductOnPage)
    console.log(searchQuery)
    let filteredBody = {
        "action": "filter",
        "params": {"product": `${searchQuery}`}}

    const [visitedPages,setVisitedPages]=useState([])
    useEffect(()=>{
        setVisitedPages([...visitedPages,currentPage])
    },[currentPage])
    useEffect(()=>{
        filtered ?
            useGetData({url:'https://api.valantis.store:41000/',body:filteredBody}).then(data=>setProductsArray(data.result))
            :
            visitedPages.includes(currentPage) ? 1 :
            useGetData({url:'https://api.valantis.store:41000/',body}).then(data=>setProductsArray([...productsArray,data.result].flat()))
    },[filtered,body])


    console.log(productsArray)
    return (
        <>
        <div className={classes.ProductsList}>
            {/*{!searchedArray.length ?*/}
            {/*    currentProductPage.map(product=> {*/}
            {/*        return <ProductItem key={product} productId={product}/>*/}
            {/*    })*/}
            {/*    :*/}
            {/*    searchedArray.map(product=> {*/}
            {/*        return <ProductItem key={product} productId={product}/>*/}
            {/*    })*/}
            {/*}*/}
            {currentProductPage.map(product=>{return <ProductItem key={product} productId={product}/>})}
        </div>
        </>
    );
};

export default ProductItemList;