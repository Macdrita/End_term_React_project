import { useMemo } from 'react'
import { SKILLS } from '../data/skills'
import { extractSkills } from '../utils/extractSkills'
import { matchScore } from '../utils/matchScore'

function getSearchableJobText(job) {
  const tags = Array.isArray(job.tags) ? job.tags.join(' ') : ''
  return `${job.title || ''} ${job.description || ''} ${tags} ${job.category || ''}`
}

export function useJobMatch(jobs, userSkills, skillPool = SKILLS) {
  return useMemo(() => {
    const activeSkills = skillPool.length > 0 ? skillPool : SKILLS

    return jobs
      .map((job) => {
        const jobSkills = extractSkills(getSearchableJobText(job), activeSkills)
        const { matchPercent, matchingSkills, missingSkills } = matchScore(
          userSkills,
          jobSkills,
        )

        return {
          ...job,
          jobSkills,
          matchPercent,
          matchingSkills,
          missingSkills,
        }
      })
      .sort((firstJob, secondJob) => secondJob.matchPercent - firstJob.matchPercent)
  }, [jobs, skillPool, userSkills])
}
