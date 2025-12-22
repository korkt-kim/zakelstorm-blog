import GitHubLogo from '@assets/images/github.svg?react'
import LinkedInLogo from '@assets/images/linkedin.svg?react'
import { Link, useLocation } from 'react-router'
import { GITHUB_URL, LINKED_IN_URL } from '~/const'
import { cn } from '~/utils/cn'
import { Flex } from './shared/Flex'

const MENUS = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Article',
    href: '/articles',
  },
  { name: 'About', href: '/about' },
]

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className='bg-bg-dark px-8 py-0 w-full border-b border-grey/20'>
      <Flex
        align='center'
        justify='space-between'
        className='py-[24px] w-full max-w-[1920px] mx-auto'>
        {/* Logo */}
        <Link to={import.meta.env.BASE_URL}>
          <Flex
            align='center'
            gap={8}
            className='font-mono text-2xl leading-8 capitalize'>
            <span className='text-brand-primary'>{'<C/>'}</span>
            <span className='text-white'>PolZ</span>
          </Flex>
        </Link>

        {/* Navigation - Desktop */}
        <nav className='hidden md:flex items-center gap-16'>
          <Flex gap={32} className='font-mono text-base capitalize'>
            {MENUS.map(menu => (
              <Link
                key={menu.name}
                to={menu.href}
                className={cn([
                  'text-white hover:text-brand-secondary transition-colors',
                  pathname === menu.href && 'text-brand-primary',
                ])}>
                {menu.name}
              </Link>
            ))}
          </Flex>

          <Flex align='center' gap={64}>
            <button className='w-5 h-5 text-white hover:text-brand-primary transition-colors'></button>

            <Flex gap={32}>
              <Link
                to={LINKED_IN_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='w-5 h-5 text-brand-primary hover:text-brand-secondary transition-colors'>
                <LinkedInLogo width={18} height={18} />
              </Link>
              <Link
                to={GITHUB_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='w-5 h-5 text-brand-primary hover:text-brand-secondary transition-colors'>
                <GitHubLogo width={18} height={18} />
              </Link>
            </Flex>
          </Flex>
        </nav>

        {/* Mobile Menu Button */}
        <button className='md:hidden text-white'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </Flex>
    </header>
  )
}
