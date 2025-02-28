function isUpperCase(str) {
    let upperCase = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    for (let i = 0; i < upperCase.length; i++) {
      if (str[0] == upperCase[i]) {
        return true;
      }
    }
    return false;
  }
  
  console.log(isUpperCase("ABCD"));
  console.log(isUpperCase(""));
  console.log(isUpperCase("aBCD"));