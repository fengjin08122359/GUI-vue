import {Handle, DataHandle} from 'nclient-microfront';
import {ipcRenderer} from 'electron'

class Dependence extends DataHandle{
  constructor() {
    super('dependenceComp')
    this.installed = {
      nodejs: 0,
      pm2: 0,
      nclientBuild: 0,
      codeGen: 0,
    }
  }
  init () {
    console.log('Dependence init')
    ipcRenderer.on('dep-check-res',this.checkRes);
    ipcRenderer.on('dep-install-res',this.installRes);
  }
  test (name) {
    ipcRenderer.send('dep-check', {
      name
    });
  }
  install (name) {
    ipcRenderer.send('dep-install', {
      name
    });
  }
  checkRes (e, res) {
    this.installed[res.name] = res.success ? 2 : 0
  }
  installRes (e, res) {
    this.test(res.name)
  }
}

let dependence = new Dependence()

let handle = new Handle({
  name: 'dependenceComp',
  created () {
    dependence.init()
    console.log('dependence created')
  },
  mounted () {
    console.log('dependence mounted')
  },
})

export default handle

export {
  dependence
}