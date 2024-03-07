
import React, {createContext, useState} from 'react';

export const ShopPageContext=createContext()

const ShopPageProvider = ({children}) => {
    const [currentPage,setCurrentPage]=useState(1)
    return (<ShopPageContext.Provider value={{currentPage,setCurrentPage}}>
            {children}
        </ShopPageContext.Provider>
    );
};

export default ShopPageProvider;