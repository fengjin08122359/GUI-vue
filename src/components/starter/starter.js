import {Handle, DataHandle, httplink} from 'nclient-microfront';
import {ipcRenderer} from 'electron'

let {entries} = Object; 

class Starter extends DataHandle{
  constructor() {
    super('starter')
    this.serverList = {}
    this.current = {}
    this.currentName = ''
    this.port = ''
    this.proxyArray = []
    
    if (this.proxyArray.length == 0) {
      this.proxyArray.push({
        key: '',
        target: ''
      })
    }
    this.path = ''
    this.name = ''
    ipcRenderer.on('starterGet',this.starterGet);
    ipcRenderer.on('starterSave',this.starterSave);
  }
  init () {
    console.log('Starter init')
  }
  get (val) {
    this.path = val.path
    this.name = val.name
    ipcRenderer.send('starter-get-single', {
      path: this.path,
      name: this.name,
    })
  }
  starterGet (e, result) {
    this.serverList[this.name] = result;
    this.current = result
    this.currentName = this.name
    this.port = result.port
    this.proxyArray = []
    if (result.proxy) {
      for (let [key, value] of entries(result.proxy)) {
        this.proxyArray.push({
          key: key,
          target: value.target
        })
      }
    }
    if (this.proxyArray.length == 0) {
      this.proxyArray.push({
        key: '',
        target: ''
      })
    }
  }
  save () {
    var name = this.currentName;
    if (name) {
      var params = {
        port:  this.port,
        proxy: { }
      }
      this.proxyArray.forEach(item => {
        if (item.key && item.target) {
          params.proxy[item.key] = {
            changeOrigin: true,
            target: item.target
          }
        }
      })
      params = JSON.stringify(params)
      ipcRenderer.send('starter-save-single', {
        path: this.path,
        name: this.name,
        params
      })
    }
  }
  starterSave () {
    this.get({
      path: this.path,
      name: this.name,
    });
  }
  getSingle (name) {
    httplink('getSingle','/starter/getSingle',{name})
    .then(result => {
      this.serverList[name] = result.res;
      this.current = result.res
      this.currentName = name
      this.port = result.res.port
      this.proxyArray = []
      for (let [key, value] of entries(result.res.proxy)) {
        this.proxyArray.push({
          key: key,
          target: value.target
        })
      } 
    })
  }
  saveSingle () {
    var name = this.currentName;
    if (name) {
      var params = {
        port:  this.port,
        proxy: { }
      }
      this.proxyArray.forEach(item => {
        if (item.key && item.target) {
          params.proxy[item.key] = {
            changeOrigin: true,
            target: item.target
          }
        }
      })
      params = JSON.stringify(params)
      httplink('saveSingle','/starter/saveSingle',{name: name, params})
      .then(() => {
        alert('保存成功')
        this.getSingle(name)
      })
    }
  }
}

let starter = new Starter()

let handle = new Handle({
  name: 'starter',
  created () {
    starter.init()
    console.log('starter created')
  },
  mounted () {
    console.log('starter mounted')
  },
  getSingle (name) {
    starter.getSingle(name)
  },
  save () {
    starter.save()
  },
  get (val) {
    starter.get(val)
  }
})

export default handle

export {
  starter
}