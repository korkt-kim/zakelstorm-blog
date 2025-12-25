// import { getArticleContent } from '~/app/queries/article'
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
        <h1 className='mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl'>
          {article.title}
        </h1>

        {/* Meta Information */}
        <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600'>
          <div className='flex items-center gap-1.5'>
            <svg
              className='h-4 w-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
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
