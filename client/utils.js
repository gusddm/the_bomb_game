function moveLeft(arr = []) {  
    var copyArr = Object.assign([], arr);
    if(arr.length > 1) {
        const first = copyArr[0]; 
        copyArr = copyArr.slice(1, copyArr.length).concat(first);    
    }    
    return copyArr;
}

var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };
  
  var randomRangeNumber = function(max, min) { 
      return Math.floor(Math.random() * (max - min + 1)) + min; 
  }
  
  export { ID, moveLeft, randomRangeNumber };