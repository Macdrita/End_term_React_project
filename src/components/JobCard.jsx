function stripHtmlTags(value = '') {
  return value.replace(/<[^>]+>/g, ' ')
}

function companyLogoUrl(job) {
  if (job.company_logo_url) {
    return job.company_logo_url
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    job.company_name || 'Company',
  )}&background=f6c7d4&color=3b2230`
}

export default function JobCard({ job, onTrackJob, isTracked }) {
  const shortDescription = stripHtmlTags(job.description).trim().slice(0, 220)

  return (
    <article className="space-y-4 rounded-md border border-neutral-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <img
          src={companyLogoUrl(job)}
          alt={job.company_name || 'Company logo'}
          className="h-12 w-12 rounded-md object-cover"
          loading="lazy"
        />
        <div className="min-w-0 space-y-1">
          <h3 className="break-words text-lg font-semibold text-neutral-900">{job.title}</h3>
          <p className="text-sm text-neutral-600">
            {job.company_name} • {job.candidate_required_location || 'Remote'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <span className="rounded-md bg-[#fdecef] px-2 py-1 font-medium text-[#8d4a62]">
          Match: {job.matchPercent}%
        </span>
        <span className="rounded-md bg-[#fbf3eb] px-2 py-1 font-medium text-[#86695a]">
          Missing: {job.missingSkills.length > 0 ? job.missingSkills.join(', ') : 'None'}
        </span>
      </div>

      <p className="text-sm leading-6 text-neutral-700">{shortDescription}...</p>

      <a
        href={job.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-md border border-[#e7c9c4] px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-[#f7ddd9]"
      >
        View Job
      </a>

      <button
        type="button"
        onClick={() => onTrackJob(job)}
        disabled={isTracked}
        className={`ml-3 rounded-md px-3 py-2 text-sm font-medium text-white transition ${
          isTracked
            ? 'cursor-not-allowed bg-[#e6cfd5] text-neutral-700'
            : 'bg-pink-300 text-neutral-900 hover:bg-pink-400'
        }`}
      >
        {isTracked ? 'Saved' : 'Add to Tracker'}
      </button>
    </article>
  )
}
