import React from 'react'
import ReactDOM from 'react-dom/client'
import Register from './pages/Register'
import Login from './pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
