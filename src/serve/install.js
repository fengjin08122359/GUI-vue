
var pool = require('./util/execPool');
var nodejs = {
  test () {
    return new Promise((reslove, reject) => {
      if (process.versions['node']) {
        reslove(process.versions['node'])
      } else {
        reject()
      }
    })
  },
  install () {
    window.open('http://nodejs.cn/download/')
  }
}
var pm2 = {
  test () {
    return new Promise((reslove, reject) => {
      var test = pool.exec('pm2 -v');
      test.on('close', function (code) {
        if (code == 0) {
          console.log('pm2 exist')
          reslove()
        } else {
          reject()
        }
      });
    })
  },
  install () {
    return new Promise((reslove, reject) => {
      var test = pool.exec('npm install -g pm2');
      test.on('close', function (code) {
        if (code == 0) {
          reslove()
        } else {
          reject()
        }
      });
    })
  }
}
var nclientBuild = {
  test () {
    return new Promise((reslove, reject) => {
      var test = pool.exec('nclient-build version');
      test.on('close', function (code) {
        if (code == 0) {
          console.log('nclient-build exist')
          reslove ()
        } else {
          reject()
        }
      });
    })
  },
  install () {
    return new Promise(({reslove, reject}) => {
      var test = pool.exec('npm install -g nclient-build');
      test.on('close', function (code) {
        if (code == 0) {
          reslove ()
        } else {
          reject()
        }
      });
    })
  }
}

var codeGen = {
  test () {
    return new Promise((reslove, reject) => {
      var test = pool.exec('code-generator-mike version');
      test.on('close', function (code) {
        if (code == 0) {
          console.log('code-generate-mike exist')
          reslove ()
        } else {
          reject()
        }
      });
    })
  },
  install () {
    return new Promise(({reslove, reject}) => {
      var test = pool.exec('npm install -g code-generator-mike');
      test.on('close', function (code) {
        if (code == 0) {
          reslove ()
        } else {
          reject()
        }
      });
    })
  }
}
module.exports = {
  nodejs,
  pm2,
  nclientBuild,
  codeGen
}