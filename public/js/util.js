function mk(name) {
  const element = document.createElement(name);
  return element;
}
function mkcls(name, cls) {
  const element = document.createElement(name);
  element.classList.add(cls);
  return element;
}
function mktxt(name, text) {
  const element = document.createElement(name);
  element.innerText = text;
  return element;
}
function mkcls_with_txt(name, cls, text) {
  const element = document.createElement(name);
  element.classList.add(cls);
  element.innerText = text;
  return element;
}
