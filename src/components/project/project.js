import {Handle, DataHandle, httplink} from 'nclient-microfront';
import {ipcRenderer} from 'electron'

class Project extends DataHandle{
  constructor() {
    super('project')
    this.list = []
    this.path = ''
    this.distpath = ''
    ipcRenderer.on('projectScan',this.projectScan);
    ipcRenderer.on('projectAdd',this.projectAdd);
    ipcRenderer.on('projectStart',this.projectStart);
    ipcRenderer.on('projectStop',this.projectStop);
    ipcRenderer.on('projectBuild',this.projectBuild);
    ipcRenderer.on('projectTransform',this.projectTransform);
    ipcRenderer.on('projectInstall',this.projectInstall);
  }
  init () {
    console.log('Project init')
  }
  projectStart () {
    alert('启动')
  }
  projectStop () {
    alert('停止')
  }
  projectBuild () {
    alert('打包')
  }
  projectInstall () {
    alert('安装依赖')
  }
  projectTransform () {
    this.scan(this.path);
  }
  scan (path) {
    this.path = path
    ipcRenderer.send('project-scan-list',{path});
  }
  projectScan (e, res) {
    this.list = res
  }
  projectAdd(e, res) {
    if (res) {
      alert('请稍等正在加载项目,请稍后刷新')
    } else {
      alert('添加失败,请检查项目名称是否已经存在或错误')
    }
  }
  addProject (name) {
    ipcRenderer.send('project-add-single',{path: this.path,name});
  }
  getProjects () {
    httplink('getProjects','/project/',{})
    .then(result => {
      this.list = result.res.floder
    })
  }
  add (name) {
    httplink('addProject','/project/add',{name})
    .then(() => {
      alert('添加成功')
      this.getProjects()
    })
  }
  remove (name) {
    httplink('removeProject','/project/remove',{name})
    .then(() => {
      alert('删除成功')
      this.getProjects()
    })
  }
  start (name) {
    // httplink('startServerSingle','/starter/startServerSingle',{name})
    // .then(() => {
    //   alert('启动')
    // })
    ipcRenderer.send('project-start-single',{path: this.path,name});
  }
  stop (name) {
    // httplink('stopServerSingle','/starter/stopServerSingle',{name})
    // .then(() => {
    //   alert('停止')
    // })
    ipcRenderer.send('project-stop-single',{path: this.path,name});
  }
  build (name) {
    ipcRenderer.send('project-build-single',{path: this.path,name});
    // httplink('build','/starter/build',{name})
    // .then((result) => {
    //   alert('build')
    //   if (result.res && result.res.distpath) {
    //     this.distpath = result.res.distpath
    //   }
    // })
  }
  open (name) {
    ipcRenderer.send('project-open-single',{path: this.path,name});
  }
  transform (name) {
    ipcRenderer.send('project-transform-single',{path: this.path,name});
  }
  install (name) {
    ipcRenderer.send('project-install-single',{path: this.path,name});
  }
}

let project = new Project()

let handle = new Handle({
  name: 'project',
  created () {
    project.init()
    console.log('project created')
  },
  mounted () {
    console.log('project mounted')
  },
  remove(name) {
    project.remove(name)
  },
  refresh() {
    project.getProjects()
  },
  add (name) {
    project.addProject(name)
  },
  start (name) {
    project.start(name)
  },
  stop (name) {
    project.stop(name)
  },
  build (name) {
    project.build(name)
  },
  open (name) {
    project.open(name)
  },
  transform (name) {
    project.transform(name)
  },
  install (name) {
    project.install(name)
  }
})

export default handle

export {
  project
}