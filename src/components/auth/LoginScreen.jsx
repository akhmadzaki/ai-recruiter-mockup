import { motion, useReducedMotion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext.jsx'
import { COMPANY } from '../../data/mockData.js'
import { Button } from '../ui/Button.jsx'
import { ThemeToggle } from '../ui/ThemeToggle.jsx'
import { Logo } from '../layout/Logo.jsx'
import {
  AccessibilityIcon,
  CheckCircleIcon,
  GoogleIcon,
  ShieldIcon,
  SparklesIcon,
  UsersIcon,
} from '../ui/Icons.jsx'

const FEATURES = [
  {
    icon: SparklesIcon,
    title: 'AI ranks, you decide',
    body: 'Every shortlist comes with a fit score, evidence, and the caveats behind it.',
  },
  {
    icon: UsersIcon,
    title: 'One pipeline, five stages',
    body: 'Screening through offer, with the full history on a single screen.',
  },
  {
    icon: AccessibilityIcon,
    title: 'Accessible by default',
    body: 'Keyboard-first, screen-reader tested, and WCAG AA contrast throughout.',
  },
]

export function LoginScreen() {
  const { loginWithGoogle, isAuthenticating } = useAuth()
  const reduceMotion = useReducedMotion()

  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <div className="relative flex min-h-full flex-col bg-ink-50 dark:bg-ink-950">
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-16">
        {/* Brand / value proposition */}
        <section aria-labelledby="login-heading" className="order-2 lg:order-1">
          <motion.div {...fadeUp(0)}>
            <Logo />
          </motion.div>

          <motion.h1
            id="login-heading"
            {...fadeUp(0.06)}
            className="mt-8 text-3xl font-black leading-[1.1] tracking-tight text-ink-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Hire with evidence,
            <span className="block bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-transparent">
              not gut feeling.
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.12)} className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            {COMPANY.name} {COMPANY.product} reads every application, ranks candidates against your
            scorecard, and writes the summary. Your recruiters still make every call.
          </motion.p>

          <motion.ul {...fadeUp(0.18)} className="mt-8 grid gap-3 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="surface-muted p-3.5">
                <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                <p className="mt-2 text-xs font-bold text-ink-800 dark:text-ink-100">{title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </motion.ul>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-8 flex items-start gap-2.5 rounded-xl border border-emerald-200/70 bg-emerald-50/70 p-3.5 dark:border-emerald-500/20 dark:bg-emerald-500/[0.07]"
          >
            <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <p className="text-[11px] leading-relaxed text-emerald-800 dark:text-emerald-200">
              <span className="font-bold">Human-in-the-loop by design.</span> AI output is advisory.
              Accessibility disclosures are used only to arrange accommodations and are never part of
              the score.
            </p>
          </motion.div>
        </section>

        {/* Sign-in card */}
        <motion.section
          {...fadeUp(0.1)}
          aria-labelledby="signin-heading"
          className="order-1 lg:order-2"
        >
          <div className="surface relative overflow-hidden p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-2xl"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                <SparklesIcon className="h-3 w-3" />
                Recruiter workspace
              </span>

              <h2
                id="signin-heading"
                className="mt-4 text-xl font-bold tracking-tight text-ink-900 dark:text-white"
              >
                Sign in to {COMPANY.name}
              </h2>
              <p className="mt-1.5 text-sm text-muted">
                Use your work Google account to open the hiring dashboard.
              </p>

              <Button
                variant="secondary"
                size="lg"
                onClick={loginWithGoogle}
                loading={isAuthenticating}
                loadingLabel="Connecting to Google"
                className="mt-6 w-full justify-center gap-3 border-ink-300/80 text-sm dark:border-white/15"
              >
                {!isAuthenticating ? <GoogleIcon className="h-5 w-5" /> : null}
                {isAuthenticating ? 'Connecting…' : 'Continue with Google'}
              </Button>

              <p aria-live="polite" className="mt-3 min-h-[1rem] text-center text-[11px] text-muted">
                {isAuthenticating ? 'Opening a secure Google sign-in window…' : ''}
              </p>

              <div className="my-5 flex items-center gap-3" aria-hidden="true">
                <span className="h-px flex-1 bg-ink-200 dark:bg-white/10" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                  Demo build
                </span>
                <span className="h-px flex-1 bg-ink-200 dark:bg-white/10" />
              </div>

              <ul className="space-y-2">
                {[
                  'No real Google account is contacted',
                  'Mock data only — nothing leaves your browser',
                  'Session persists locally until you log out',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px] text-muted">
                    <CheckCircleIcon className="mt-px h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-ink-400 dark:text-ink-500">
            By continuing you agree to the demo terms. Built with React, Vite, Tailwind CSS and
            Framer Motion.
          </p>
        </motion.section>
      </main>
    </div>
  )
}
