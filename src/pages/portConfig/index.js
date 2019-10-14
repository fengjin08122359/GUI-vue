import {Handle, DataHandle, storage} from 'nclient-microfront';
import {ipcRenderer} from 'electron'

class PortConfig extends DataHandle{
  constructor() {
    super('portConfigComp')
    this.path = storage.get('portConfig') || ''
  }
  init () {
    console.log('PortConfig init')
    ipcRenderer.on('selectedItem',this.getPath);
  }
  openDialogue () {
    ipcRenderer.send('open-directory-dialog','openDirectory');
  }
  getPath (e, path) {
    if(path == null){
      alert('请选择一个文件夹')
    }
    this.path = path;
    storage.set('portConfig', path)
  }
}

let portConfig = new PortConfig()

let handle = new Handle({
  name: 'portConfigComp',
  created () {
    console.log('portConfig created')
  },
  mounted () {
    console.log('portConfig mounted')
    portConfig.init()
  },
  open (path) {
    ipcRenderer.send('project-open-single',{path, name:''});
  }
})

export default handle

export {
  portConfig
}