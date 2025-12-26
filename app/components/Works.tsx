import { Flex } from './shared/Flex';

export function Works() {
  return (
    <section id="works" className="relative bg-bg-darker px-4 md:px-16 py-16 w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: 'url(/images/works-pattern.png)',
            backgroundSize: '586px 640px',
          }}
        />
      </div>

      <Flex vertical align="center" gap={64} className="relative max-w-[1920px] mx-auto">
        {/* Section Title */}
        <Flex vertical align="center" gap={16} className="w-full">
          <h2 className="font-ubuntu text-4xl md:text-[64px] md:leading-[72px] capitalize text-brand-primary">
            Works
          </h2>
          <div className="w-full max-w-xs h-px bg-brand-primary" />
          <p className="font-mono text-base leading-5 text-white text-center max-w-2xl">
            I had the pleasure of working with these awesome projects
          </p>
        </Flex>

        {/* Project Carousel */}
        <Flex align="center" gap={16} justify="center" className="w-full">
          {/* Left Arrow */}
          <button className="bg-bg-dark p-4 rounded-full hover:bg-grey transition-colors">
            <svg className="w-10 h-10 text-white" viewBox="0 0 40 40" fill="currentColor">
              <path
                d="M25 30L15 20L25 10"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Project Preview */}
          <div className="relative max-w-[480px] flex-1">
            <div className="relative">
              {/* Dual Screen Mockup */}
              <div className="relative w-full h-64 md:h-80">
                <Flex align="center" justify="center" className="absolute inset-0">
                  <div className="relative">
                    {/* Desktop Screen */}
                    <div className="w-full max-w-md h-48 bg-grey rounded-lg shadow-2xl overflow-hidden">
                      <img
                        src="/images/project-desktop.jpg"
                        alt="Project Desktop"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Mobile Screen - Overlay */}
                    <div className="absolute -bottom-8 -left-8 w-32 h-48 bg-grey rounded-lg shadow-2xl overflow-hidden border-4 border-bg-darker">
                      <img
                        src="/images/project-mobile.jpg"
                        alt="Project Mobile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </Flex>
              </div>

              {/* View Website Link */}
              <Flex align="end" gap={8} className="absolute top-4 right-4 group cursor-pointer">
                <Flex vertical gap={4}>
                  <span className="font-mono text-2xl leading-8 capitalize text-brand-primary group-hover:text-brand-secondary transition-colors">
                    view Website
                  </span>
                  <div className="h-px bg-brand-primary group-hover:bg-brand-secondary transition-colors" />
                </Flex>
                <svg
                  className="w-4 h-4 text-brand-primary mb-1"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    d="M3 3L13 13M13 13V5M13 13H5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Flex>
            </div>
          </div>

          {/* Right Arrow */}
          <button className="bg-bg-dark p-4 rounded-full hover:bg-grey transition-colors">
            <svg className="w-10 h-10 text-white" viewBox="0 0 40 40" fill="currentColor">
              <path
                d="M15 10L25 20L15 30"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Flex>
      </Flex>
    </section>
  );
}
