import GitHubLogo from '@assets/images/github.svg?react'
import LinkedInLogo from '@assets/images/linkedin.svg?react'
import { Link } from 'react-router'
import { GITHUB_URL, LINKED_IN_URL } from '~/const'
import { Flex } from './shared/Flex'

export function Footer() {
  const copyright = `© 2023-${new Date().getFullYear()} PolZ. All rights reserved.`

  return (
    <footer className='border-t border-grey/20 py-[24px] w-full'>
      <div className='max-w-[1920px] mx-auto px-4 md:px-32'>
        {/* Desktop Layout */}
        <Flex align='center' justify='space-between' className='hidden md:flex'>
          <p className='font-ubuntu font-light text-base text-white'>
            {copyright}
          </p>

          {/* Social Media */}
          <Flex gap={32}>
            <Link
              to={LINKED_IN_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='text-black bg-brand-secondary p-2 rounded-full hover:bg-brand-primary transition-colors'>
              <LinkedInLogo width={24} height={24} fill='black' />
            </Link>
            <Link
              to={GITHUB_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='text-black bg-brand-secondary p-2 rounded-full hover:bg-brand-primary transition-colors'>
              <GitHubLogo width={24} height={24} fill='black' />
            </Link>
          </Flex>
        </Flex>

        {/* Mobile Layout */}
        <Flex
          vertical
          align='center'
          gap={24}
          className='flex md:hidden text-center'>
          {/* Social Media */}
          <Flex gap={32}>
            <Link
              to={LINKED_IN_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='text-black bg-brand-secondary p-2 rounded-full hover:bg-brand-primary transition-colors'>
              <LinkedInLogo width={18} height={18} />
            </Link>
            <Link
              to={GITHUB_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='text-black bg-brand-secondary p-2 rounded-full hover:bg-brand-primary transition-colors'>
              <GitHubLogo width={18} height={18} />
            </Link>
          </Flex>

          {/* Designer Credit */}
          <Flex gap={4} className='font-ubuntu font-light text-base text-white'>
            {copyright}
          </Flex>
        </Flex>
      </div>
    </footer>
  )
}
