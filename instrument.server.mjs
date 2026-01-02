import * as Sentry from '@sentry/react-router'

Sentry.init({
  dsn: 'https://8e092c85ac3405fba68029a12e724c9f@blog-sentry.zakelstorm.me/4',
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
})
