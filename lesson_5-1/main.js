let arr = [1253, 2548, 23480, 4256, 737, 123, 486];
arr.forEach((element) => {
  if (String(element).substr(0, 1) == 2 || String(element).substr(0, 1) == 4) {
    console.log(element);
  }
});
console.log(`\n\n\n`);

let del=2;
for(let i=1; i<101; i++){
  while(del<=100){
  if(i%del==0){
    break;
  }
  else{
    del++;
  }}
  if(i==del){
    console.log(del)
    console.log(`Делители этого числа: 1 и ${del}`)
  }
 del=2;
}




