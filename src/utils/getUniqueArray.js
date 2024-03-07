import React from 'react';

const GetUniqueArray = ({arrayToSort}) => {
    const result=[]
    for (let value of new Set(arrayToSort)){
        result.push(value)
    }
    return result
};

export default GetUniqueArray;