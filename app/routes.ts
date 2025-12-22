import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

const DEFAULT_PAGE_DIR = './routes';

export default [
  layout('./layouts/CommonLayout.tsx', [
    index(`${DEFAULT_PAGE_DIR}/index.tsx`),
    ...prefix('articles', [
      index(`${DEFAULT_PAGE_DIR}/articles/index.tsx`),
      route(':articleId', `${DEFAULT_PAGE_DIR}/articles/[articleId].tsx`),
    ]),
    route('about', `${DEFAULT_PAGE_DIR}/about.tsx`),
  ]),
] satisfies RouteConfig;
