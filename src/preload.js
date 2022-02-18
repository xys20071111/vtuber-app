import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('control', {
  reloadModel: () => {
    ipcRenderer.send('reload-model')
  },
  setNewModel: (data) => {
    ipcRenderer.send('set-new-model', data)
  }
})
