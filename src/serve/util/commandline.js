var lineFn = () => {}
var addline = (text) => {
  lineFn(text)
}
var monitorline = (fn) => {
  lineFn = fn
}

module.exports = {
  addline,
  monitorline
}