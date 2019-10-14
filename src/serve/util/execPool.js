const exec = require('child_process').exec
const {addline} = require('./commandline')
var pool = {
  list: [],
  exec (code, name='') {
    var workerProcess = exec(code, { encoding: 'utf8' })
    if (name) {
      this.list.push({
        work: workerProcess,
        name: name
      })
    }
    addline('input: ' + code)
    // 打印正常的后台可执行程序输出
    workerProcess.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
      addline('stdout: ' + data)
    });
  
    // 打印错误的后台可执行程序输出
    workerProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
      addline('stderr: ' + data)
    });
  
    // 退出之后的输出
    workerProcess.on('close', function (code) {
      console.log('out code：' + code);
      addline('out code：' + code)
    })
    return workerProcess
  },
  stopAll () {
    this.list.forEach(item => {
      item.work.kill(9)
      addline('kill: ' + item.name)
    })
  },
  stop (name) {
    var target = this.list.filter(item => item.name == name)[0]
    if (target) {
      target.kill(9)
      addline('kill: ' + target.name)
    }
    this.list = this.list.filter(item => item.name != name)
  }
}

module.exports = pool