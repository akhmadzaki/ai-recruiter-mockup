import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ToastProvider } from './components/ui/Toast.jsx'
import { Header } from './components/layout/Header.jsx'
import { LoginScreen } from './components/auth/LoginScreen.jsx'
import { Dashboard } from './components/dashboard/Dashboard.jsx'
import { JobDetail } from './components/job/JobDetail.jsx'
import { COMPANY } from './data/mockData.js'
import { ShieldIcon } from './components/ui/Icons.jsx'

function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-200/70 bg-white/50 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-[11px] text-ink-400 sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {COMPANY.name} {COMPANY.product} — portfolio demo with mock data.
        </p>
        <p className="inline-flex items-center gap-1.5">
          <ShieldIcon className="h-3.5 w-3.5" />
          Human-in-the-loop hiring · WCAG AA contrast · Keyboard-first
        </p>
      </div>
    </footer>
  )
}

function Workspace() {
  const { isAuthenticated } = useAuth()
  const [view, setView] = useState({ name: 'dashboard' })
  const reduceMotion = useReducedMotion()

  // Logging out always returns to a clean dashboard state.
  useEffect(() => {
    if (!isAuthenticated) setView({ name: 'dashboard' })
  }, [isAuthenticated])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  const openJob = useCallback((jobId, stage) => {
    setView({ name: 'job', jobId, stage })
  }, [])

  const goHome = useCallback(() => {
    setView({ name: 'dashboard' })
  }, [])

  if (!isAuthenticated) return <LoginScreen />

  return (
    <div className="flex min-h-full flex-col">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header onNavigateHome={goHome} showHomeLink={view.name === 'job'} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view.name === 'job' ? `job-${view.jobId}` : 'dashboard'}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1"
        >
          {view.name === 'job' ? (
            <JobDetail
              key={view.jobId}
              jobId={view.jobId}
              initialStage={view.stage}
              onBack={goHome}
            />
          ) : (
            <Dashboard onOpenJob={openJob} />
          )}
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Workspace />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
