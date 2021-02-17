let arr = [1253, 2548, 23480, 4256, 737, 123, 486];
arr.forEach((element) => {
  if (String(element).substr(0, 1) == 2 || String(element).substr(0, 1) == 4) {
    console.log(element);
  }
});
