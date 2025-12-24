import { getArticleContent } from '~/queries/article'
import type { Route } from './+types/_commonLayout.articles.$category._articleLayout.$article'

export async function loader({ params }: Route.LoaderArgs) {
  const article = await getArticleContent(params.article)

  return { article }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <article
        dangerouslySetInnerHTML={{ __html: loaderData.article.content }}
      />
    </div>
  )
}
