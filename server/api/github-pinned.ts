export default defineEventHandler(async (event) => {
  const username = 'cloudflypeng' // 你的 GitHub 用户名

  try {
    // 使用 GitHub GraphQL API 获取 pinned repositories
    const query = `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                createdAt
                updatedAt
              }
            }
          }
        }
      }
    `

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN || ''}`,
        'User-Agent': 'Nuxt-App'
      },
      body: JSON.stringify({ query })
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('GraphQL errors:', data.errors)
      return { projects: [], error: data.errors }
    }

    const pinnedRepos = data.data?.user?.pinnedItems?.nodes || []

    // 转换为项目格式
    const projects = pinnedRepos.map((repo: any) => ({
      type: 'opensource',
      name: repo.name,
      role: '独立开发者',
      year: new Date(repo.createdAt).getFullYear().toString(),
      techStack: [
        repo.primaryLanguage?.name,
        ...(repo.repositoryTopics?.nodes?.map((t: any) => t.topic.name) || [])
      ].filter(Boolean).slice(0, 5).join(', '),
      description: repo.description || '暂无描述',
      url: repo.url,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage?.name,
      languageColor: repo.primaryLanguage?.color
    }))

    return { projects }
  } catch (error: any) {
    console.error('Error fetching GitHub pinned repos:', error)
    return {
      projects: [],
      error: error.message
    }
  }
})
