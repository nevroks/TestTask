import ProductItemList from "./components/productitemlist/ProductItemList.jsx";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import {lazy} from "react";
import ShopPageProvider from "./providers/ShopPageProvider.jsx";
import ProductPage from "./pages/productpage/ProductPage.jsx";
const MainPage = lazy(()=>import("./pages/mainpage/MainPage.jsx"))


function App() {

  return (
    <>
        <Routes>
             <Route path="/" element={<Layout/>}>
                     <Route index element={<MainPage/>}/>
                    <Route path="product" element={<ProductPage/>}/>
                    <Route path="product/:id" element={<ProductPage/>}/>
            </Route>
        </Routes>
    </>
  )
}

export default App
