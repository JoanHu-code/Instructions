function isAllUpperCase(str) {
    if (str.length <= 0) {
      return false;
    } else {
      let counter = 0;
      while (counter < str.length) {
        if (str[counter] == str[counter].toUpperCase()) {
          counter++;
        } else {
          return false;
        }
      }
      return true;
    }
  }
  
  console.log(isAllUpperCase("ABCD"));
  console.log(isAllUpperCase(""));
  console.log(isAllUpperCase("ABCDEFGHIJKLm"));