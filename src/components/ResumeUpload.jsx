import { useRef, useState } from 'react'

export default function ResumeUpload({ resumeText, onResumeChange }) {
  const fileInputRef = useRef(null)
  const [fileError, setFileError] = useState('')

  function handleFileUpload(event) {
    const [file] = event.target.files || []
    if (!file) {
      return
    }

    if (!file.name.toLowerCase().endsWith('.txt')) {
      setFileError('Please upload a .txt file.')
      return
    }

    setFileError('')

    const reader = new FileReader()
    reader.onload = () => {
      onResumeChange(String(reader.result || ''))
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
    reader.readAsText(file)
  }

  return (
    <section className="space-y-4 rounded-md border border-neutral-200 bg-white p-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-neutral-900">Resume Input</h2>
        <p className="text-sm text-neutral-600">
          Paste your resume text or upload a .txt file.
        </p>
      </div>

      <textarea
        value={resumeText}
        onChange={(event) => onResumeChange(event.target.value)}
        placeholder="Paste your resume text here..."
        className="h-56 w-full rounded-md border border-[#e7c9c4] px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-pink-300"
      />

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="max-w-full text-sm text-neutral-700 file:mr-3 file:rounded-md file:border-0 file:bg-pink-300 file:px-3 file:py-2 file:text-sm file:font-medium file:text-neutral-900 hover:file:bg-pink-400"
        />
        <button
          type="button"
          onClick={() => onResumeChange('')}
          className="rounded-md border border-[#e7c9c4] px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-[#f7ddd9]"
        >
          Clear text
        </button>
      </div>

      {fileError ? <p className="text-sm text-rose-700">{fileError}</p> : null}
    </section>
  )
}
