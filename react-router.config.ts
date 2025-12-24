import type { Config } from '@react-router/dev/config'
import path from 'path'
import { getSlugsFromMarkdown, removeExtension } from 'utils/fs'

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  prerender: async ({ getStaticPaths }) => {
    const paths = await getStaticPaths()

    const slugs = await getSlugsFromMarkdown(
      path.join(process.cwd(), 'contents/')
    )

    return [
      '/',
      ...paths,
      ...slugs.map(slug => `/articles/${slug[0]}/${removeExtension(slug[1])}`),
    ]
  },
} satisfies Config
