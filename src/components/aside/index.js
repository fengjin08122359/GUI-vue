import {DataHandle} from 'nclient-microfront';

class Aside extends DataHandle{
  constructor(_uid) {
    super('asideComp', _uid)
    this.tabs = [{
      name: 'command',
    },{
      name: 'codeif',
      url: 'https://codeif.xinke.org.cn/'
    },{
      name: 'guide',
    }]
  }
  init () {
    console.log('Aside init')
  }
  created () {
    console.log('aside created')
  }
  mounted () {
    console.log('aside mounted')
  }
  removeTab (target) {
    this.tabs = this.tabs.filter(item => {
      if (item.name == target.name) {
        return false
      }
      return true
    })
  }
}

export {
  Aside
}