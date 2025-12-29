import { Articles } from '~/app/components/Articles'
import { Flex } from '~/app/components/shared/Flex'
import { getAllArticles } from '~/app/queries/article'
import type { Route } from './+types/_commonLayout.articles._index'

export async function loader() {
  const articles = (await getAllArticles()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return { articles }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <Flex vertical gap={64}>
      <Flex vertical align='center' gap={16} className='w-full'>
        <h2 className='font-ubuntu text-4xl md:text-[64px] md:leading-[72px] capitalize text-brand-primary'>
          Articles
        </h2>
        <div className='w-full max-w-xs h-px bg-brand-primary' />
        <p className='font-mono text-base leading-5 text-white text-center max-w-2xl'>
          My thoughts on technology and business
        </p>
      </Flex>
      <Articles
        vertical={false}
        wrap
        articles={loaderData.articles}
        className='max-w-[calc(min(100%,1200px))] mx-auto [&_a]:w-full md:[&_a]:w-[calc(50%-8px)] items-stretch'
      />
    </Flex>
  )
}
