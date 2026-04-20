import { SKILLS } from '../data/skills'

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function extractSkills(text = '', allowedSkills = SKILLS) {
  const lowerText = text.toLowerCase()

  return allowedSkills.filter((skill) => {
    const pattern = new RegExp(`\\b${escapeRegExp(skill.toLowerCase())}\\b`, 'i')
    return pattern.test(lowerText)
  })
}
