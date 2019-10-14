import {logger, changeTitle} from 'nclient-microfront'

export default {
  init () {
    logger.setLevel(-1)
    document.title = 'abc'
    changeTitle.init()
  }
}