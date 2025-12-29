// import { getArticleContent } from '~/app/queries/article'
import PencilLogo from '@assets/images/pencil.svg?react'
import { Link } from 'react-router'
import { CONTENT_EDIT_URL } from '~/contents/consts'
import { CategoryTag } from '../components/CategoryTag'
import { DateTag } from '../components/DateTag'
import { ReadingTimeTag } from '../components/ReadingTimeTag'
import { Flex } from '../components/shared/Flex'
import { getArticleContent } from '../queries/article'
import type { Route } from './+types/_commonLayout.articles.$category._articleLayout.$article'

export function meta({ loaderData }: Route.MetaArgs) {
  const ogImageUrl = `${import.meta.env.PROD ? 'https' : 'http'}:${import.meta.env.VITE_APP_BASE_URL}/og-image?title=${encodeURIComponent(loaderData.article.title)}`

  return [
    { title: loaderData.article.title },
    { property: 'og:title', content: loaderData.article.title },
    { property: 'og:description', content: loaderData.article.description },
    { property: 'og:image', content: ogImageUrl },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:image', content: ogImageUrl },
  ]
}

export async function loader({ params }: Route.LoaderArgs) {
  const article = await getArticleContent(params.article)

  return { article }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData

  return (
    <div className='mx-auto max-w-4xl px-4 py-12'>
      {/* Article Header */}
      <header className='mb-12 border-b border-gray-200 pb-8'>
        <CategoryTag category={article.category} />

        {/* Title */}
        <Flex justify='space-between'>
          <h1 className='mb-6 text-4xl font-bold leading-tight text-gray-300 sm:text-5xl'>
            {article.title}
          </h1>
          <Link
            to={`${CONTENT_EDIT_URL}/${article.githubPath}`}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1.5 text-blue-600 hover:underline'>
            <PencilLogo fill='grey' />
          </Link>
        </Flex>

        {/* Meta Information */}
        <div className='flex flex-wrap items-center gap-4 text-sm text-gray-400'>
          <DateTag date={article.createdAt} />

          <ReadingTimeTag readingTime={article.readingTime} />
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
