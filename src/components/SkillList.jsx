const TONES = {
  emerald: 'border-[#edc7d1] bg-[#fdecef] text-[#8d4a62]',
  amber: 'border-[#ead6c8] bg-[#fbf3eb] text-[#86695a]',
  rose: 'border-[#f2ccd8] bg-[#fff1f5] text-[#8a3f58]',
}

export default function SkillList({
  title,
  skills,
  tone = 'emerald',
  emptyText = 'No skills found yet.',
}) {
  const style = TONES[tone] || TONES.emerald

  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className={`rounded-md border px-3 py-1 text-sm font-medium ${style}`}
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-neutral-600">{emptyText}</p>
      )}
    </section>
  )
}
