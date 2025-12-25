import { RecentArticles } from '~/app/components/RecentArticles'
import { getAllArticles } from '~/app/queries/article'
import { Hero } from '../components/Hero'
import type { Route } from './+types/_commonLayout._index'

export function meta() {
  return [{ title: 'PolZ - Frontend Developer' }]
}

export async function loader() {
  const articles = (await getAllArticles()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return { articles }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Hero />

      <RecentArticles articles={loaderData.articles} />
    </>
  )
}
