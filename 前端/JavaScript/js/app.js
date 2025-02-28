// let name = window.prompt("please enter your name!")
// window.alert(`${name}, Welcome to website!`)

// for (let i = 0; i < 10; i++) {
//   // console.log(i);
// }
// //   console.log(i);

// let a = 10; //1010
// let b = 9; //1001
// console.log(a >> b); //0  => 000000

// function circle(r) {
//     return r * r * 3.14;
//   }
//   console.log(circle(10)+circle(5));

// function convertor(c) {
//     return c * 1.8 + 32;
//   }
//   let input = prompt("Please enter the Celsius");
//   console.log(convertor(input));
// let friends = ["Grace", "Mike", "Spencer", "Esther", "Slade"];
// const returnValue = friends.push("Jared");
// console.log(friends); //["Grace", "Mike", "Spencer", "Esther", "Slade", "Jared"];
// console.log(returnValue); //6

// const returnValue2 = friends.push("Marry", "Joan");
// console.log(friends); //["Grace", "Mike", "Spencer", "Esther", "Slade", "Jared","Marry","Joan"];
// console.log(returnValue2); //8

function HelloWorld() {
    console.log("Hello world!");
    console.log(this); // widow object
  }
  HelloWorld();