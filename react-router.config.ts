import type { Config } from '@react-router/dev/config'
import { sentryOnBuildEnd } from '@sentry/react-router'
import { vercelPreset } from '@vercel/react-router/vite'
import path from 'path'
import { DIRECTORIES } from './contents/consts'
import { getSlugsFromMarkdown, removeExtension } from './utils/fs'

const CONTENTS_DIR = path.join(process.cwd(), DIRECTORIES.CONTENTS)

const ignoredPrerenderPaths = ['/og-image', '/robots.txt']

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  async prerender({ getStaticPaths }) {
    const paths = (await getStaticPaths()).filter(
      path => !ignoredPrerenderPaths.includes(path)
    )
    const slugs = await getSlugsFromMarkdown(CONTENTS_DIR)

    return [
      ...paths,
      ...slugs.map(slug => `/articles/${slug[0]}/${removeExtension(slug[1])}`),
    ]
  },

  presets: process.env.VERCEL ? [vercelPreset()] : [],

  buildEnd: async ({
    viteConfig: viteConfig,
    reactRouterConfig: reactRouterConfig,
    buildManifest: buildManifest,
  }) => {
    await sentryOnBuildEnd({
      viteConfig: viteConfig,
      reactRouterConfig: reactRouterConfig,
      buildManifest: buildManifest,
    })
  },
} satisfies Config
