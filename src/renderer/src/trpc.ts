import { TRPCLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { ProcedureType } from '@trpc/server'
import { observable } from '@trpc/server/observable'
import { IpcRenderer } from 'electron'
import type { AppRouter } from '../../main/appRouter'

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

const logger = console
// const logger = { debug: (..._: any[]) => {} }

declare global {
  interface Window {
    __api__?: ExposedAPI
  }
}

export function exposedAPI() {
  return window?.__api__
}

export const ipcMainLink: TRPCLink<AppRouter> = (runtime) => {
  const api = exposedAPI()
  if (!api) {
    console.info('trpc: no given api. returns null link.')
    return () =>
      // NOTE: this is needed to return null in in-browser.
      observable((observer) => {
        observer.next({
          context: undefined,
          result: {
            type: 'data',
            data: null
          }
        })

        // complete this invocation.
        observer.complete()
        return () => {}
      })
  }
  console.info('trpc: custom-link: runtime:', runtime)

  return ({ op }) =>
    observable((observer) => {
      logger.debug('trpc:', 'performing operation:', op)
      api
        .trpc(op)
        .then((r: any) => {
          logger.debug(`trpc: op:`, { ...r })
          observer.next({
            context: { foo: 1234 }, // NOTE: context sample.
            result: {
              type: 'data',
              // data: { greeting: r.msg, id: r.id ?? 112233 },
              ...r
            }
          })
          observer.complete()
        })
        .catch((err) => {
          console.error(`trpc: err:`, err)
          observer.error(err)
        })
      return () => {
        logger.debug('trpc: observable: tear-down.', op.id)
      }
    })
}

export const trpc = createTRPCReact<AppRouter>()
