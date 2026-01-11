export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const username = 'cloudflypeng' // TODO: extract from config if possible, or keep hardcoded

  // Try to get token from env
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    console.warn('GITHUB_TOKEN not found')
    return { days: [], total: 0 }
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
    })

    const result = await response.json()

    if (result.errors) {
      console.error('GitHub API errors:', result.errors)
      throw new Error(result.errors[0].message)
    }

    const calendar = result.data.user.contributionsCollection.contributionCalendar
    const allDays = calendar.weeks.flatMap((week: any) => week.contributionDays)

    // Get last 15 days
    const recentDays = allDays.slice(-15)

    return {
      total: calendar.totalContributions,
      days: recentDays
    }
  } catch (error) {
    console.error('Failed to fetch GitHub contributions:', error)
    return { days: [], total: 0 }
  }
})
