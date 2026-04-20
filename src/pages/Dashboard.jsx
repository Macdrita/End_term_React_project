import { useEffect, useState } from 'react'
import AppIcon from '../components/AppIcon'
import Loader from '../components/Loader'
import SkillList from '../components/SkillList'
import { DEFAULT_SELECTED_SKILLS } from '../data/skills'
import { useJobMatch } from '../hooks/useJobMatch'
import { useResumeAnalysis } from '../hooks/useResumeAnalysis'
import { fetchRemoteJobs } from '../services/jobService'
import {
  getStoredApplications,
  getStoredResumeText,
  getStoredTargetSkills,
} from '../utils/storage'

const dashboardImage =
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80'

export default function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const resumeText = getStoredResumeText()
  const targetSkills = getStoredTargetSkills(DEFAULT_SELECTED_SKILLS)
  const applications = getStoredApplications()
  const { skills, score } = useResumeAnalysis(resumeText, targetSkills)
  const matchedJobs = useJobMatch(jobs, skills, targetSkills)
  const topJobs = matchedJobs.slice(0, 3)

  useEffect(() => {
    const controller = new AbortController()

    async function loadJobs() {
      try {
        setLoading(true)
        const fetchedJobs = await fetchRemoteJobs(controller.signal)
        setJobs(fetchedJobs.slice(0, 60))
        setError('')
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Could not load jobs.')
        }
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
    return () => controller.abort()
  }, [])

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AppIcon />
          <h1 className="text-2xl font-semibold text-neutral-900">AI Resume Analyzer</h1>
        </div>
        <p className="text-base font-medium text-neutral-800">Dashboard</p>
        <p className="text-sm text-neutral-600">
          Track your resume strength and current job matching progress.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-md border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-600">Resume Score</p>
          <p className="mt-2 text-2xl font-semibold text-[#8d4a62]">{score}%</p>
        </article>
        <article className="rounded-md border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-600">Skills Detected</p>
          <p className="mt-2 text-2xl font-semibold text-[#86695a]">{skills.length}</p>
        </article>
        <article className="rounded-md border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-600">Applications</p>
          <p className="mt-2 text-2xl font-semibold text-[#b2667f]">{applications.length}</p>
        </article>
        <article className="rounded-md border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-600">Top Match Jobs</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{topJobs.length}</p>
        </article>
      </div>

      <article className="grid gap-4 rounded-md border border-neutral-200 bg-white p-5 md:grid-cols-[1.5fr,1fr]">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-900">Current Resume Skills</h2>
          <SkillList
            title="Detected Skills"
            skills={skills}
            tone="rose"
            emptyText="Add your resume text in the Resume page to see detected skills."
          />
        </div>
        <img
          src={dashboardImage}
          alt="Person working at a laptop with notes"
          className="h-48 w-full rounded-md object-cover"
          loading="lazy"
        />
      </article>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">Recent Job Matches</h2>
        {loading ? <Loader label="Loading jobs..." /> : null}
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        {!loading && !error ? (
          <div className="space-y-2">
            {topJobs.map((job) => (
              <article
                key={job.id}
                className="rounded-md border border-neutral-200 bg-white p-4 text-sm text-neutral-700"
              >
                <p className="font-semibold text-neutral-900">{job.title}</p>
                <p className="mt-1">
                  {job.company_name} - Match {job.matchPercent}%
                </p>
              </article>
            ))}
            {topJobs.length === 0 ? (
              <p className="text-sm text-neutral-600">
                No matched jobs yet. Upload your resume and visit the Jobs page.
              </p>
            ) : null}
          </div>
        ) : null}
      </section>
    </section>
  )
}
