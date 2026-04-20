import { useMemo } from 'react'
import { SKILLS } from '../data/skills'
import { extractSkills } from '../utils/extractSkills'

const ACTION_VERBS = [
  'built',
  'developed',
  'designed',
  'implemented',
  'optimized',
  'led',
  'improved',
  'delivered',
]

function containsAny(text, words) {
  return words.some((word) => text.includes(word))
}

export function useResumeAnalysis(resumeText, targetSkills = SKILLS) {
  return useMemo(() => {
    const normalizedText = (resumeText || '').trim()
    const activeSkills = targetSkills.length > 0 ? targetSkills : SKILLS
    const lowerText = normalizedText.toLowerCase()
    const detectedSkills = extractSkills(normalizedText, activeSkills)
    const missingSkills = activeSkills.filter((skill) => !detectedSkills.includes(skill))
    const score = Math.round((detectedSkills.length / activeSkills.length) * 100)
    const suggestions = []
    const wordCount = normalizedText.split(/\s+/).filter(Boolean).length
    const hasNumbers = /\d/.test(normalizedText)
    const hasProjects = containsAny(lowerText, ['project', 'projects'])
    const hasExperience = containsAny(lowerText, ['experience', 'work experience', 'employment'])
    const hasEducation = containsAny(lowerText, ['education', 'bachelor', 'master', 'degree'])
    const hasActionVerbs = containsAny(lowerText, ACTION_VERBS)

    if (wordCount === 0) {
      suggestions.push('Paste your resume text or upload a .txt file to begin analysis.')
      return {
        skills: detectedSkills,
        missingSkills,
        score,
        suggestions,
      }
    }

    if (score < 50 && missingSkills.length > 0) {
      suggestions.push(
        `Add explicit mentions of priority skills: ${missingSkills.slice(0, 4).join(', ')}.`,
      )
    }

    if (missingSkills.includes('react')) {
      suggestions.push('Add at least one React project with stack, role, and measurable outcome.')
    }

    if (!hasNumbers) {
      suggestions.push('Include measurable impact (for example: improved load time by 30%).')
    }

    if (wordCount < 120) {
      suggestions.push('Add more detail to experience bullets with tools, actions, and outcomes.')
    } else if (wordCount > 850) {
      suggestions.push('Tighten long sections so key achievements are easier to scan quickly.')
    }

    if (!hasProjects) {
      suggestions.push('Add a Projects section with links and concise outcomes for each project.')
    }

    if (!hasExperience) {
      suggestions.push('Add an Experience section to show where and how you applied your skills.')
    }

    if (!hasEducation) {
      suggestions.push('Add a short Education section for completeness and recruiter screening.')
    }

    if (!hasActionVerbs) {
      suggestions.push('Start bullets with strong action verbs like Built, Led, or Optimized.')
    }

    if (suggestions.length === 0) {
      suggestions.push('Great baseline. Tailor keywords and project bullets for each job posting.')
    }

    return {
      skills: detectedSkills,
      missingSkills,
      score,
      suggestions: suggestions.slice(0, 6),
    }
  }, [resumeText, targetSkills])
}
