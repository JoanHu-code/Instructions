function findBiggest(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }
  console.log(findBiggest([15, 20, 22, 16, 7]));
  console.log(findBiggest([1, 2, 3, 4, 5, 999]));
  console.log(findBiggest([-11, 0, -3, -4, -5, -999]));
  console.log(findBiggest([]));

  console.log("111")