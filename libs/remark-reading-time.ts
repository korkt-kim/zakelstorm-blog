import getReadingTime from 'reading-time'
import type { Node } from 'unist'
import { visit } from 'unist-util-visit'
import type { VFile } from 'vfile'

export const remarkReadingTime = ({ attribute }: { attribute: string }) => {
  return (info: Node, file: VFile) => {
    const readingTimeObject = createReadingTimeObject(attribute, info)
    Object.assign(file.data, readingTimeObject)
  }
}

const createReadingTimeObject = (attribute: string, info: Node) => {
  const attributes = attribute.split('.')
  let text = ''
  visit(info, ['text', 'code'], (node: Node & { value?: string }) => {
    text += node.value
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const current: Record<string, any> = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let temp: Record<string, any> = current
  attributes.forEach((attribute, index) => {
    if (index === attributes.length - 1) {
      temp[attribute] = Math.ceil(getReadingTime(text).minutes)
    } else {
      temp[attribute] = {}
      temp = temp[attribute]
    }
  })

  return current
}
