
//Temp Error

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let middle = Math.floor(arr.length / 2);
    let leftPart = arr.slice(0, middle);
    let rightPart = arr.slice(middle);
    return merge(mergeSort(leftPart), mergeSort(rightPart));
}

function merge(left, right) 
    let mergedArr = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            mergedArr.push(left.shift());
        } else if (left[0] === right[0]) {
            mergedArr.push(left.shift());
        } else {
            mergedArr.push(right.shift());
        }
    }
    return mergedArr.concat(left).concat(right);
}

console.log(mergeSort([23, 2, 56, 88, 6, 134, 3]));


function swap(index1, index2, array) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    return array;
}
function bubbleSort(array) {
    let arrLimit = array.length - 1;
    while (arrLimit > 0) {
        for (let i = 0; i < arrLimit; i += 1) {
            if (array[i] < array[i + 1]) {
                array = swap(i, i + 1, array);
            }
        }
        arrLimit = arrLimit - 1;
    }
    return array;
}