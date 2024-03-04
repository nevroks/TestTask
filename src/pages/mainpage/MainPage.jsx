import React, { useContext, useEffect, useState} from 'react';
import classes from "./style.module.css";
import Button from "../../components/Ui/button/Button.jsx";
import Input from "../../components/Ui/input/Input.jsx";
import ProductItemList from "../../components/productitemlist/ProductItemList.jsx";

import {IoMdSearch} from "react-icons/io";

import useGetData from "../../hooks/useGetData.js";
import {ProductArrayContext} from "../../providers/ProductArrayProvider.jsx";



const MainPage = () => {
    const {productsArray,setProductsArray}=useContext(ProductArrayContext)
    const [currentPage,setCurrentPage]=useState(1)
    const [productsPerPage]=useState(50)

    const [filtered,setFiltered]=useState(false)
    const [searchQuery,setSearchQuery]=useState('')
    const [inputValue,setInputValue]=useState('')
    let body = {
        "action": "get_ids",
        "params": {"offset": currentPage, "limit": productsPerPage}}

    const handleSearch =()=>{
        setSearchQuery(inputValue)
    }
    useEffect(()=>{
        if (searchQuery.length === 0){
            setFiltered(false)
            useGetData({url:'https://api.valantis.store:41000/',body}).then(data=>setProductsArray(data.result))
        }else{
            setFiltered(true)
        }
    },[searchQuery])
    return (
        <main className={classes.mainpage}>
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
            <ProductItemList searchQuery={searchQuery} productsPerPage={productsPerPage} currentPage={currentPage} body={body} filtered={filtered}/>

        </main>
    );
};

export default MainPage;