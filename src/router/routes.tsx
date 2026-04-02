import { lazy } from 'react'
import ProtectedRoute from './ProtectedRoute'

const Home = lazy(() => import('../pages/Home'))
const User = lazy(() => import('../pages/User'))
const UserDetail = lazy(() => import('../pages/UserDetail'))
const Login = lazy(() => import('../pages/Login'))
const Test = lazy(() => import('../pages/test'))
const ThreeDMap = lazy(() => import('../pages/3dMap'))
const TwoDMap = lazy(() => import('../pages/2dMap'))

export default [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'user',
        element: <User />,
        children: [
          { path: ':id', element: <UserDetail /> }
        ]
      }
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/3dMap',
    element: <ThreeDMap />,
  },
  {
    path: '/2dMap',
    element: <TwoDMap />,
  }
]