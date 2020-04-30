import {DataHandle} from 'nclient-microfront';

class Tools extends DataHandle{
  constructor(_uid) {
    super('toolsComp', _uid)
    
  }
  init () {
    console.log('Tools init')
  }
  created () {
    console.log('tools created')
  }
  mounted () {
    console.log('tools mounted')
  }
}

export {
  Tools
}