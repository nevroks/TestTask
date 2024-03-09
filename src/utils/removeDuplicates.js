import React from 'react';

const RemoveDuplicates = (arr) => {
    const filteredArray = arr.filter((item, index) => arr.indexOf(item) === index);
    const shift= arr.length-filteredArray.length;
    return {filteredArray,shift}
};

export default RemoveDuplicates;