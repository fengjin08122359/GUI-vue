import {Handle, DataHandle} from 'nclient-microfront';

class Workspace extends DataHandle{
  constructor() {
    super('workspaceComp')
    
  }
  init () {
    console.log('Workspace init')
  }
}

let workspace = new Workspace()

let handle = new Handle({
  name: 'workspaceComp',
  created () {
    workspace.init()
    console.log('workspace created')
  },
  mounted () {
    console.log('workspace mounted')
  },
})

export default handle

export {
  workspace
}