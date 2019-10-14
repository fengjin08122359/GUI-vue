import {DataHandle} from 'nclient-microfront';
import {ipcRenderer} from 'electron'

class Command extends DataHandle{
  constructor(_uid) {
    super('commandComp', _uid)
    this.lines = []
  }
  init () {
    console.log('Command init')
  }
  created () {
    console.log('command created')
  }
  mounted () {
    console.log('command mounted')
    ipcRenderer.on('command-line-monitor',this.checkRes);
    ipcRenderer.send('command-line-start');
  }
  checkRes (e, res) {
    this.lines.push({
      text: res
    })
  }
  clear () {
    this.lines = []
  }
}

export {
  Command
}