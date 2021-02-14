let num = 266219;
let a=1, i=0;
while(num>1){
    i=num%10;
    num=(num-i)/10;
    if(i!=0){
        a*=i;
    }
}
a*=a*a;
while(a%100>1){
    i=a%100;
    a=(a-i)/100;
}
a=a+i
console.log(a)