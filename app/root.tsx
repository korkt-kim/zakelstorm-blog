import globalLoading from '@assets/lotties/global-loading.json'
import Lottie from 'lottie-react'

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from 'react-router'

import { useDebouncedValue } from '~/utils/useDebouncedValue'
import type { Route } from './+types/root'
import './app.css'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Ubuntu:wght@300;400;500&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const navigation = useNavigation()
  const isNavigating = useDebouncedValue(Boolean(navigation.location), 300)

  return (
    <>
      {isNavigating && (
        <Lottie
          animationData={globalLoading}
          loop
          style={{
            height: 'clamp(180px, 20%, 600px)',
            width: 'clamp(180px, 20%, 600px)',
            position: 'fixed',
            bottom: '0',
            right: '10px',
          }}
        />
      )}
      <Outlet />
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
