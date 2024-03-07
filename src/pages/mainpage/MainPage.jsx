import React, { useContext, useEffect, useState} from 'react';
import classes from "./style.module.css";
import Button from "../../components/Ui/button/Button.jsx";
import Input from "../../components/Ui/input/Input.jsx";
import ProductItemList from "../../components/productitemlist/ProductItemList.jsx";

import {IoMdSearch} from "react-icons/io";

import useGetData from "../../hooks/useGetData.js";
import {ProductArrayContext} from "../../providers/ProductArrayProvider.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import {IoMenu} from "react-icons/io5";
import {ShopPageContext} from "../../providers/ShopPageProvider.jsx";



const MainPage = () => {
    const {productsArray,setProductsArray}=useContext(ProductArrayContext)
    const {currentPage,setCurrentPage}=useContext(ShopPageContext)
    // Это отвечает за пагинацию в стандартном течении
    const [productsPerPage]=useState(50)
    let body = {
        "action": "get_ids",
        "params": {"offset": currentPage, "limit": productsPerPage}}

    // Это относится к видимости навбара
    const [active,setActive]=useState(false)

    // Это всё что отвечает за фильтеринг
    const [filtered,setFiltered]=useState(false)
    const [searchQuery,setSearchQuery]=useState('')
    const [inputValue,setInputValue]=useState('')
    const [isFilteredByPriceOrBrand,setIsFilteredByPriceOrBrand]=useState(false)

    const [arrFilteredByPriceOtBrand,setArrFilteredByPriceOtBrand]=useState([])
    const [filteredArray,setFilteredArray]=useState([])

    useEffect(()=>{
        if (searchQuery.length === 0){
            setFiltered(false)
            useGetData({url:'https://api.valantis.store:41000/',body}).then(data=>setProductsArray(data.result))
        }else{
            setFiltered(true)
        }
    },[searchQuery])
    useEffect(()=>{

        if(isFilteredByPriceOrBrand && filtered){
            let result=[]
            let shorterArray = arrFilteredByPriceOtBrand.length < filteredArray.length ? arrFilteredByPriceOtBrand : filteredArray;
            let longerArray = arrFilteredByPriceOtBrand.length < filteredArray.length ? filteredArray : arrFilteredByPriceOtBrand;

            for (let i=0;i<shorterArray.length;i++){
                if (longerArray.includes(shorterArray[i])){
                    result.push(shorterArray[i])
                }
            }
            setProductsArray(result)
        }
    },[isFilteredByPriceOrBrand,filtered])

    const handleSearch =()=>{
        setCurrentPage(1)
        setSearchQuery(inputValue)
    }
    return (
        <main className={classes.mainpage}>
            <div className={classes.mainpage__openBtn}>
                {!active && <Button onClick={()=>setActive(true)}><IoMenu /></Button>}
            </div>


            <NavBar setArrFilteredByPriceOtBrand={setArrFilteredByPriceOtBrand} setIsFilteredByPriceOrBrand={setIsFilteredByPriceOrBrand} active={active} setActive={setActive}/>
            <div className={classes.mainpage__options}>
                <div className={classes.mainpage__pagination}>
                    {currentPage !== 1 ? <Button onClick={()=>setCurrentPage(prevState => prevState-1)}>Назад</Button> : <></>}
                    {currentPage !== 1 ? <Button onClick={()=>setCurrentPage(currentPage-1)}>{currentPage-1}</Button> : <></>}
                <Button onClick={()=>setCurrentPage(currentPage)} disabled className={'button-active'}>{currentPage}</Button>
                    {productsArray.length<productsPerPage ? <></> : <Button onClick={()=>setCurrentPage(currentPage+1)}>{currentPage+1}</Button>}
                    {productsArray.length<productsPerPage ? <></> : <Button onClick={()=>setCurrentPage(prevState => prevState+1)}>Вперёд</Button>}

            </div>
                <div>
                    <Input
                        value={inputValue}
                        onChange={e=>setInputValue(e.target.value)}
                        placeholder={"Поиск по названию"}/>
                    <Button className={inputValue !== searchQuery ? 'button-active' : null} onClick={handleSearch}><IoMdSearch/></Button>
                </div>
            </div>


            <h2>Наши продукты</h2>
            <ProductItemList isFilteredByPriceOrBrand={isFilteredByPriceOrBrand} setFilteredArray={setFilteredArray} searchQuery={searchQuery} productsPerPage={productsPerPage} body={body} filtered={filtered}/>

        </main>
    );
};

export default MainPage;