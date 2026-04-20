export function matchScore(userSkills = [], jobSkills = []) {
  const uniqueUserSkills = new Set(userSkills.map((skill) => skill.toLowerCase()))
  const uniqueJobSkills = [...new Set(jobSkills.map((skill) => skill.toLowerCase()))]

  const matchingSkills = uniqueJobSkills.filter((skill) => uniqueUserSkills.has(skill))
  const missingSkills = uniqueJobSkills.filter((skill) => !uniqueUserSkills.has(skill))
  const matchPercent =
    uniqueJobSkills.length === 0
      ? 0
      : Math.round((matchingSkills.length / uniqueJobSkills.length) * 100)

  return {
    matchPercent,
    matchingSkills,
    missingSkills,
  }
}
