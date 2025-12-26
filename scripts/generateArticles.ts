import path from 'path'
import type { Article, Frontmatter } from '~/contents/types'
import {
  gerateJsonFile,
  getSlugsFromMarkdown,
  removeExtension,
} from '~/utils/fs'

import rehypeShiki from '@shikijs/rehype'
import { execSync } from 'child_process'
import type { Stats } from 'fs'
import fs from 'fs/promises'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import type { Node } from 'unist'
import type { VFile } from 'vfile'
import { DIRECTORIES } from '~/contents/consts'
import { remarkReadingTime } from '~/libs/remark-reading-time'

const REPO_ROOT = execSync('git rev-parse --show-toplevel').toString().trim()
const CONTENTS_DIR = path.join(process.cwd(), DIRECTORIES.CONTENTS)
const GENERATED_DIR = path.join(process.cwd(), DIRECTORIES.CONTENTS_GENERATED)

const generateArticles = async () => {
  const res = await Promise.all(await getAllArticleContents(CONTENTS_DIR))

  res
    .map<Article>(([fileName, file]) => ({
      ...file.data.frontmatter,
      fileName: removeExtension(fileName),
      githubPath: path.relative(
        REPO_ROOT,
        path.join(CONTENTS_DIR, file.data.frontmatter.category, fileName)
      ),
      content: file.value.toString(),
    }))
    .forEach(item => {
      const fileName = item.fileName
      gerateJsonFile(GENERATED_DIR, fileName, item)
    })
}

const getAllArticleContents = async (dir: string) => {
  const slugs = await getSlugsFromMarkdown(dir)

  return slugs.map(async slug => {
    if (slug.length !== 2) {
      throw new Error('Invalid slug')
    }

    const [category, fileName] = slug

    const filePath = path.join(CONTENTS_DIR, category, fileName)
    const stats = await fs.stat(filePath)

    const result = await unified()
      .use(remarkParse)
      .use(remarkReadingTime, {
        name: 'frontmatter',
        attribute: 'frontmatter.readingTime',
      })
      .use(changeImagePaths)
      .use(remarkGfm)
      .use(remarkFrontmatter, ['yaml', 'toml'])
      .use(appendFrontmatter(category, stats))
      .use(remarkRehype)
      .use(rehypeShiki, {
        themes: {
          light: 'vitesse-light',
          dark: 'vitesse-dark',
        },
      })
      .use(rehypeStringify)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings)
      .process(await fs.readFile(filePath, 'utf-8'))

    return [
      fileName,
      result as Omit<VFile, 'data'> & {
        data: VFile['data'] & { frontmatter: Frontmatter }
      },
    ] as const
  })
}

const getImageNodes = (tree: Node) => {
  const acc = []
  if (tree.type === 'image') {
    acc.push(tree)
  }

  if ('children' in tree && Array.isArray(tree.children)) {
    ;(tree.children as Node[]).forEach(child => {
      acc.push(...getImageNodes(child))
    })
  }

  return acc
}

const changeImagePaths = () => (tree: Node) => {
  if ('children' in tree === false) {
    return tree
  }

  const imageNodes = getImageNodes(tree)

  imageNodes.forEach(imageNode => {
    if ('url' in imageNode === false || typeof imageNode.url !== 'string') {
      return
    }
    imageNode.url = imageNode.url
      .replaceAll(
        path.join(CONTENTS_DIR, 'images'),
        `/${path.relative(
          DIRECTORIES.BUILD_CLIENT,
          DIRECTORIES.BUILD_CLIENT_ARTICLES_IMAGES
        )}`
      )
      .replaceAll(
        '../images',
        `/${path.relative(
          DIRECTORIES.BUILD_CLIENT,
          DIRECTORIES.BUILD_CLIENT_ARTICLES_IMAGES
        )}`
      )
  })

  return tree
}

const isImageNode = (node: Node): node is Node & { url: string } => {
  return 'url' in node && typeof node.url === 'string'
}

const appendFrontmatter =
  (category: string, stats: Stats) => () => (tree: Node, file: VFile) => {
    if ('children' in tree === false) {
      return tree
    }

    const frontmatterNode = (tree.children as Node[]).find(
      node => node.type === 'yaml' || node.type === 'toml'
    )

    if (
      !frontmatterNode ||
      'value' in frontmatterNode === false ||
      typeof frontmatterNode.value !== 'string'
    ) {
      throw new Error('Invalid frontmatter')
    }
    const imageNodes = getImageNodes(tree)

    Object.assign<{ readingTime: number }, Omit<Frontmatter, 'readingTime'>>(
      file.data.frontmatter as { readingTime: number },
      {
        title: '',
        description: '',
        category,
        thumbnail:
          imageNodes[0] && isImageNode(imageNodes[0]) ? imageNodes[0].url : '',
        createdAt: stats.birthtime.toISOString(),
        ...frontmatterNode.value
          .split('\n')
          .reduce<Record<string, string>>((acc, item) => {
            const [key, value] = item.split(':')
            acc[key.trim()] = value.trim()

            return acc
          }, {}),
      }
    )
  }

generateArticles()
