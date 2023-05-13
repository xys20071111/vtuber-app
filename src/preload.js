import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('control', {
  reloadModel: () => {
    ipcRenderer.send('reload-model')
  },
  setNewModel: (data) => {
    ipcRenderer.send('set-new-model', data)
  },
  setNewBackground: (data) => {
    ipcRenderer.send('set-new-background', data)
  },
  sendLandmarks: (data) => {
    ipcRenderer.send('landmarks', data)
  },
  setCamPosition: (data) => {
    ipcRenderer.send('set-cam-pos', data)
  }
})
