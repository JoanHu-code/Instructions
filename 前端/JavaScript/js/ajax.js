let balance = 0; // shared resource
let mutex = Promise.resolve(); // return fulfilled Promise object

const randomDelay = () => {
  // return value is a Promise
  // and the time for this promise changing from pending to fulfilled
  // is random (0s-0.1s)
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
};

async function loadBalance() {
  await randomDelay(); // 等個隨機的0s~0.1s
  return balance;
}

async function saveBalance(value) {
  await randomDelay();
  balance = value;
}

async function sellGrapes() {
  const balance = await loadBalance();
  console.log(`賣葡萄前，帳戶金額為: ${balance}`);
  const newBalance = balance + 50;
  await saveBalance(newBalance);
  console.log(`賣葡萄後，帳戶金額為: ${newBalance}`);
}

async function sellOlives() {
  const balance = await loadBalance();
  console.log(`賣橄欖前，帳戶金額為: ${balance}`);
  const newBalance = balance + 50;
  await saveBalance(newBalance);
  console.log(`賣橄欖後，帳戶金額為: ${newBalance}`);
}

async function main() {
  // await  sellGrapes()
  // await  sellOlives()
  // await  sellOlives()
  // await  sellOlives()
  // await  sellGrapes()
  // await  sellGrapes()
  // await  sellGrapes()
  sellGrapes()
  sellOlives()
  sellOlives()
  sellOlives()
  sellGrapes()
  sellGrapes()
  sellGrapes()
  console.log("we will be doing some work here...");  
}

main();