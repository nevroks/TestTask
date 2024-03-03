import React, {createContext, useState} from 'react';

export const ProductArrayContext=createContext()

const ProductArrayProvider = ({children}) => {
    const [productsArray,setProductsArray]=useState([])
    return (<ProductArrayContext.Provider value={{productsArray,setProductsArray}}>
            {children}
    </ProductArrayContext.Provider>
    );
};

export default ProductArrayProvider;