import { generateRobotTxt } from '~/utils/robots'

export function loader() {
  const robotText = generateRobotTxt({
    policy: [
      {
        userAgent: '*',
        allow: ['/'],
      },
    ],
    sitemap: 'https://zakelstorm.me/sitemap.xml',
    host: 'https://zakelstorm.me',
  })

  const bytes = new TextEncoder().encode(robotText).byteLength

  return new Response(robotText, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': String(bytes),
    },
  })
}
