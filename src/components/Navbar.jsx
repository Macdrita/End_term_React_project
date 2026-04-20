import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AppIcon from './AppIcon'

const linkClassName = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-pink-300 text-neutral-900'
      : 'text-neutral-700 hover:bg-[#f7ddd9] hover:text-neutral-900'
  }`

export default function Navbar() {
  const { logout, user } = useAuth()

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <AppIcon />
          <p className="truncate text-base font-semibold text-neutral-900">
            AI Resume Analyzer
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/dashboard" className={linkClassName}>
            Dashboard
          </NavLink>
          <NavLink to="/resume" className={linkClassName}>
            Resume
          </NavLink>
          <NavLink to="/jobs" className={linkClassName}>
            Jobs
          </NavLink>
          <NavLink to="/applications" className={linkClassName}>
            Applications
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <p className="max-w-48 truncate text-sm text-neutral-600">{user?.email}</p>
          <button
            type="button"
            onClick={logout}
            className="rounded-md border border-[#e7c9c4] px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-[#f7ddd9]"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
