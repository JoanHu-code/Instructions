function isAllUpperCase(str) {
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
    if (str.length <= 0) {
      return false;
    }
    for (let i = 0; i < str.length; i++) {
      for (let j = 0; j < upperCase.length; j++) {
        if (str[i] == upperCase[j]) {
          break;
        } else if (upperCase[j] == "Z") {
          return false;
        }
      }
    }
  
    return true;
  }
  
  console.log(isAllUpperCase("ABCD"));
  console.log(isAllUpperCase(""));
  console.log(isAllUpperCase("ABCDEFGHIJKLm"));