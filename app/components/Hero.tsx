import { Flex } from './shared/Flex'

export function Hero() {
  return (
    <section id='home' className='bg-bg-dark px-4 md:px-32 py-16 w-full'>
      <Flex
        gap={64}
        wrap
        align='center'
        justify='center'
        className='max-w-[1920px] mx-auto md:gap-32'>
        <Flex
          vertical
          gap={32}
          align='start'
          justify='center'
          className='bg-bg-dark border-4 border-white rounded-tl-[160px] rounded-br-[160px] shadow-[-4px_-4px_2px_0px_#12f7d6] p-6 w-80 h-[520px]'>
          <Flex vertical gap={32} align='center' className='w-full'>
            <Flex vertical gap={16} align='center'>
              {/* Profile Photo */}
              <div className='w-24 h-24 rounded-full border-[3px] border-brand-primary overflow-hidden bg-grey'>
                <img
                  src='/images/avatar.jpeg'
                  alt='PolZ'
                  className='w-full h-full object-cover'
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>

              {/* Name */}
              <Flex vertical align='center' className='text-white'>
                <h2 className='font-mono font-medium text-[32px] leading-[42px] capitalize'>
                  PolZ
                </h2>
                <p className='font-mono text-sm leading-[18px]'>
                  Web frontend developer
                </p>
              </Flex>
            </Flex>

            {/* Info */}
            <Flex vertical gap={16} align='start'>
              <Flex vertical gap={16}>
                <Flex align='center' gap={16}>
                  <svg
                    className='w-3.5 h-3.5 text-brand-primary'
                    viewBox='0 0 14 14'
                    fill='currentColor'>
                    <path d='M12.25 2.25H1.75C1.4375 2.25 1.1875 2.5 1.1875 2.8125V11.1875C1.1875 11.5 1.4375 11.75 1.75 11.75H12.25C12.5625 11.75 12.8125 11.5 12.8125 11.1875V2.8125C12.8125 2.5 12.5625 2.25 12.25 2.25ZM11.375 3.6875L7 6.5625L2.625 3.6875V3.125L7 6L11.375 3.125V3.6875Z' />
                  </svg>
                  <span className='font-mono text-sm text-white'>
                    gnscott6@naver.com
                  </span>
                </Flex>
                <Flex align='center' gap={16}>
                  <svg
                    className='w-3.5 h-3.5 text-brand-primary'
                    viewBox='0 0 14 14'
                    fill='currentColor'>
                    <path d='M7 1.75C4.92875 1.75 3.25 3.42875 3.25 5.5C3.25 8.3125 7 12.25 7 12.25C7 12.25 10.75 8.3125 10.75 5.5C10.75 3.42875 9.07125 1.75 7 1.75ZM7 7C6.17157 7 5.5 6.32843 5.5 5.5C5.5 4.67157 6.17157 4 7 4C7.82843 4 8.5 4.67157 8.5 5.5C8.5 6.32843 7.82843 7 7 7Z' />
                  </svg>
                  <span className='font-mono text-sm text-white'>
                    South Korea
                  </span>
                </Flex>
                <Flex align='center' gap={16}>
                  <svg
                    className='w-3.5 h-3.5 text-brand-primary'
                    viewBox='0 0 14 14'
                    fill='currentColor'>
                    <path d='M11.375 2.625H10.75V1.4375C10.75 1.125 10.5 0.875 10.1875 0.875C9.875 0.875 9.625 1.125 9.625 1.4375V2.625H4.375V1.4375C4.375 1.125 4.125 0.875 3.8125 0.875C3.5 0.875 3.25 1.125 3.25 1.4375V2.625H2.625C1.6875 2.625 0.9375 3.375 0.9375 4.3125V11.375C0.9375 12.3125 1.6875 13.0625 2.625 13.0625H11.375C12.3125 13.0625 13.0625 12.3125 13.0625 11.375V4.3125C13.0625 3.375 12.3125 2.625 11.375 2.625Z' />
                  </svg>
                  <span className='font-mono text-sm text-white'>
                    Full-time / Hyundai-Motors
                  </span>
                </Flex>
              </Flex>

              {/* Tags */}
              <Flex gap={16} wrap>
                {['JS/TS', 'REACT', 'SDK'].map(tech => (
                  <span
                    key={tech}
                    className='bg-brand-primary text-bg-dark font-mono text-sm px-2 rounded-lg'>
                    {tech}
                  </span>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex vertical gap={64} align='center' className='max-w-[648px]'>
          <Flex vertical gap={32}>
            <Flex vertical>
              <span className='font-mono text-sm text-brand-secondary'>
                {'<h1>'}
              </span>
              <div className='pl-4'>
                <h1 className='font-ubuntu text-4xl md:text-[64px] md:leading-[72px] capitalize text-white'>
                  Hey
                </h1>
                <h1 className='font-ubuntu text-4xl md:text-[64px] md:leading-[72px] capitalize'>
                  <span className='text-white'>I&apos;m </span>
                  <span className='text-brand-primary'>PolZ</span>
                  <span className='text-white'>,</span>
                </h1>
                <h1 className='font-ubuntu text-4xl md:text-[64px] md:leading-[72px] capitalize text-white'>
                  Web frontend developer
                </h1>
              </div>
              <span className='font-mono text-sm text-brand-secondary'>
                {'</h1>'}
              </span>
            </Flex>

            {/* Paragraph */}
            <Flex vertical gap={16}>
              <span className='font-mono text-sm text-brand-secondary'>
                {'<p>'}
              </span>
              <p className='font-mono text-base leading-5 text-white pl-6'>
                I help business grow by crafting amazing web experiences. If
                you&apos;re looking for a developer that likes to get stuff
                done,
              </p>
              <span className='font-mono text-sm text-brand-secondary'>
                {'</p>'}
              </span>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </section>
  )
}
