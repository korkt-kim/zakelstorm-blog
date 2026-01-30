import { input, select } from '@inquirer/prompts'
import dayjs from 'dayjs'
import fs from 'fs/promises'
import path from 'path'

const CATEGORIES = ['etc', 'clean-code', 'book', 'algorithm']

const category = await select({
  message: '카테고리를 선택해주세요',
  choices: CATEGORIES.map(category => ({ name: category, value: category })),
})

const title = await input({
  message: '제목을 입력해주세요:',
  validate: input => input.length > 0 || '제목은 필수입니다',
})
const description = await input({
  message: '설명을 입력해주세요',
})

const createdAt = await input({
  message: '날짜를 입력해주세요',
  validate: value =>
    !value || dayjs(value).isValid() || '날짜가 유효하지 않습니다.',
})

fs.writeFile(
  path.join(process.cwd(), 'contents', category, `${title}.md`),
  `---
title: ${title}
description: ${description}
createdAt: ${dayjs(createdAt || undefined).toISOString()}
category: ${category}
---
  `,
  'utf-8'
)
