import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'
import Applications from './pages/Applications'
import Dashboard from './pages/Dashboard'
import JobsPage from './pages/JobsPage'
import Login from './pages/Login'
import ResumePage from './pages/ResumePage'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppLayout() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-[#f8eee8]">
      {isAuthenticated ? <Navbar /> : null}
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <ResumePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
