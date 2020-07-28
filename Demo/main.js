const { app, BrowserWindow } = require('electron')

const path = require('path')
const url = require('url')
const os = require('os');

"use strict";//启用严格模式，ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";

if (os.platform() === 'win32') {
  //app.disableHardwareAcceleration();
  app.commandLine.appendSwitch('disable-direct-composition')
}

let mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1024, 
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // 启动文件入口，如 index.html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // 开启 Chromium DevTools
  //mainWindow.webContents.openDevTools()
  // 监听窗口关闭事件
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
// 加载就绪
app.on('ready', createWindow)
// 监听所有窗口关闭的事件
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// 激活窗口
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})