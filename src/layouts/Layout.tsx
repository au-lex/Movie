import React, { ReactNode } from 'react'
import { Header } from './header'
import { Footer } from './footer'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
