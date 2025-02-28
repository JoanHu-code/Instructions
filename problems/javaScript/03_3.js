function addUpTo1(num) {
    return ((num + 1) * num) / 2;
  }
  let startTime1 = performance();
  console.log(addUpTo1(100000));
  let endTime1 = performance();
  console.log(endTime1 - startTime1);
  
  function addUpTo2(num) {
    let total = 0;
    for (let i = 0; i <= num; i++) {
      total += i;
    }
    return total;
  }
  let startTime2 = performance();
  console.log(addUpTo2(100000));
  let endTime2 = performance();
  console.log(endTime2 - startTime2);