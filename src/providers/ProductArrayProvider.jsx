import React, {createContext, useContext, useEffect, useState} from 'react';
import removeDuplicates from "../utils/removeDuplicates.js";
import useGetData from "../hooks/useGetData.js";
import {ShopPageContext} from "./ShopPageProvider.jsx";

export const ProductArrayContext=createContext()

const ProductArrayProvider = ({children}) => {
    const [productsArray,setProductsArray]=useState([])
    // const [arrayShift,setArrayShift]=useState(0)
    // const {currentPage,productsPerPage}=useContext(ShopPageContext)
    // const {filteredArray,shift}=removeDuplicates(productsArray)

    // useEffect(()=>{
    //     const body={"action": "get_ids",
    //         "params": {"offset": currentPage*productsPerPage+arrayShift, "limit": shift}}
    //     if (productsArray.length !== filteredArray.length){
    //         setProductsArray(filteredArray)
    //         setArrayShift(shift)
    //         useGetData({url:'https://api.valantis.store:41000/',body}).then(data=>setProductsArray([...productsArray,data.result].flat()))
    //     }
    //
    // },[currentPage])
    return (<ProductArrayContext.Provider value={{productsArray,setProductsArray}}>
            {children}
    </ProductArrayContext.Provider>);
};

export default ProductArrayProvider;