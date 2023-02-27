import React from 'react'
import ReactDOM from 'react-dom/client'
import Register from './pages/Register'
import Login from './pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Groups from './pages/Groups'
import Friends from './pages/Friends'
import AddGroup from './pages/AddGroup'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ToastContainer } from 'react-toastify'
import ViewGroup from './pages/ViewGroup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/groups',
    element: <Groups />,
  },
  {
    path: '/groups/:id',
    element: <ViewGroup />,
  },
  {
    path: '/groups/add',
    element: <AddGroup />,
  },
  {
    path: '/friends',
    element: <Friends />,
  },
])

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div>
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </PersistGate>
  </Provider>
)
