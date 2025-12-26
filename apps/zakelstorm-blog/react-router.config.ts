import type { Config } from '@react-router/dev/config'
import { vercelPreset } from '@vercel/react-router/vite'
import path from 'path'
import { DIRECTORIES } from './contents/consts'
import { getSlugsFromMarkdown, removeExtension } from './utils/fs'

const CONTENTS_DIR = path.join(process.cwd(), DIRECTORIES.CONTENTS)

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  async prerender({ getStaticPaths }) {
    const paths = await getStaticPaths()
    const slugs = await getSlugsFromMarkdown(CONTENTS_DIR)

    return [
      ...paths,
      ...slugs.map(slug => `/articles/${slug[0]}/${removeExtension(slug[1])}`),
    ]
  },
  presets: process.env.VERCEL ? [vercelPreset()] : [],
} satisfies Config
