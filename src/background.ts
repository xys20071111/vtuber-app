'use strict'

import path from 'path'
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { controlServer, server } from './background/app'
import fs from 'fs'

const isDevelopment = process.env.NODE_ENV !== 'production'

app.commandLine.appendSwitch('force_high_performance_gpu', 'true')
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true, supportFetchAPI: true } }
])

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      backgroundThrottling: false,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })
  win.setMenuBarVisibility(false)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  server.listen(8008, '127.0.0.1', () => console.log('Listening on 127.0.0.1:8008'))

  win.on('closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
ipcMain.on('reload-model', (_event) => {
  controlServer.clients.forEach(v => v.send(JSON.stringify({ cmd: 'reload-model', data: '' })))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
ipcMain.on('set-new-model', (_event, file: string) => {
  console.log(file.slice(0, 30))
  const modelBuffer = Buffer.from(file.split(',')[1], 'base64')
  fs.writeFileSync('./latest.vrm', modelBuffer)
  controlServer.clients.forEach(v => v.send(JSON.stringify({ cmd: 'reload-model', data: '' })))
})

ipcMain.on('set-new-background', (_event, msg) => {
  controlServer.clients.forEach(v => v.send(JSON.stringify({ cmd: 'set-new-background', data: msg })))
  fs.writeFileSync('./background.json', JSON.stringify(msg))
})

ipcMain.on('landmarks', (_event, data) => {
  controlServer.clients.forEach(v => v.send(JSON.stringify({ cmd: 'set-pose', data })))
})
