// import { getArticleContent } from '~/app/queries/article'
import CalendarLogo from '@assets/images/calendar.svg?react'
import { getArticleContent } from '../queries/article'
import type { Route } from './+types/_commonLayout.articles.$category._articleLayout.$article'

export async function loader({ params }: Route.LoaderArgs) {
  const article = await getArticleContent(params.article)

  return { article }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    'ko-KR',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  return (
    <div className='mx-auto max-w-4xl px-4 py-12'>
      {/* Article Header */}
      <header className='mb-12 border-b border-gray-200 pb-8'>
        {/* Category Badge */}
        <div className='mb-4'>
          <span className='inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700'>
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1 className='mb-6 text-4xl font-bold leading-tight text-gray-300 sm:text-5xl'>
          {article.title}
        </h1>

        {/* Meta Information */}
        <div className='flex flex-wrap items-center gap-4 text-sm text-gray-400'>
          <div className='flex items-center gap-1.5'>
            <CalendarLogo fill='grey' />
            <time dateTime={article.createdAt}>{formattedDate}</time>
          </div>

          <div className='flex items-center gap-1.5'>
            <span>{article.readingTime}Min to Read</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article
        className='prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg'
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  )
}
