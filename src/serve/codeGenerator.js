const pool = require('./util/execPool') 
let codeGen = {
  start () {
    return new Promise((resolve) => {
      pool.exec('code-generator-mike start')
      resolve(res)
    })
  },
  stop () {
    return new Promise((resolve) => {
      pool.exec('code-generator-mike stop')
      resolve(res)
    })
  }
}

module.exports = codeGen