import Footer from '@/shared/footer/Footer'
import Navbar from '@/shared/navbar/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const WritingLayout = () => {
  return (
  <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen w-full section-padding-x py-5 md:py-10">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default WritingLayout