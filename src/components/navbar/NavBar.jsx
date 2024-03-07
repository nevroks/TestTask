import React, {useContext, useEffect, useState} from 'react';
import classes from "./style.module.css";
import useGetData from "../../hooks/useGetData.js";
import {MdCancel} from "react-icons/md";
import Button from "../Ui/button/Button.jsx";
import Input from "../Ui/input/Input.jsx";
import useDebounce from "../../hooks/useDebounce.jsx";
import {ProductArrayContext} from "../../providers/ProductArrayProvider.jsx";
import getUniqueArray from "../../utils/getUniqueArray.js";
import correctPriceForm from "../../utils/correctFormOfPrice.js";

const NavBar = ({active,setActive,setIsFilteredByPriceOrBrand,setArrFilteredByPriceOtBrand}) => {

    const {productsArray,setProductsArray}=useContext(ProductArrayContext)

    const [brands,setBrands]=useState([])
    const [selectedBrand,setSelectedBrand]=useState("")
    const [arraySortedByBrand,setArraySortedByBrand]=useState([])

    const [price,setPrice]=useState(0)
    const [arraySortedByPrice,setArraySortedByPrice]=useState([])

    const [arrayToShow,setArrayToShow]=useState([])

    const [changes,setChanges]=useState(false)

    const debouncedPrice = useDebounce(price, 1000);
    const body={
        "action": "get_fields",
        "params": {"field": "brand"}
    }

    const uniqueBrands=getUniqueArray({arrayToSort:brands})

    useEffect(()=>{
        useGetData({url:'https://api.valantis.store:41000/',body}).then(data=>setBrands(data.result))
    },[])
    const filteredBodyByBrand={
        "action": "filter",
        "params": {"brand": `${selectedBrand}`}
    }
    useEffect(()=>{
        useGetData({url:'https://api.valantis.store:41000/',body:filteredBodyByBrand}).then(data=>setArraySortedByBrand(data.result))
    },[selectedBrand])

    const filteredBodyByPrice={
        "action": "filter",
        "params": {"price": correctPriceForm(price)}
    }
    useEffect(()=>{
        useGetData({url:'https://api.valantis.store:41000/',body:filteredBodyByPrice}).then(data=>setArraySortedByPrice(data.result))
    },[debouncedPrice])

    useEffect(()=>{
        setChanges(true)

        let result=[]

        if (price>0 && selectedBrand.length>0){
            let shorterArray = arraySortedByBrand.length < arraySortedByPrice.length ? arraySortedByBrand : arraySortedByPrice;
            let longerArray = arraySortedByBrand.length < arraySortedByPrice.length ? arraySortedByPrice : arraySortedByBrand;

            for (let i=0;i<shorterArray.length;i++){
                if (longerArray.includes(shorterArray[i])){
                    result.push(shorterArray[i])
                }
            }
        }else if (price>0 && selectedBrand.length===0){
            arraySortedByPrice.forEach(el=>result.push(el))
        }else if (selectedBrand.length>0 && price==0){
            arraySortedByBrand.forEach(el=>result.push(el))
        }
        setArrayToShow(result)
    },[arraySortedByBrand,arraySortedByPrice])

    function handleAccept(){
        setChanges(false)
        if (arrayToShow.length<=0){
            alert("Ничего согласно вашему запросу найдено небыло")
            return
        }
        setIsFilteredByPriceOrBrand(true)
        setProductsArray(arrayToShow)
        setArrFilteredByPriceOtBrand(arrayToShow)
    }
    function handleCancel(){
        setIsFilteredByPriceOrBrand(false)
        setArrFilteredByPriceOtBrand([])
        setPrice(0)
        setSelectedBrand('')
        useGetData({url:'https://api.valantis.store:41000/',body:{
                "action": "get_ids",
                "params": {"offset": 0, "limit": 50}
            }}).then(data=>setProductsArray(data.result))}
    return (
        <div className={active ? classes.navbar+" "+classes.navbar_active :classes.navbar}>
            {active &&<div className={classes.navbar__content}>
                <label>Отсортировать по цене<Input
                    type="number"
                    onChange={e=>setPrice(e.target.value)}
                value={price}/>
                </label>
                <label>Отсортировать по бренду <select
                onChange={e => setSelectedBrand(e.target.value)}
                value={selectedBrand}
                >
                    <option value={'def'} defaultValue>Не указано</option>
                    {uniqueBrands.map(option=>{
                        return <option key={option} disabled={option==null ? true : false} value={option}>{option==null ? "Бренд отсутствует" : option}</option>
                    })}
                </select></label>
                <div className={classes.navbar__contentClose__btn}><Button onClick={()=>setActive(false)}><MdCancel /></Button></div>
                <Button onClick={handleAccept} className={`${changes ? 'button-active' : ''}`}>Применить</Button>
                <Button onClick={handleCancel}>Убрать все фильтры</Button>
            </div>}
        </div>
    );
};

export default NavBar;