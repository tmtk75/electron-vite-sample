import './assets/index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import App from './App'
import ErrorPage from './error-page'
import Contact from './routes/contact'

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
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
