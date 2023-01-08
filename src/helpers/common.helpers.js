export const arrayToObject = (srcArray) => {
  var results = [];

  for (let i = 1; i < srcArray.length; i++) {
    var subResult = {};
    for (let j = 0; j < srcArray[i].length; j++) {
      subResult[srcArray[0][j]] = srcArray[i][j];
      //     console.log(srcArray[i][j])
    }
    //   console.log(subResult)
    results.push(subResult);
  }
  return results;
};
