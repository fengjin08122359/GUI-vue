import {DataHandle} from 'nclient-microfront';

class Menu extends DataHandle{
  constructor(_uid) {
    super('menuComp', _uid)
    
  }
  init () {
    console.log('Menu init')
  }
  created () {
    console.log('menu created')
  }
  mounted () {
    console.log('menu mounted')
  }
}

export {
  Menu
}