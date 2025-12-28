import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import { DIRECTORIES } from './contents/consts'

export default defineConfig({
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
          src: DIRECTORIES.FONTS,
          dest: '',
        },
      ],
    }),
  ],
})
