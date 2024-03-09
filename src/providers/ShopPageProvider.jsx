
import React, {createContext, useState} from 'react';

export const ShopPageContext=createContext()

const ShopPageProvider = ({children}) => {
    const [currentPage,setCurrentPage]=useState(1)
    const [productsPerPage]=useState(50)
    return (<ShopPageContext.Provider value={{currentPage,setCurrentPage,productsPerPage}}>
            {children}
        </ShopPageContext.Provider>
    );
};

export default ShopPageProvider;