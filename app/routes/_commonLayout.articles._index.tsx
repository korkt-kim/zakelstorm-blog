import { Articles } from '~/components/Articles'
import { Flex } from '~/components/shared/Flex'
import { getAllArticles } from '~/queries/article'
import type { Route } from './+types/_commonLayout.articles._index'

export async function loader() {
  const articles = (await getAllArticles()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return { articles }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <Flex vertical>
      <Flex vertical align='center' gap={16} className='w-full'>
        <h2 className='font-ubuntu text-4xl md:text-[64px] md:leading-[72px] capitalize text-brand-primary'>
          Articles
        </h2>
        <div className='w-full max-w-xs h-px bg-brand-primary' />
        <p className='font-mono text-base leading-5 text-white text-center max-w-2xl'>
          My thoughts on technology and business, welcome to subscribe
        </p>
      </Flex>
      <Articles articles={loaderData.articles} />
    </Flex>
  )
}
