import GitHubLogo from '@assets/images/github.svg?react'
import LinkedInLogo from '@assets/images/linkedin.svg?react'
import { Link, useLocation } from 'react-router'
import { GITHUB_URL, LINKED_IN_URL } from '~/app/const'
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

  const isMatchedMenu = (menu: (typeof MENUS)[number]) => {
    switch (menu.href) {
      case '/':
        return pathname === menu.href
      default:
        return pathname.startsWith(menu.href)
    }
  }

  return (
    <header className='bg-bg-dark px-8 py-0 w-full border-b border-grey/20'>
      <Flex
        align='center'
        justify='space-between'
        className='py-[24px] w-full max-w-[1920px] mx-auto'>
        {/* Logo */}
        <Link className='hidden md:block' to={import.meta.env.BASE_URL}>
          <Flex
            align='center'
            gap={8}
            className='font-mono text-2xl leading-8 capitalize'>
            <span className='text-brand-primary'>{'<C/>'}</span>
            <span className='text-white'>PolZ</span>
          </Flex>
        </Link>

        <Flex
          as='nav'
          align='center'
          justify='space-between'
          className='w-full md:w-auto md:ml-auto'
          gap={64}>
          <Flex gap={32} className='font-mono text-base capitalize'>
            {MENUS.map(menu => (
              <Link
                key={menu.name}
                to={menu.href}
                className={cn([
                  'text-white hover:text-brand-secondary transition-colors',
                  isMatchedMenu(menu) && 'text-brand-primary',
                ])}>
                {menu.name}
              </Link>
            ))}
          </Flex>

          <Flex align='center' justify='end' gap={64}>
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
        </Flex>
      </Flex>
    </header>
  )
}
