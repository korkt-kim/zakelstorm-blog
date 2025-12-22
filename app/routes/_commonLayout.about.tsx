import { Flex } from '~/components/shared/Flex'

export default function Page() {
  return (
    <section
      id='about'
      className='relative bg-bg-darker px-4 md:px-16 py-16 w-full'>
      {/* Background Image */}
      <div className='absolute inset-0 opacity-10 pointer-events-none'>
        <div
          className='w-full h-full bg-cover bg-center'
          style={{ backgroundImage: 'url(/images/about-bg.jpg)' }}
        />
      </div>

      <Flex
        wrap
        align='center'
        justify='center'
        gap={64}
        className='relative max-w-[1920px] mx-auto'>
        {/* Content */}
        <Flex vertical gap={64} className='max-w-[640px]'>
          {/* Title */}
          <div className='bg-bg-dark border-4 border-brand-primary rounded-tl-[40px] rounded-br-[40px] px-10 py-4 inline-block'>
            <h2 className='font-ubuntu text-4xl md:text-[64px] md:leading-[72px] capitalize text-white'>
              About me
            </h2>
          </div>

          {/* Text */}
          <Flex
            vertical
            gap={16}
            className='bg-bg-dark rounded-[40px] px-[40px] py-[24px] font-mono'>
            <span className='text-sm text-brand-secondary'>{'<p>'}</span>

            <div className='space-y-4 text-white'>
              <p className='font-mono font-medium text-[32px] leading-[42px] capitalize text-brand-primary'>
                Hello!
              </p>

              <p className='text-base leading-5'>
                My name is PolZ and I specialize in web developement that
                utilizes <span className='text-brand-primary'>JS/TS</span>,{' '}
                <span className='text-brand-primary'>REACT</span>, and{' '}
                <span className='text-brand-primary'>SDK</span> etc.
              </p>

              <p className='text-base leading-5'>
                I am a highly motivated individual and eternal optimist
                dedicated to writing clear, concise, robust code that works.
                Striving to never stop learning and improving.
              </p>

              <p className='text-base leading-5'>
                When I&apos;m not coding, I am{' '}
                <span className='text-brand-primary'>writing bolgs</span>,
                reading blogs, books or official development document
              </p>

              <p className='text-base leading-5'>
                I like to have my perspective and belief systems challenged so
                that I see the world through new eyes.
              </p>
            </div>

            <span className='text-sm text-brand-secondary'>{'</p>'}</span>
          </Flex>
        </Flex>

        {/* Image */}
        <div className='w-full md:w-[462px] h-[400px] md:h-[556px] rounded-2xl overflow-hidden bg-grey'>
          <img
            src='/images/workspace.jpg'
            alt='Workspace'
            className='w-full h-full object-cover'
            onError={e => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      </Flex>
    </section>
  )
}
