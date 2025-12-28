import { generateRobotTxt } from '~/utils/robots'

export function loader() {
  const protocol = import.meta.env.PROD ? 'https' : 'http'
  const robotText = generateRobotTxt({
    policy: [
      {
        userAgent: '*',
        allow: ['/'],
      },
    ],
    sitemap: `${protocol}:${import.meta.env.VITE_APP_BASE_URL}/sitemap.xml`,
    host: `${protocol}:${import.meta.env.VITE_APP_BASE_URL}`,
  })

  const bytes = new TextEncoder().encode(robotText).byteLength

  return new Response(robotText, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': String(bytes),
    },
  })
}
