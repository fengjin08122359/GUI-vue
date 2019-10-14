import {Handle, DataHandle} from 'nclient-microfront';

class BackCol extends DataHandle{
  constructor() {
    super('backColComp')
    
  }
  init () {
    console.log('BackCol init')
  }
}

let backCol = new BackCol()

let handle = new Handle({
  name: 'backColComp',
  created () {
    backCol.init()
    console.log('backCol created')
  },
  mounted () {
    console.log('backCol mounted')
  },
})

export default handle

export {
  backCol
}