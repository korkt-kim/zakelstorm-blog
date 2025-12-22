import { Link } from 'react-router'
import { Flex } from './shared/Flex'

export function Blogs() {
  return (
    <section id='blogs' className='bg-bg-dark px-4 md:px-16 py-16 w-full'>
      <Flex vertical align='center' gap={64} className='max-w-[1920px] mx-auto'>
        {/* Section Title */}
        <Flex vertical align='center' gap={16} className='w-full'>
          <h2 className='font-ubuntu text-4xl md:text-[64px] md:leading-[72px] capitalize text-brand-primary'>
            Blogs
          </h2>
          <div className='w-full max-w-xs h-px bg-brand-primary' />
          <p className='font-mono text-base leading-5 text-white text-center max-w-2xl'>
            My thoughts on technology and business, welcome to subscribe
          </p>
        </Flex>

        {/* Blog Post */}
        <div className='w-full border-t border-b border-grey/30 py-8'>
          <Flex vertical align='start' gap={32} className='md:flex-row px-4'>
            {/* Blog Image */}
            <div className='w-full md:w-[120px] h-[120px] rounded-lg overflow-hidden bg-grey shrink-0'>
              <img
                src='/images/blog-thumbnail.jpg'
                alt='Blog post'
                className='w-full h-full object-cover'
                onError={e => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>

            {/* Blog Content */}
            <Flex vertical gap={24} className='flex-1'>
              <h3 className='font-ubuntu text-2xl md:text-[32px] md:leading-9 text-brand-primary'>
                What does it take to become a web developer?
              </h3>

              <p className='font-ubuntu font-light text-base leading-[18px] text-white'>
                Web development, also known as website development, encompasses
                a variety of tasks and processes involved in creating websites
                for the internet…
              </p>

              {/* Read More */}
              <Flex
                align='start'
                gap={4}
                className='group cursor-pointer w-fit'>
                <Flex vertical gap={4}>
                  <span className='font-ubuntu font-light text-base text-brand-primary group-hover:text-brand-secondary transition-colors'>
                    Read More
                  </span>
                  <div className='h-px bg-brand-primary group-hover:bg-brand-secondary transition-colors' />
                </Flex>
                <span className='font-ubuntu font-light text-base text-brand-primary'>
                  {'>>'}
                </span>
              </Flex>

              {/* Info Tags */}
              <Flex
                wrap
                gap={8}
                align='center'
                className='font-ubuntu font-light text-sm text-white capitalize'>
                <span className='bg-grey px-2 py-1 rounded-2xl'>
                  Web Developer
                </span>
                <Flex gap={8}>
                  <span className='font-medium'>Text</span>
                  <span>PolZ</span>
                </Flex>
                <Flex gap={8}>
                  <span className='font-medium'>Date</span>
                  <span>10.Oct 2023</span>
                </Flex>
                <Flex gap={8}>
                  <span className='font-medium'>Read</span>
                  <span>1 Min</span>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </div>

        {/* Buttons */}
        <Flex wrap gap={32} justify='center'>
          <Link
            to='/articles'
            className='bg-brand-primary text-bg-dark font-ubuntu text-xl leading-6 px-8 py-4 rounded-[32px] capitalize hover:bg-brand-secondary transition-colors'>
            View More
          </Link>
        </Flex>
      </Flex>
    </section>
  )
}
