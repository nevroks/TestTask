import ProductItemList from "./components/productitemlist/ProductItemList.jsx";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import MainPage from "./pages/mainpage/MainPage.jsx";



function App() {

  return (
    <>
        <Routes>
             <Route path="/" element={<Layout/>}>
                <Route index element={<MainPage/>}/>
            </Route>
        </Routes>
      <ProductItemList/>
    </>
  )
}

export default App
