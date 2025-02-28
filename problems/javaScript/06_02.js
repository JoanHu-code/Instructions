function isUpperCase(str) {
    if (str.length <= 0) {
      return false;
    } else {
      return str[0] == str[0].toUpperCase();
    }
  }
  console.log(isUpperCase("ABCD"));
  console.log(isUpperCase(""));
  console.log(isUpperCase("aBCD"));