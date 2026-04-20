export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-[#edc7d1] bg-white p-4 text-sm text-[#8d4a62]">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#f2dce1] border-t-[#d88ea8]" />
      <span>{label}</span>
    </div>
  )
}
