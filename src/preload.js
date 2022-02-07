import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('control', {
  reloadModel: () => {
    ipcRenderer.send('command', JSON.stringify({ cmd: 'reload-model', data: '' }))
  }
})
