import ClockLogo from '@assets/images/clock.svg?react'
import { Flex } from './shared/Flex'

export const ReadingTimeTag = ({ readingTime }: { readingTime: number }) => {
  return (
    <Flex
      align='center'
      gap={5}
      className='inline-flex items-center wf-base-80'>
      <ClockLogo fill='grey' />
      <span>{readingTime} min read</span>
    </Flex>
  )
}
