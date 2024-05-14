// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { combined, RouteType } from '../src/routes'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { cst } from '../src/constants';
import sitemapPlugin from 'vite-plugin-sitemap';

const dynamicRoutes = combined.map((route: RouteType) => route.path).filter((path: string) => path !== '/');
const hostname = cst.url;

export function createRoutedSitemap() {
  return sitemapPlugin({ dynamicRoutes, hostname })
}
