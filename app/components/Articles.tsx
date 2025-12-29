import { Link } from 'react-router'
import type { Article } from '~/contents/types'
import { cn } from '~/utils/cn'
import { CategoryTag } from './CategoryTag'
import { DateTag } from './DateTag'
import { ReadingTimeTag } from './ReadingTimeTag'
import { Flex, type FlexProps } from './shared/Flex'

export interface ArticlesProps extends FlexProps {
  articles: Article[]
}

export function Articles({ articles, className, ...props }: ArticlesProps) {
  return (
    <Flex
      vertical
      align='center'
      gap={16}
      className={cn(['max-w-[1920px] mx-auto', className])}
      {...props}>
      {articles.map(article => {
        return (
          <Link
            key={article.category + article.fileName}
            to={`/articles/${article.category}/${article.fileName}`}>
            <Flex
              vertical
              gap={16}
              className='h-full border border-white/30 p-[16px] rounded-lg hover:bg-white/10 transition-colors'>
              <Flex vertical align='start' gap={16} className='md:flex-row '>
                {/* {article.thumbnail && (
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
                )} */}

                <Flex vertical gap={24}>
                  <h3 className='font-ubuntu text-2xl md:text-[32px] md:leading-9 text-brand-primary p-0 m-0'>
                    {article.title}
                  </h3>

                  <p className='font-ubuntu font-light text-base line-clamp-2'>
                    {article.description}
                  </p>
                </Flex>
              </Flex>
              <Flex
                wrap
                gap={8}
                align='center'
                className='font-ubuntu font-light text-sm text-white mt-auto'>
                <CategoryTag category={article.category} />
                <DateTag date={article.createdAt} />
                <ReadingTimeTag readingTime={article.readingTime} />
              </Flex>
            </Flex>
          </Link>
        )
      })}
    </Flex>
  )
}
