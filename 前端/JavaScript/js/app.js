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


// let answer = Math.floor(Math.random()*100);
// // 0 <= Math.random()<1
// // 0 <= Math.random()<100
// // 0 <= Math.random()<1
// // 0 <= Math.floor(Math.random())<100
// let min = 0;
// let max = 99;


// console.log(answer);
// while(true){
//     let userAnswer = Number(prompt(`Please guess a Number, the Number must between ${min} and ${max}`));
//     if(userAnswer<min || userAnswer>max){
//         alert(`Invalid guess, please retry to guess a new number`);
//         continue;
//     }else if(userAnswer !== answer){
//         if(userAnswer>answer){
//             max = userAnswer-1;
//         }else{
//             min = userAnswer+1;
//         }
//     }else{
//        alert(`Conguration! you win! The number is ${answer}`);
//        break;
//     }
// }

// let myHeadingH1 = document.getElementById("myHeadingH1");
//   console.log(myHeadingH1);
// let myParagraphs = document.getElementsByClassName("my-p");
// console.log(myParagraphs);

// let first_found = document.querySelector("a.my-p");
// console.log(first_found);

// let found_elements = document.querySelectorAll("a.my-p");
// console.log(found_elements);

// let myPs = document.getElementsByClassName("my-p");
// let myPss = document.querySelectorAll(".my-p");
// console.log("HTMLCollection: " + myPs.length); //2
// console.log("NodeList: " + myPss.length); //2

// let body = document.querySelector("body");
// let p = document.createElement("p");
// p.innerText = "This is a new p";
// p.classList.add("my-p");
// body.appendChild(p);
// console.log("When DOM is changed!");
// console.log("HTMLCollection: " + myPs.length); //3
// console.log("NodeList: " + myPss.length); //2
// let body = document.getElementById("body");
// console.log(body)
// console.log(body.childNodes); //NodeList
// console.log(body.children); //Element Object

// let addition = function (a, b) {
//     return a + b;
// }
// console.log(addition(2,3));
// let body = document.querySelector("body");
// console.log("Before appendChild:");
// console.log(body);
// let myH1 = document.createElement("h1");
// body.appendChild(myH1);
// console.log("After appendChild:");
// console.log(body);

let btn = document.querySelector("button");
btn.style = "background-color: blue; color:white";
