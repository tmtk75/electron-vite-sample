import { ProcedureType } from '@trpc/server'
import { IpcRenderer } from 'electron'

export interface TRPCHandlerArgs {
  path: string
  type: ProcedureType
  input?: unknown
}

export interface ExposedAPI {
  trpc: (a: TRPCHandlerArgs) => Promise<void>
  on: IpcRenderer['on']
}

export type IPCTRPCChannelName = 'ipc:electron-trpc'
export type ExposedAPIKeyName = '__api__'
