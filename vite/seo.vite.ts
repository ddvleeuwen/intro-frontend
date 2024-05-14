import { Plugin } from 'vite'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { cst } from '../src/constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import tailwindConfig from '../tailwind.config'

const jsonLD = {
  '@context': 'http://schema.org',
  '@type': 'SoftwareApplication',
  'name': cst.title,
  'description': cst.seo.description,
  'operatingSystem': 'web',
  'image': `${cst.url}${cst.logo}`,
  'url': cst.url,
  'author': {
    '@type': 'Person',
    'name': cst.creator
  },
  'datePublished': cst.releaseDate,
  'applicationCategory': 'Game',
}


export function createSEOTags(): Plugin {
  return {
    name: 'seo-plugin',
    transformIndexHtml(html) {
      // Add title element based on description and project title
      const title = `<title>${cst.title} | ${cst.description}</title>`
      const description = `<meta name='description' content='${cst.seo.description}'>`

      const themeColor = `<meta name='theme-color' content='${tailwindConfig.theme.extend.colors.primary}'>`
      const msApplicationTileColor = `<meta name='msapplication-TileColor' content='${tailwindConfig.theme.extend.colors.primary}'>`

      const ogType = `<meta property='og:type' content='website'>`
      const ogUrl = `<meta property='og:url' content='${cst.url}'>`
      const ogTitle = `<meta property='og:title' content='${cst.title} | ${cst.description}'>`
      const ogDescription = `<meta property='og:description' content='${cst.seo.description}'>`
      const ogImage = `<meta property='og:image' content='${cst.url}${cst.seo.image}'>`

      const twitterCard = `<meta name='twitter:card' content='summary_large_image'>`
      const twitterImage = `<meta name='twitter:image' content='${cst.url}${cst.seo.image}'>`
      const twitterCreator = `<meta name='twitter:creator' content='${cst.seo.twitter}'>`

      const structuredData = `<script type='application/ld+json'>${JSON.stringify(jsonLD)}</script>`

      // Insert the new tags into the head of the document
      const allTags = [
        title,
        description,
        themeColor,
        msApplicationTileColor,
        ogType,
        ogTitle,
        ogUrl,
        ogDescription,
        ogImage,
        twitterCard,
        twitterImage,
        twitterCreator,
        structuredData
      ]
      return html.replace('</head>', `  ${allTags.join('\n    ')}\n  </head>`)
    }
  }
}
