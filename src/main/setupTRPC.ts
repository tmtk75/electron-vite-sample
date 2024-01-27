import { Operation } from '@trpc/client'
import { callProcedure } from '@trpc/server'
import type { IpcMainInvokeEvent } from 'electron'
import { ipcMain } from 'electron'
import { appRouter } from './appRouter'
import { IPCTRPCChannelName } from '../renderer/src/types'

const channel: IPCTRPCChannelName = 'ipc:electron-trpc'

export function setupTRPC() {
  ipcMain.handle(channel, (_event: IpcMainInvokeEvent, op: Operation) => {
    return resolveTRPCOperation(op)
  })
}

async function resolveTRPCOperation(args: Operation<unknown>) {
  const { procedures } = appRouter._def
  const { type, input: serInput } = args
  const deinput = serInput //transformer.input.deserialize(serInput) as unknown;

  try {
    const data = await callProcedure({
      ctx: {},
      path: args.path,
      procedures,
      rawInput: deinput,
      type
    })

    return {
      input: deinput,
      path: args.path,
      data
    }
  } catch (err) {
    console.error(new Date().toISOString(), `failed to callProcedure.`, { args }, err)
    throw err
  }
}
