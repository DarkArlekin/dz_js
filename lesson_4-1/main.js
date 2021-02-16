function aaa(a) {
  if (typeof(a) != 'string') {
    console.log('Введена не строка');
  } else {
    if (a.length > 30) {
      a = a.slice(1, 30)+'(...)';
    }
  }
  return a;
}

let str = 'aaaaaadejdfdjgdgjtjtyktyukyuukuttykruyhggejgoefjfgsfdf0';
console.log(aaa(str));
