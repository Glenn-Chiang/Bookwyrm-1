import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root.jsx'
import Search from './routes/Search/Search'
import MyShelves from './routes/MyShelves/MyShelves'
import MyBooks from './routes/MyBooks/MyBooks'
import Profile from './routes/Profile/Profile'
import SignIn from './routes/SignIn/SignIn'
import SignUp from './routes/SignUp/SignUp'
import SignOut from './routes/SignOut/SignOut'
import { action as signInAction } from './routes/SignIn/SignIn'
import { action as signUpAction } from './routes/SignUp/SignUp'
import { action as signOutAction } from './routes/SignOut/SignOut'
import { loader as MyBooksLoader } from './routes/MyBooks/loader'
import { loader as MyShelvesLoader } from './routes/MyShelves/loader'
import { loader as ProfileLoader } from './routes/Profile/loader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        path: 'search',
        element: <Search/>
      },
      {
        path: '/myShelves/:userId',
        element: <MyShelves/>,
        loader: MyShelvesLoader
      },
      {
        path: '/:userId',
        element: <MyBooks/>,
        loader: MyBooksLoader
      },
      {
        path: '/profile/:userId',
        element: <Profile/>,
        loader: ProfileLoader
      },
      {
        path: 'signIn',
        element: <SignIn/>,
        action: signInAction
      },
      {
        path: 'signUp',
        element: <SignUp/>,
        action: signUpAction
      },
      {
        path: 'signOut',
        element: <SignOut/>,
        action: signOutAction
      }
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
