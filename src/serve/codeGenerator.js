const pool = require('./util/execPool') 
let codeGen = {
  start () {
    return new Promise((resolve) => {
      pool.exec('code-generator-mike start')
      resolve({})
    })
  },
  stop () {
    return new Promise((resolve) => {
      pool.exec('code-generator-mike stop')
      resolve({})
    })
  }
}

module.exports = codeGen