import { input, select } from '@inquirer/prompts'
import dayjs from 'dayjs'
import fs from 'fs/promises'
import path from 'path'

const CONTENTS_DIR = path.join(process.cwd(), 'contents')
const IGNORED_CONTENT_DIRS = ['.generated', 'images', 'etc']

const getCategories = async () => {
  const entries = await fs.readdir(CONTENTS_DIR, { withFileTypes: true })

  return entries
    .filter(
      entry => entry.isDirectory() && !IGNORED_CONTENT_DIRS.includes(entry.name)
    )
    .map(entry => entry.name)
}

const main = async () => {
  try {
    const categories = await getCategories()

    if (categories.length === 0) {
      console.error('No categories found in contents directory.')
      process.exit(1)
    }

    const category = await select({
      message: 'Select a category',
      choices: categories.map(c => ({ name: c, value: c })),
    })

    const title = await input({
      message: 'Enter title:',
      validate: input => input.length > 0 || 'Title is required',
    })

    const description = await input({
      message: 'Enter description (optional):',
    })

    const createdAtInput = await input({
      message: 'Enter created date (Enter for now):',
    })

    const createdAt = createdAtInput ? dayjs(createdAtInput) : dayjs()

    if (!createdAt.isValid()) {
      console.error('Invalid date format')
      process.exit(1)
    }

    const slug = title.trim().toLowerCase().replace(/ /g, '-')
    const fileName = `${slug}.md`
    const targetDir = path.join(CONTENTS_DIR, category)
    const targetPath = path.join(targetDir, fileName)

    await fs.mkdir(targetDir, { recursive: true })

    const content = `---
title: '${title}'
description: '${description}'
createdAt: '${createdAt.toISOString()}'
---

`

    await fs.writeFile(targetPath, content, 'utf-8')

    console.log(`\n✅ Successfully created: ${targetPath}`)
  } catch (error) {
    console.error('Error creating article template:', error)
    process.exit(1)
  }
}

main()
