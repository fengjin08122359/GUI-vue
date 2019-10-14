import {DataHandle} from 'nclient-microfront';
import {ipcRenderer} from 'electron'

class Upload extends DataHandle{
  constructor(_uid) {
    super('uploadComp', _uid)
    this._uid = _uid
    this.result = null
  }
  init () {
    console.log('Upload init')
  }
  created () {
    console.log('upload created')
  }
  mounted () {
    console.log('upload mounted')
    ipcRenderer.on('upload-file-get',this.getFile);
  }
  openDialogue () {
    ipcRenderer.send('upload-file', {uid: this._uid});
  }
  getFile (e, res) {
    if (res.uid == this._uid) {
      this.result = res.result;
    }
  }
}

export {
  Upload
}