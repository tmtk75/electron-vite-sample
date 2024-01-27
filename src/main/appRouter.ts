import { electronAPI } from '@electron-toolkit/preload'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

const router = t.router
const publicProcedure = t.procedure

type User = { id: string; name: string; date?: Date }

const users: User[] = [
  {
    id: '1',
    name: 'John'
  },
  {
    id: '2',
    name: 'Jane'
  },
  {
    id: '3',
    name: 'Jack',
    date: new Date()
  }
]
let id = 4

const userRouter = router({
  userList: publicProcedure.query(async () => {
    console.log('userList', users)
    return users
  }),

  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts
    const user = users.find((u) => u.id === input)
    return user
  }),

  userCreate: publicProcedure
    .input(z.object({ name: z.string(), time: z.date() }))
    // .output(z.object({ user: z.object({ id: z.string(), name: z.string() }) }))
    .mutation(async (opts) => {
      const { input } = opts
      console.debug(`userCreate:`, { input })
      const nu = {
        id: String(id++),
        name: input.name
      }
      users.push(nu)
      return { user: nu }
    })
})

const electronRouter = router({
  versions: publicProcedure.query(async () => {
    return electronAPI.process.versions
  })
})

export const appRouter = router({
  user: userRouter,
  electron: electronRouter
})

export type AppRouter = typeof appRouter
