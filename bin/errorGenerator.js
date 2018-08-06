
//Temp Error

const fakeError =  () => { 
    const arr = [1,2,3,4,5,5]
    return arr.filter(number => number === 7})
}
   


fakeError()
console.log(`THIS AN ERROR FROM THE USER'S FILE`);
