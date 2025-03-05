class NotArrayError extends TypeError {
  constructor(message) {
    super(message);
  }
  printSolution() {
    return "please check your parameter!";
  }
}
function sumArray(arr) {
  if (!Array.isArray(arr)) {
    throw new NotArrayError("parameter is not array!!!");
  }
  let result = 0;
  arr.forEach((element) => {
    result += element;
  });
  return result;
}
try {
  sumArray("Hello");
} catch (e) {
  console.log(e);
}
