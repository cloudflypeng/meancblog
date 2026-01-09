import { Feed } from 'feed'

export default defineEventHandler(async (event) => {
  const { public: { siteConfig } } = useRuntimeConfig()

  const feed = new Feed({
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    id: siteConfig.site.url,
    link: siteConfig.site.url,
    language: 'zh-CN',
    image: siteConfig.site.logo,
    favicon: siteConfig.site.favicon,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.site.author}`,
    updated: new Date(),
    generator: 'Nuxt Content',
    author: {
      name: siteConfig.site.author,
      email: '',
      link: siteConfig.site.url
    }
  })

  // Fetch blog posts
  // @ts-ignore - implicitly available or via #imports
  const docs = await queryCollection(event, 'blog').order('date', 'DESC').all()

  for (const doc of docs) {
    // Assuming structure blog/slug
    // doc.stem is usually like "blog/my-post"
    const slug = doc.stem.split('/').pop()

    feed.addItem({
      title: doc.title,
      id: `${siteConfig.site.url}/blog/${slug}`,
      link: `${siteConfig.site.url}/blog/${slug}`,
      description: doc.description,
      content: doc.description,
      date: new Date(doc.date),
      author: [
        {
          name: doc.author || siteConfig.site.author,
          link: siteConfig.site.url
        }
      ],
      image: doc.cover ? (doc.cover.startsWith('http') ? doc.cover : `${siteConfig.site.url}${doc.cover}`) : undefined
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
