const REMOTIVE_URL = 'https://remotive.com/api/remote-jobs'

export async function fetchRemoteJobs(signal) {
  const response = await fetch(REMOTIVE_URL, { signal })

  if (!response.ok) {
    throw new Error('Unable to fetch jobs right now.')
  }

  const data = await response.json()
  return Array.isArray(data.jobs) ? data.jobs : []
}
