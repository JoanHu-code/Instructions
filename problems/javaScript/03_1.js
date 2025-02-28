function addUpTo(num) {
    let total = 0;
    for (let i = 0; i <= num; i++) {
      total += i;
    }
    return total;
  }
  console.log(addUpTo(5));
  console.log(addUpTo(100));
  console.log(addUpTo(5000));
  console.log(addUpTo(100000));