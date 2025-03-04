function addUpTo(n) {
  if (n == 1) return 1;
  return n + addUpTo(n - 1);
}
console.log(addUpTo(5));
console.log(addUpTo(100));
console.log(addUpTo(5000));
