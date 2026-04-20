import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim()) {
      setError('Please enter an email address.')
      return
    }

    if (!password.trim()) {
      setError('Please enter a password.')
      return
    }

    setError('')
    login(email)
    navigate('/dashboard', { replace: true })
  }

  return (
    <section className="mx-auto mt-10 w-full max-w-md space-y-5 rounded-md border border-neutral-200 bg-white p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-neutral-900">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-sm text-neutral-600">
          Local authentication only. Your session is saved in this browser.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-neutral-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-[#e7c9c4] px-3 py-2 text-sm outline-none transition focus:border-pink-300"
            placeholder="user@example.com"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-neutral-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md border border-[#e7c9c4] px-3 py-2 text-sm outline-none transition focus:border-pink-300"
            placeholder="Enter password"
          />
        </div>

        {error ? <p className="text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          className="w-full rounded-md bg-pink-300 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:bg-pink-400"
        >
          {mode === 'login' ? 'Login' : 'Sign up'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode((currentMode) => (currentMode === 'login' ? 'signup' : 'login'))}
        className="text-sm font-medium text-[#8d4a62] transition hover:text-[#7a3d54]"
      >
        {mode === 'login'
          ? "Don't have an account? Sign up"
          : 'Already have an account? Login'}
      </button>
    </section>
  )
}
