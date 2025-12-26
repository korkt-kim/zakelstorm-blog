import fg from 'fast-glob'
import fs from 'fs/promises'
import path from 'path'

export const getSlugsFromMarkdown = async (dir: string) => {
  const files = await fg('**/*.{md,mdx}', {
    cwd: dir,
    absolute: true,
    onlyFiles: true,
  })

  return files.map(file => {
    const relativePath = file.replace(dir, '')

    return relativePath.split('/').filter(Boolean)
  })
}

export const gerateJsonFile = async (
  dir: string,
  fileName: string,
  content: object
) => {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {
    console.log('dir already exists')
  }

  await fs.access(dir)

  fs.writeFile(
    path.join(dir, `${fileName}.json`),
    JSON.stringify(content),
    'utf-8'
  )
}

export const removeExtension = (fileName: string) => {
  return fileName.substring(0, fileName.lastIndexOf('.'))
}
