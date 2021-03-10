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
    //elem.style.cssText = `background-color: ${this.bg};height: ${this.height}; width: ${this.width}; font-size: ${this.fontSize}; position: absolute`;
    elem.style.backgroundColor = this.bg;
    elem.style.height = this.height;
    elem.style.width = this.width;
    elem.style.fontSize = this.fontSize;
    elem.style.position = 'absolute';
    elem.style.top = '0px';
    elem.style.bottom = '100px';
    elem.style.left = '0px';
    elem.style.right = '100px';
    elem.textContent = 'This lesson 14';
    document.body.appendChild(elem);
  }
}
let a = new DomElement('.dgdf', '100px', '100px', 'red', '20px');
a.createEl();
const obj = document.querySelector(`${a.selector}`);
  document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowUp') {
      obj.style.top = parseInt(obj.style.top) - 10 + 'px';
    }
    if (event.code === 'ArrowDown') {
      obj.style.top = parseInt(obj.style.top) + 10 + 'px';
    }
    if (event.code === 'ArrowLeft') {
      obj.style.left = parseInt(obj.style.left) - 10 + 'px';
    }
    if (event.code === 'ArrowRight') {
      obj.style.left = parseInt(obj.style.left) + 10 + 'px';
    }
  });
