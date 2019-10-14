'use strict'
import { app, protocol, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import {project, starter} from './workspace'
import {
  nodejs,
  pm2,
  nclientBuild,
  codeGen
} from './install'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const {monitorline} = require('./util/commandline')
const execPool = require('./util/execPool')
const postman = require('./postman')
const codeGenerator = require('./codeGenerator')

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600, webPreferences: {
    nodeIntegration: true,
  } })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    // win.loadFile('index.html')
    // win.webContents.openDevTools()
  }
  win.on('closed', () => {
    console.log('win close')
    execPool.stopAll()
    win = null
  })
  ipcMain.on('open-directory-dialog', function (event,p) {
    dialog.showOpenDialog({
      properties: [p]
    },function (files) {
        if (files){// 如果有选中
          // 发送选择的对象给子进程
          event.sender.send('selectedItem', files[0])
        }
    })
  });
  ipcMain.on('upload-file', function (event,p) {
    dialog.showOpenDialog({
      properties: ['openFile']
    },function (files) {
        if (files){// 如果有选中
          // 发送选择的对象给子进程
          event.sender.send('upload-file-get', {
            result: files[0],
            uid: p.uid
          })
        }
    })
  });
  ipcMain.on('project-scan-list', function (event,p) {
    project.scan(p.path)
    .then(res => {
      event.sender.send('projectScan', res)
    })
  });
  ipcMain.on('project-add-single', function (event,p) {
    project.add(p.name, p.path)
    .then(() => {
      event.sender.send('projectAdd', true)
    })
    .catch(() => {
      event.sender.send('projectAdd', false)
    })
  });
  ipcMain.on('project-start-single', function (event,p) {
    project.start(p.name, p.path)
    .then(() => {
      event.sender.send('projectStart', true)
    })
  });
  ipcMain.on('project-stop-single', function (event,p) {
    project.stop(p.name, p.path)
    .then(() => {
      event.sender.send('projectStop', true)
    })
  });
  ipcMain.on('project-build-single', function (event,p) {
    project.build(p.name, p.path)
    .then((res) => {
      shell.showItemInFolder(res)
      event.sender.send('projectBuild', true)
    })
  });
  ipcMain.on('project-open-single', function (event,p) {
    project.open(p.name, p.path)
    .then((res) => {
      shell.showItemInFolder(res)
    })
  });
  ipcMain.on('project-transform-single', function (event,p) {
    project.transform(p.name, p.path).then((res) => {
      event.sender.send('projectTransform')
    })
  });
  ipcMain.on('project-install-single', function (event,p) {
    project.install(p.name, p.path).then((res) => {
      event.sender.send('projectInstall')
    })
  });
  ipcMain.on('starter-get-single', function (event,p) {
    starter.scan(p.name, p.path)
    .then((res) => {
      event.sender.send('starterGet', res)
    })
  });
  ipcMain.on('starter-save-single', function (event,p) {
    starter.save(p.name, p.path, p.params)
    event.sender.send('starterSave')
  });
  ipcMain.on('dep-check', function (event,p) {
    if (p.name == 'nodejs') {
      nodejs.test()
      .then(() => {
        event.sender.send('dep-check-res', {
          name: p.name,
          success: true
        })
      })
      .catch(() => {
        event.sender.send('dep-check-res', {
          name: p.name,
          success: false
        })
      })
    } else if (p.name == 'pm2') {
      pm2.test()
      .then(() => {
        event.sender.send('dep-check-res', {
          name: p.name,
          success: true
        })
      })
      .catch(() => {
        event.sender.send('dep-check-res', {
          name: p.name,
          success: false
        })
      })
    } else if (p.name == 'nclientBuild') {
      nclientBuild.test()
      .then(() => {
        event.sender.send('dep-check-res', {
          name: p.name,
          success: true
        })
      })
      .catch(() => {
        event.sender.send('dep-check-res', {
          name: p.name,
          success: false
        })
      })
    } else if (p.name == 'codeGen') {
      codeGen.test()
      .then(() => {
        event.sender.send('dep-check-res', {
          name: p.name,
          success: true
        })
      })
      .catch(() => {
        event.sender.send('dep-check-res', {
          name: p.name,
          success: false
        })
      })
    }
  });
  ipcMain.on('dep-install', function (event,p) {
    if (p.name == 'nodejs') {
      nodejs.install()
      .then(() => {
        event.sender.send('dep-install-res', {
          name: p.name,
          success: true
        })
      })
      .catch(() => {
        event.sender.send('dep-install-res', {
          name: p.name,
          success: false
        })
      })
    } else if (p.name == 'pm2') {
      pm2.install()
      .then(() => {
        event.sender.send('dep-install-res', {
          name: p.name,
          success: true
        })
      })
      .catch(() => {
        event.sender.send('dep-install-res', {
          name: p.name,
          success: false
        })
      })
    } else if (p.name == 'nclientBuild') {
      nclientBuild.install()
      .then(() => {
        event.sender.send('dep-install-res', {
          name: p.name,
          success: true
        })
      })
      .catch(() => {
        event.sender.send('dep-install-res', {
          name: p.name,
          success: false
        })
      })
    } else if (p.name == 'codeGen') {
      codeGen.install()
      .then(() => {
        event.sender.send('dep-install-res', {
          name: p.name,
          success: true
        })
      })
      .catch(() => {
        event.sender.send('dep-install-res', {
          name: p.name,
          success: false
        })
      })
    }
  });
  ipcMain.on('command-line-start', function (event,p) {
    monitorline((p) => {
      event.sender.send('command-line-monitor',p)
    })
  })
  ipcMain.on('postman', function (event,p) {
    postman[p.method](p)
    .then((res) => {
      event.sender.send('postman', Object.assign({},p,{res}))
    })
  })
  ipcMain.on('code-generator', function (event,p) {
    codeGenerator[p.method](p)
    .then((res) => {
      event.sender.send('code-generator', Object.assign({},p,{res}))
    })
  })
  
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
    console.log('app quit platform')
  }
})


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      console.log('app quit win32')
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      console.log('app quit SIGTERM')
      app.quit()
    })
  }
}
