const fse = require('fs-extra');
const fs = require('fs'); 

function copyByPath (src ,dest, force = false) {
  return new Promise(resolve => {
    if (force) {
      fse.copy(src, dest)
      .then(() => {
        resolve()
      });
    } else if (!fs.existsSync(dest)) {
      fse.copy(src, dest)
      .then(() => {
        resolve()
      });
    } else {
      resolve()
    }
  })
}
module.exports = {
  copyByPath
}