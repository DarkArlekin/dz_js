class DomElement {
  constructor(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
  }
  createEl() {
    let elem;
    if (this.selector.charAt(0) === '.') {
      elem = document.createElement('div');
      elem.className = this.selector.slice(1);
    }
    if (this.selector.charAt(0) === '#') {
      elem = document.createElement('p');
      elem.id = this.selector.slice(1);
    }
    elem.style.backgroundColor = this.bg;
    elem.style.height = this.height;
    elem.style.width = this.width;
    elem.style.fontSize = this.fontSize;
    elem.textContent = 'This 1 part lesson 14';
    document.body.appendChild(elem);
  }
}
let a = new DomElement('.dgdf', '150px', '150px', 'red', '20px');
a.createEl();

console.log(a);
