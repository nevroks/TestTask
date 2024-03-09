import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import ProductArrayProvider from "./providers/ProductArrayProvider.jsx";
import ShopPageProvider from "./providers/ShopPageProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <ShopPageProvider>
        <ProductArrayProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <App />
            </BrowserRouter>
        </ProductArrayProvider>
    </ShopPageProvider>
)
