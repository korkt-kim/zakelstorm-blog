import CalendarLogo from '@assets/images/calendar.svg?react'
import { formatDate } from '~/utils/format'
import { Flex } from './shared/Flex'

export const DateTag = ({ date }: { date: string }) => {
  return (
    <Flex
      gap={5}
      align='center'
      className='inline-flex rounded px-[12px] py-[4px]'>
      <CalendarLogo fill='#43454d' />
      <time dateTime={date}>{formatDate(date)}</time>
    </Flex>
  )
}
