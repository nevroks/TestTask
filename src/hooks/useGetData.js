import md5 from "js-md5";
import {useState} from "react";

const getPassword=()=>{
    const today = new Date();
    const year = today.getUTCFullYear().toString();
    let month = (today.getUTCMonth() + 1).toString();
    if (month<10){
        month ="0"+month
    }
    let day = today.getUTCDate().toString();
    if (day<10){
        day="0"+day
    }
    return md5(`Valantis_${year + month + day}`)
}

async function UseGetData({url,body}) {
    const password = getPassword()
        const response= await fetch(`${url}`,{
            method: "POST",
            headers: {
                "X-Auth": password,
                "Content-Type": "application/json",
            },
            body:JSON.stringify(body)
        })
        if (response.status !== 200){
           return UseGetData({url,body})
        }else{
            return response.json()
        }
    // return response.json()

}

export default UseGetData;