import './assets/index.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import App from './App'
import ErrorPage from './error-page'
import Contact from './routes/contact'
import { Sandbox } from './routes/sandbox'
import { ipcMainLink, trpc } from './trpc'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    element: (
      <>
        <a href="/">home</a>
        contacts: <Outlet />
      </>
    ),
    children: [
      {
        path: 'contacts/:id',
        element: <Contact />
      }
    ]
  },
  {
    path: '/sandbox',
    element: <Sandbox />
  }
])

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: true } } })

const trpcClient = trpc.createClient({
  links: [ipcMainLink]
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <RouterProvider router={router} />
      </trpc.Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
