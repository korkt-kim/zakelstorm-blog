export interface Frontmatter {
  title: string
  description: string
  category: string
  thumbnail?: string
  createdAt: string
}

export interface Article extends Frontmatter {
  content: string
  fileName: string
}
