import { Link } from 'react-router'
import type { Article } from '~/contents/types'
import { Flex } from './shared/Flex'

export function Articles({ articles }: { articles: Article[] }) {
  return (
    <Flex vertical align='center' gap={64} className='max-w-[1920px] mx-auto'>
      {/* Blog Post */}
      {articles.map(article => {
        return (
          <div
            key={article.category + article.fileName}
            className='w-full border-t border-b border-grey/30 py-8'>
            <Flex vertical align='start' gap={32} className='md:flex-row px-4'>
              {/* Blog Image */}
              {article.thumbnail && (
                <div className='hidden md:block md:w-[120px] h-[120px] rounded-lg overflow-hidden bg-grey shrink-0'>
                  <img
                    src={article.thumbnail}
                    alt='Blog post'
                    className='w-full h-full object-cover'
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}

              {/* Blog Content */}
              <Flex vertical gap={24} className='flex-1'>
                <h3 className='font-ubuntu text-2xl md:text-[32px] md:leading-9 text-brand-primary'>
                  {article.title}
                </h3>

                <p className='font-ubuntu font-light text-base leading-[18px] text-white'>
                  {article.description}
                </p>

                {/* Read More */}
                <Flex
                  align='start'
                  gap={4}
                  className='group cursor-pointer w-fit'>
                  <Flex vertical gap={4}>
                    <Link
                      to={`/articles/${article.category}/${article.fileName}`}
                      className='font-ubuntu font-light text-base text-brand-primary group-hover:text-brand-secondary transition-colors'>
                      Read More
                    </Link>
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
                    {article.category}
                  </span>
                  <Flex gap={8}>
                    <span className='font-medium'>Text</span>
                    <span>PolZ</span>
                  </Flex>
                  <Flex gap={8}>
                    <span className='font-medium'>Date</span>
                    <span>{article.createdAt}</span>
                  </Flex>
                  <Flex gap={8}>
                    <span className='font-medium'>Read</span>
                    <span>{article.readingTime} Min</span>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </div>
        )
      })}
    </Flex>
  )
}
