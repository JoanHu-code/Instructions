const friends = ["Harry", "Ron", "Snap", "Mike", "Grace"];
let arr = friends;
for (let i = 0; i < arr.length; i++) {
  friends[i] = arr[arr.length - i - 1];
}
console.log(friends);