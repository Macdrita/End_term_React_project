export const STORAGE_KEYS = {
  USER: 'resume_app_user',
  RESUME_TEXT: 'resume_app_text',
  APPLICATIONS: 'resume_applications',
  TARGET_SKILLS: 'resume_target_skills',
}

function parseJSON(rawValue, fallbackValue) {
  try {
    return JSON.parse(rawValue)
  } catch {
    return fallbackValue
  }
}

export function getStoredUser() {
  const rawValue = localStorage.getItem(STORAGE_KEYS.USER)
  return rawValue ? parseJSON(rawValue, null) : null
}

export function setStoredUser(user) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export function clearStoredUser() {
  localStorage.removeItem(STORAGE_KEYS.USER)
}

export function getStoredResumeText() {
  return localStorage.getItem(STORAGE_KEYS.RESUME_TEXT) || ''
}

export function setStoredResumeText(resumeText) {
  localStorage.setItem(STORAGE_KEYS.RESUME_TEXT, resumeText)
}

export function getStoredApplications() {
  const rawValue = localStorage.getItem(STORAGE_KEYS.APPLICATIONS)
  return rawValue ? parseJSON(rawValue, []) : []
}

export function setStoredApplications(applications) {
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications))
}

export function getStoredTargetSkills(fallbackSkills = []) {
  const rawValue = localStorage.getItem(STORAGE_KEYS.TARGET_SKILLS)
  if (!rawValue) {
    return fallbackSkills
  }

  const parsedValue = parseJSON(rawValue, [])
  if (!Array.isArray(parsedValue)) {
    return fallbackSkills
  }

  const sanitizedSkills = [...new Set(parsedValue.map((skill) => String(skill).trim().toLowerCase()).filter(Boolean))]
  return sanitizedSkills.length > 0 ? sanitizedSkills : fallbackSkills
}

export function setStoredTargetSkills(skills) {
  const sanitizedSkills = [...new Set(skills.map((skill) => String(skill).trim().toLowerCase()).filter(Boolean))]
  localStorage.setItem(STORAGE_KEYS.TARGET_SKILLS, JSON.stringify(sanitizedSkills))
}
