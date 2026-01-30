import { reactRouter } from '@react-router/dev/vite'
import { sentryReactRouter } from '@sentry/react-router'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import { DIRECTORIES } from './contents/consts'

export default defineConfig(config => ({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    svgr(),
    viteStaticCopy({
      targets: [
        {
          src: DIRECTORIES.CONTENTS_IMAGES,
          dest: path.relative(
            DIRECTORIES.BUILD_CLIENT,
            DIRECTORIES.BUILD_CLIENT_ARTICLES
          ),
        },
        {
          src: DIRECTORIES.IMAGES,
          dest: '',
        },
        {
          src: DIRECTORIES.FONTS,
          dest: '',
        },
        {
          src: DIRECTORIES.LOTTIES,
          dest: '',
        },
      ],
    }),
    sentryReactRouter(
      {
        org: 'sentry',
        project: 'blog',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
      config
    ),
  ],
  build: {
    sourcemap: config.mode === 'development',
  },
}))
