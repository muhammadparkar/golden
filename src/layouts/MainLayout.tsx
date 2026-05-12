import type { ReactNode } from 'react'
import Navigation from '../components/common/Navigation'
import Footer from '../components/common/Footer'
import WhatsAppFloat from '../components/common/WhatsAppFloat'
import '../styles/base.css'

type MainLayoutProps = {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
