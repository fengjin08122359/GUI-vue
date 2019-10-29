var fs = require('fs');
var path = require('path');
var pool = require('./util/execPool');
var {copyByPath} = require('./util/copy');

var project = {
  scan (dirpath) {
    return new Promise((resolve, reject) => {
      var floder = [];
      var checkDirPath = fs.existsSync(dirpath)
      if (checkDirPath) {
        fs.readdir(dirpath, (error, files) => {
          files.forEach((e) => {
            var absolutePath = path.resolve(path.join(dirpath, e));
            var stats = fs.statSync(absolutePath);
            if(stats.isDirectory()){
              var resultJson = path.resolve(absolutePath, 'result.json');
              var checkDir = fs.existsSync(resultJson)
              if (checkDir) {
                var result = fs.readFileSync(resultJson, 'utf-8')
                try{
                  if (JSON.parse(result).success) {
                    floder.push({
                      name: e,
                      path: absolutePath,
                      use: 0
                    });
                  } else {
                    floder.push({
                      name: e,
                      path: absolutePath,
                      use: 1
                    });
                  }
                }catch(error){
                  floder.push({
                    name: e,
                    path: absolutePath,
                    use: 1
                  });
                }
              } else {
                var vueJs = path.resolve(absolutePath, 'vue.config.js');
                var checkVueJs = fs.existsSync(vueJs)
                if (checkVueJs) {
                  floder.push({
                    name: e,
                    path: absolutePath,
                    use: 2
                  });
                }
              }
            }
          })
          resolve(floder)
        })
      } else {
        resolve(floder)
      }
    })
  },
  add (name, dirpath) {
    return new Promise((resolve, reject) => {
      var checkDirPath = fs.existsSync(dirpath)
      if (name && checkDirPath) {
        pool.exec(`cd /d ${dirpath} && nclient-build project ${name} --dir=./`)
        resolve()
      } else {
        reject()
      }
    })
  },
  start (name, dirpath) {
    var projectpath = path.resolve(path.join(dirpath, name));
    return new Promise((resolve, reject) => {
      if (name) {
        pool.exec(`cd /d ${projectpath} && pm2 start ./node_modules/@vue/cli-service/bin/vue-cli-service.js serve --name ${name}  -- serve --fix --open`)
      }
      resolve()
    })
  },
  stop (name, dirpath) {
    return new Promise((resolve, reject) => {
      if (name) {
        pool.exec(`pm2 stop ${name}`)
      }
      resolve()
    })
  },
  build (name, dirpath) {
    var projectpath = path.resolve(path.join(dirpath, name));
    return new Promise((resolve, reject) => {
      var target = pool.exec(`cd /d ${projectpath} && npm run build  && cd /d dist && jar -cvf ${name}.zip *`)
      var distpath = path.resolve(projectpath, `./dist/${name}.zip`);
      target.on('close', function (code) {
        if (code == 0) {
          resolve(distpath)
        } else {
          reject()
        }
      });
    })
  },
  open (name, dirpath) {
    var projectpath = path.resolve(path.join(dirpath, name));
    return new Promise((resolve, reject) => {
      resolve(projectpath)
    })
  },
  transform (name, dirpath) {
    var projectpath = path.resolve(path.join(dirpath, name));
    return new Promise((resolve, reject) => {
      var target = pool.exec(`cd /d ${projectpath} && nclient-build fast-config`)
      target.on('close', function (code) {
        if (code == 0) {
          resolve(projectpath)
        } else {
          reject()
        }
      });
    })
  },
  install (name, dirpath) {
    var projectpath = path.resolve(path.join(dirpath, name));
    return new Promise((resolve, reject) => {
      var target = pool.exec(`cd /d ${projectpath} && npm install`)
      target.on('close', function (code) {
        if (code == 0) {
          resolve(projectpath)
        } else {
          reject()
        }
      });
    })
  },
}
var starter = {
  scan (name, dirpath) {
    return new Promise((resolve, reject) => {
      var singleResult = {}
      if (name) {
        var projectpath = path.resolve(path.join(dirpath));
        var routerJson = path.resolve(projectpath, 'router.json');
        var checkDir = fs.existsSync(routerJson)
        if (checkDir) {
          var result = fs.readFileSync(routerJson, 'utf-8')
          try{
            singleResult = JSON.parse(result)
          }catch(error){}
        }
      }
      resolve(singleResult);
    })
  },
  save (name, dirpath, params) {
    if (name) {
      var projectpath = path.resolve(path.join(dirpath));
      var routerJson = path.resolve(projectpath, 'router.json');
      var checkDir = fs.existsSync(routerJson)
      if (checkDir) {
        fs.writeFileSync(routerJson, params)
      }
    }
  }
}

export {
  project,
  starter
}