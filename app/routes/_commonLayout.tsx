import { Outlet } from 'react-router'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'

export default function CommonLayout() {
  return (
    <div className='min-h-screen bg-bg-dark'>
      <Header />
      <main
        className='
        min-h-[calc(100vh-var(--spacing-header-height)-var(--spacing-footer-height-mobile))]
         md:min-h-[calc(100vh-var(--spacing-header-height)-var(--spacing-footer-height-desktop))]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
