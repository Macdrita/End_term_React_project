export default function AppIcon({ className = 'h-8 w-8' }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md bg-pink-300 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
        <rect x="5" y="4" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 8h4M8 11h4M8 14h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 8l.6 1.6L19 10l-1.4.4L17 12l-.6-1.6L15 10l1.4-.4L17 8z" fill="currentColor" />
      </svg>
    </span>
  )
}
