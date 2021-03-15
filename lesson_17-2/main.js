function getResult(x, y) {
  let result = 0;
  let arr = (Math.pow(x, y) + '').split('');
  arr.forEach((item) => {
    result += +item;
  });
  return result;
}

console.log(getResult(4, 8));
