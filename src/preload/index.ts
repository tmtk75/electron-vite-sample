import { contextBridge, ipcRenderer } from 'electron'
import {
  ExposedAPI,
  ExposedAPIKeyName,
  IPCTRPCChannelName,
  TRPCHandlerArgs
} from '../renderer/src/types'

const channel: IPCTRPCChannelName = 'ipc:electron-trpc'

const api: ExposedAPI = {
  trpc: (args: TRPCHandlerArgs) => ipcRenderer.invoke(channel, args),
  on: (channel, callback) => ipcRenderer.on(channel, (event, argv) => callback(event, argv))
}

const apiName: ExposedAPIKeyName = '__api__'
contextBridge.exposeInMainWorld(apiName, api)
