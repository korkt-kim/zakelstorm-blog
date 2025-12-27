export interface Policy {
  userAgent: string
  allow?: string[]
  disallow?: string[]
  crawlDelay?: number
}

export interface Options {
  policy: Policy[]
  sitemap?: string
  host?: string
}
const arrayToString = (arr: string[]) => arr.join('\n')

export const generateRobotTxt = (options: Options) => {
  const { policy, sitemap, host } = options

  const ret = `${arrayToString([sitemap ? `Sitemap: ${sitemap}` : '', host ? `Host: ${host}` : ''])}

${policy.reduce((acc, policy) => {
  acc += `${arrayToString([
    `User-agent: ${policy.userAgent}`,
    policy.allow ? policy.allow.map(item => `Allow: ${item}`).join('\n') : '',
    policy.disallow
      ? policy.disallow.map(item => `Disallow: ${item}`).join('\n')
      : '',
    policy.crawlDelay ? `Crawl-delay: ${policy.crawlDelay}` : '',
  ])}`
  return acc
}, '')}
`

  return ret
}
