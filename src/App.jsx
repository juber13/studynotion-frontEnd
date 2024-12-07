import { Suspense, useState } from 'react'
import { lazy } from 'react'
import Header from './components/Header'
import Hero from './components/Home'
import { BrowserRouter, Routes , Route, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Contact from './pages/Contact'
// import About from './pages/About'

const LazyAbout = lazy(() => import('./pages/About'))

import ForgotPassword from './pages/ForgotPassword'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout/Layout'
import Home from './components/Home'
import ProtectedRoutes from './components/ProtectedRoutes'
import DashBoard from './pages/DashBoard'
import CourseDetail from './pages/CourseDetail'
import { useSelector } from 'react-redux'
const Login = lazy(() => import('./pages/Login'));


function App() {
    // const userInfo = useSelector((state) => state.user.data);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: (
          <Suspense
            fallback={
              <div className='text-6xl text-red-400 mt-10 w-full height'>
                Loading...
              </div>
            }
          >
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/forgot-password",
        element: (
          <ProtectedRoutes>
            <ForgotPassword />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: (<Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <DashBoard />
          </ProtectedRoutes>
        ),
      },

      {
        path: "/course/:id",
        element: (
          <ProtectedRoutes>
            <CourseDetail />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

  return (
    <>
    <RouterProvider router={router} />
    <Toaster duration={1}  position='top-center' />
    </>
  );

}

export default App