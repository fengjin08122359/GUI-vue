import {DataHandle, logger} from 'nclient-microfront';
import {ipcRenderer} from 'electron'
window.logger = logger

class HttpLink {
  constructor (json) {
    this.id = json.id || `httplink${new Date().getTime()}`
    this.name = json.name || ''
    this.type = json.type || ''
    this.url = json.url || ''
    this.data = json.data || {}
    this.array = []
    this.dataToArray()
  }
  dataToArray () {
    this.array = []
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        this.array.push({
          name: key,
          value: this.data[key]
        })
      }
    }
  }
  addData () {
    this.array.push({
      name: '',
      value: ''
    })
  }
  delData (index) {
    this.array.splice(index, 1)
  }
  getData () {
    return this.array.reduce((total,item) => {
      if (item.name) {
        total[item.name] = item.value
      }
      return total
    }, {})
  }
}

class Postman extends DataHandle{
  constructor(_uid) {
    super('postmanComp', _uid)
    this.path = '';
    this.name = '';
    this.list = []
    ipcRenderer.on('postman',this.getRes);
  }
  init () {
    console.log('Postman init')
  }
  created () {
    console.log('postman created')
  }
  mounted () {
    console.log('postman mounted')
  }
  getRes (e, res) {
    if (res.method == 'saveList' || res.method == 'saveSingle' || res.method == 'del') {
      this.getList();
    } else if (res.method == 'getList') {
      this.list = res.res
    } else if (res.method == 'test') {
      if (typeof res.res == 'object') {
        alert(JSON.stringify(res.res))
      } else {
        alert((res.res))
      }
    } else if (res.method == 'export')  {
      // logger.save
      logger.saveTextAs(res.res.http,'http.js')
      logger.saveTextAs(res.res.axios,'axios.js')
    }
  }
  saveList (val) {
    ipcRenderer.send('postman', {method: 'saveList', 
    target: {
      path: this.path,
      name: this.name,
    },
    data: {
      upload: val
    }});
  }
  getList () {
    ipcRenderer.send('postman', {method: 'getList', 
    target: {
      path: this.path,
      name: this.name,
    },data: {
    }});
  }
  manage (data) {
    return new HttpLink(data);
  }
  saveSingle (data) {
    ipcRenderer.send('postman', {method: 'saveSingle',
    target: {
      path: this.path,
      name: this.name,
    }, data: {
      id: data.id,
      name: data.name,
      type: data.type,
      url: data.url,
      data: JSON.stringify(data.getData()),
    }});
  }
  test (id) {
    ipcRenderer.send('postman', {method: 'test',
    target: {
      path: this.path,
      name: this.name,
    }, data: {
      id
    }});
  }
  delMul (ids) {
    ipcRenderer.send('postman', {method: 'del',
    target: {
      path: this.path,
      name: this.name,
    }, data: {
      ids
    }});
  }
  exportZip (id) {
    ipcRenderer.send('postman', {method: 'export',
    target: {
      path: this.path,
      name: this.name,
    }, data: {
      id
    }});
  }
  switchRoute (path, target) {
    this.path = path;
    this.name = '';
    if (target) {
      this.name = target.name;
      this.getList()
    }
  }
}

export {
  Postman
}