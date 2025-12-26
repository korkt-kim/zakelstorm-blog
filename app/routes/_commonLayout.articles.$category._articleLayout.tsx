import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className='mx-auto max-w-main-max-width'>
      <Outlet />
    </div>
  )
}
