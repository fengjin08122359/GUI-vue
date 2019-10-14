import {DataHandle} from 'nclient-microfront';
import {ipcRenderer} from 'electron'

class CodeGenerate extends DataHandle{
  constructor(_uid) {
    super('codeGenerateComp', _uid)
  }
  init () {
    console.log('CodeGenerate init')
  }
  created () {
    console.log('codeGenerate created')
  }
  mounted () {
    console.log('codeGenerate mounted')
  }
  start () {
    ipcRenderer.send('code-generator', {method: 'start', 
    data: {
    }});
  }
  stop () {
    ipcRenderer.send('code-generator', {method: 'stop', 
    data: {
    }});
  }
}

export {
  CodeGenerate
}