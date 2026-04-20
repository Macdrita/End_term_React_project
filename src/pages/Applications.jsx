import { useMemo, useState } from 'react'
import { getStoredApplications, setStoredApplications } from '../utils/storage'

const STATUS_OPTIONS = ['Applied', 'Interview', 'Rejected']

export default function Applications() {
  const [applications, setApplications] = useState(() => getStoredApplications())

  const sortedApplications = useMemo(() => {
    return [...applications].sort((firstItem, secondItem) =>
      firstItem.title.localeCompare(secondItem.title),
    )
  }, [applications])

  function handleStatusChange(jobId, nextStatus) {
    const nextApplications = applications.map((application) =>
      application.jobId === jobId
        ? {
            ...application,
            status: nextStatus,
          }
        : application,
    )

    setApplications(nextApplications)
    setStoredApplications(nextApplications)
  }

  function handleNotesChange(jobId, nextNotes) {
    const nextApplications = applications.map((application) =>
      application.jobId === jobId
        ? {
            ...application,
            notes: nextNotes,
          }
        : application,
    )

    setApplications(nextApplications)
    setStoredApplications(nextApplications)
  }

  function handleDelete(jobId) {
    const nextApplications = applications.filter(
      (application) => application.jobId !== jobId,
    )
    setApplications(nextApplications)
    setStoredApplications(nextApplications)
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-neutral-900">Applications Tracker</h1>
        <p className="text-sm text-neutral-600">
          Manage job status and notes using local browser storage.
        </p>
      </div>

      {sortedApplications.length > 0 ? (
        <div className="space-y-3">
          {sortedApplications.map((application) => (
            <article
              key={application.jobId}
              className="space-y-3 rounded-md border border-neutral-200 bg-white p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">{application.title}</h2>
                  <p className="text-sm text-neutral-600">{application.company || 'Company'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(application.jobId)}
                  className="rounded-md border border-[#f0bfd0] px-3 py-2 text-sm font-medium text-[#8a3f58] transition hover:bg-[#fff1f5]"
                >
                  Delete
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-1 text-sm text-neutral-700">
                  <span>Status</span>
                  <select
                    value={application.status}
                    onChange={(event) =>
                      handleStatusChange(application.jobId, event.target.value)
                    }
                    className="w-full rounded-md border border-[#e7c9c4] px-3 py-2 text-sm outline-none focus:border-pink-300"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <p className="text-sm text-neutral-700">
                  Match at save time: {application.matchPercent ?? 0}%
                </p>
              </div>

              <label className="block space-y-1 text-sm text-neutral-700">
                <span>Notes</span>
                <textarea
                  value={application.notes}
                  onChange={(event) => handleNotesChange(application.jobId, event.target.value)}
                  className="h-24 w-full rounded-md border border-[#e7c9c4] px-3 py-2 text-sm outline-none focus:border-pink-300"
                  placeholder="Add interview updates, next steps, or reminders."
                />
              </label>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-md border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
          No applications saved yet. Add jobs from the Jobs page.
        </p>
      )}
    </section>
  )
}
