import { useEffect, useMemo, useState } from 'react'
import JobCard from '../components/JobCard'
import Loader from '../components/Loader'
import { useJobMatch } from '../hooks/useJobMatch'
import { useResumeAnalysis } from '../hooks/useResumeAnalysis'
import { DEFAULT_SELECTED_SKILLS } from '../data/skills'
import { fetchRemoteJobs } from '../services/jobService'
import {
  getStoredApplications,
  getStoredResumeText,
  getStoredTargetSkills,
  setStoredApplications,
} from '../utils/storage'

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [applications, setApplications] = useState(() => getStoredApplications())

  const resumeText = getStoredResumeText()
  const targetSkills = getStoredTargetSkills(DEFAULT_SELECTED_SKILLS)
  const { skills } = useResumeAnalysis(resumeText, targetSkills)
  const matchedJobs = useJobMatch(jobs, skills, targetSkills)

  const trackedJobIds = useMemo(
    () => new Set(applications.map((application) => String(application.jobId))),
    [applications],
  )

  useEffect(() => {
    const controller = new AbortController()

    async function loadJobs() {
      try {
        setLoading(true)
        const fetchedJobs = await fetchRemoteJobs(controller.signal)
        setJobs(fetchedJobs.slice(0, 120))
        setError('')
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Could not fetch jobs right now.')
        }
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
    return () => controller.abort()
  }, [])

  function handleTrackJob(job) {
    const jobId = String(job.id)
    if (trackedJobIds.has(jobId)) {
      return
    }

    const newApplication = {
      jobId,
      title: job.title,
      company: job.company_name,
      status: 'Applied',
      notes: '',
      matchPercent: job.matchPercent,
    }

    const nextApplications = [newApplication, ...applications]
    setApplications(nextApplications)
    setStoredApplications(nextApplications)
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-neutral-900">Job Matches</h1>
        <p className="text-sm text-neutral-600">
          Jobs are ranked based on your detected resume skills.
        </p>
      </div>

      {skills.length === 0 ? (
        <p className="rounded-md border border-[#ead6c8] bg-[#fbf3eb] p-3 text-sm text-[#86695a]">
          Add resume content in the Resume page first to improve match quality.
        </p>
      ) : null}

      {loading ? <Loader label="Fetching jobs from Remotive..." /> : null}
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}

      {!loading && !error ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {matchedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onTrackJob={handleTrackJob}
              isTracked={trackedJobIds.has(String(job.id))}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
