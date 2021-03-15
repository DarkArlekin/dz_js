console.log('1');
function b() 
{
  (function a() {
    console.log('2');
  })();
}
b();
console.log('3');
