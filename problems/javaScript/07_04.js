function isAllUpperCase(str) {
    if (str.length <= 0) {
      return false;
    } else {
      return str == str.toUpperCase();
    }
  }
  
  console.log(isAllUpperCase("ABCD"));
  console.log(isAllUpperCase(""));
  console.log(isAllUpperCase("ABCDEFGHIJKLm"));