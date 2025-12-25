import type { Article } from '~/contents/types'
import { Link } from 'react-router'
import { Articles } from './Articles'
import { Flex } from './shared/Flex'

export const ARTICLES_PREVIEW_LENGTH = 5

export interface RecentArticlesProps {
  articles: Article[]
  length?: number
}

export function RecentArticles({
  articles,
  length = ARTICLES_PREVIEW_LENGTH,
}: RecentArticlesProps) {
  return (
    <section id='articles' className='bg-bg-dark px-4 md:px-16 py-16 w-full'>
      <Flex vertical align='center' gap={64} className='max-w-[1920px] mx-auto'>
        {/* Section Title */}
        <Flex vertical align='center' gap={16} className='w-full'>
          <h2 className='font-ubuntu text-4xl md:text-[64px] md:leading-[72px] capitalize text-brand-primary'>
            Recent Articles
          </h2>
          <div className='w-full max-w-xs h-px bg-brand-primary' />
        </Flex>

        {/* Blog Post */}
        <Articles articles={articles.slice(0, length)} />

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
