import ResumeUpload from '../components/ResumeUpload'
import SkillList from '../components/SkillList'
import { useResumeAnalysis } from '../hooks/useResumeAnalysis'
import { DEFAULT_SELECTED_SKILLS, SKILLS } from '../data/skills'
import {
  getStoredResumeText,
  getStoredTargetSkills,
  setStoredResumeText,
  setStoredTargetSkills,
} from '../utils/storage'
import { useMemo, useState } from 'react'

export default function ResumePage() {
  const [resumeText, setResumeText] = useState(() => getStoredResumeText())
  const [selectedSkills, setSelectedSkills] = useState(() =>
    getStoredTargetSkills(DEFAULT_SELECTED_SKILLS),
  )
  const [customSkillInput, setCustomSkillInput] = useState('')

  const { skills, missingSkills, score, suggestions } = useResumeAnalysis(
    resumeText,
    selectedSkills,
  )
  const sortedSkillOptions = useMemo(() => [...new Set([...SKILLS, ...selectedSkills])].sort(), [
    selectedSkills,
  ])

  function handleResumeChange(nextValue) {
    setResumeText(nextValue)
    setStoredResumeText(nextValue)
  }

  function toggleSkill(skill) {
    const nextSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((item) => item !== skill)
      : [...selectedSkills, skill]

    setSelectedSkills(nextSkills)
    setStoredTargetSkills(nextSkills)
  }

  function addCustomSkill() {
    const normalizedSkill = customSkillInput.trim().toLowerCase()
    if (!normalizedSkill || selectedSkills.includes(normalizedSkill)) {
      setCustomSkillInput('')
      return
    }

    const nextSkills = [...selectedSkills, normalizedSkill]
    setSelectedSkills(nextSkills)
    setStoredTargetSkills(nextSkills)
    setCustomSkillInput('')
  }

  function useDefaultSkills() {
    setSelectedSkills(DEFAULT_SELECTED_SKILLS)
    setStoredTargetSkills(DEFAULT_SELECTED_SKILLS)
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-neutral-900">Resume Analyzer</h1>
        <p className="text-sm text-neutral-600">
          Upload or paste your resume text to extract skills and get feedback.
        </p>
      </div>

      <ResumeUpload resumeText={resumeText} onResumeChange={handleResumeChange} />

      <article className="space-y-4 rounded-md border border-neutral-200 bg-white p-5">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-neutral-900">Target Skills</h2>
          <p className="text-sm text-neutral-600">
            Choose the skills you want this resume to be scored against.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={useDefaultSkills}
            className="rounded-md border border-[#e7c9c4] px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-[#f7ddd9]"
          >
            Use default set
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedSkills(SKILLS)
              setStoredTargetSkills(SKILLS)
            }}
            className="rounded-md border border-[#e7c9c4] px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-[#f7ddd9]"
          >
            Select all available
          </button>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {sortedSkillOptions.map((skill) => (
            <label
              key={skill}
              className="flex items-center gap-2 rounded-md border border-[#ead6c8] bg-[#fbf3eb] px-3 py-2 text-sm text-neutral-700"
            >
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={() => toggleSkill(skill)}
                className="h-4 w-4 accent-pink-300"
              />
              <span>{skill}</span>
            </label>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={customSkillInput}
            onChange={(event) => setCustomSkillInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                addCustomSkill()
              }
            }}
            placeholder="Add custom skill (for example: rust)"
            className="w-full max-w-sm rounded-md border border-[#e7c9c4] px-3 py-2 text-sm outline-none transition focus:border-pink-300"
          />
          <button
            type="button"
            onClick={addCustomSkill}
            className="rounded-md bg-pink-300 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:bg-pink-400"
          >
            Add Skill
          </button>
        </div>
      </article>

      <article className="rounded-md border border-neutral-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-neutral-900">Analysis</h2>
        <p className="mt-1 text-sm text-neutral-600">Resume Score: {score}%</p>
        <p className="mt-1 text-sm text-neutral-600">
          Scored against {selectedSkills.length} selected skill
          {selectedSkills.length === 1 ? '' : 's'}.
        </p>
      </article>

      <article className="space-y-5 rounded-md border border-neutral-200 bg-white p-5">
        <SkillList
          title="Extracted Skills"
          skills={skills}
          tone="emerald"
          emptyText="No skills detected yet."
        />
        <SkillList
          title="Missing Skills"
          skills={missingSkills}
          tone="amber"
          emptyText="Great coverage for this skills dataset."
        />
      </article>

      <section className="space-y-3 rounded-md border border-neutral-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-neutral-900">Suggestions</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      </section>
    </section>
  )
}
