import {DataHandle} from 'nclient-microfront';

class Guide extends DataHandle{
  constructor(_uid) {
    super('guideComp', _uid)
    
  }
  init () {
    console.log('Guide init')
  }
  created () {
    console.log('guide created')
  }
  mounted () {
    console.log('guide mounted')
  }
}

export {
  Guide
}