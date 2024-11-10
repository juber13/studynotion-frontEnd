import React from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Cookies from 'js-cookie'
const Layout = () => {
    const token = Cookies.get("accessToken"); 

  return (
    <>
      <Header />
       <Outlet/>
      {/* {token && <Footer />}  */}
    </>
  )
}

export default Layout