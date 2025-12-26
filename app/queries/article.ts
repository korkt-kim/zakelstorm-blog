import fg from 'fast-glob'
import fsExtra from 'fs-extra/esm'
import path from 'path'
import { DIRECTORIES } from '~/contents/consts'
import type { Article } from '~/contents/types'

const GENERATED_DIR = path.join(process.cwd(), DIRECTORIES.CONTENTS_GENERATED)

export const getAllArticles = async () => {
  const articleFiles = await fg('**/*.json', {
    cwd: GENERATED_DIR,
    absolute: true,
    onlyFiles: true,
  })

  return await Promise.all(
    articleFiles.map<Promise<Article>>(articleFile => {
      return fsExtra.readJSON(articleFile)
    })
  )
}

export const getArticleContent = async (fileName: string): Promise<Article> => {
  const article = await fsExtra.readJson(
    path.join(GENERATED_DIR, `${fileName}.json`)
  )

  return article
}
