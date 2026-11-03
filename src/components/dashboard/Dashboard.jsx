import { useMemo, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import {
  CANDIDATES,
  COMPANY,
  JOBS,
  STAGES,
  getCompanyStats,
  getJobById,
} from '../../data/mockData.js'
import { stageTone } from '../../lib/stageTones.js'
import { cn, pluralize } from '../../lib/utils.js'
import { Badge } from '../ui/Badge.jsx'
import { Button } from '../ui/Button.jsx'
import { Card } from '../ui/Card.jsx'
import { ScoreRing } from '../ui/ScoreRing.jsx'
import {
  BriefcaseIcon,
  ChevronRightIcon,
  SearchIcon,
  ShieldIcon,
  SparklesIcon,
  StarIcon,
  UsersIcon,
  XIcon,
} from '../ui/Icons.jsx'
import { JobCard } from './JobCard.jsx'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function StatCard({ icon: Icon, label, value, hint, tone = 'brand' }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300',
  }
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{label}</p>
          <p className="mt-1.5 text-2xl font-black tabular-nums tracking-tight text-ink-900 dark:text-white">
            {value}
          </p>
        </div>
        <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl', tones[tone])}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 text-[11px] text-muted">{hint}</p>
    </Card>
  )
}

export function Dashboard({ onOpenJob }) {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const stats = useMemo(() => getCompanyStats(), [])

  const filteredJobs = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return JOBS
    return JOBS.filter((job) =>
      [job.title, job.department, job.location, job.workMode].some((field) =>
        field.toLowerCase().includes(term),
      ),
    )
  }, [query])

  const reviewQueue = useMemo(
    () =>
      [...CANDIDATES]
        .filter((candidate) => candidate.decision === 'pending')
        .sort((a, b) => b.score - a.score)
        .slice(0, 4),
    [],
  )

  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            {COMPANY.name} workspace
          </p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-ink-900 dark:text-white sm:text-3xl">
            {greeting()}, {user?.name?.split(' ')[0] ?? 'there'}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {pluralize(stats.openRoles, 'open role')} · {pluralize(stats.pending, 'candidate')} awaiting
            your decision.
          </p>
        </div>
        <p className="text-xs font-medium text-ink-400 dark:text-ink-500">{today}</p>
      </div>

      <section aria-label="Hiring overview" className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={BriefcaseIcon}
          label="Open roles"
          value={stats.openRoles}
          hint="Across 4 departments"
          tone="brand"
        />
        <StatCard
          icon={UsersIcon}
          label="In pipeline"
          value={stats.totalApplicants}
          hint="Active applications"
          tone="violet"
        />
        <StatCard
          icon={SparklesIcon}
          label="Avg AI fit"
          value={stats.avgScore}
          hint="Advisory score, 0–100"
          tone="amber"
        />
        <StatCard
          icon={StarIcon}
          label="Offers out"
          value={stats.offers}
          hint="Awaiting response"
          tone="emerald"
        />
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section aria-labelledby="roles-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="roles-heading" className="text-lg font-bold tracking-tight text-ink-900 dark:text-white">
                Open roles
              </h2>
              <p className="text-xs text-muted">
                {filteredJobs.length} of {JOBS.length} roles shown
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <label htmlFor="role-search" className="sr-only">
                Search open roles
              </label>
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                id="role-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search roles, teams, locations…"
                className="h-10 w-full rounded-xl border border-ink-200 bg-white pl-9 pr-9 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:text-ink-100 dark:placeholder:text-ink-500"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} onOpen={onOpenJob} />
              ))}
            </div>
          ) : (
            <Card className="mt-4 flex flex-col items-center justify-center gap-2 p-10 text-center">
              <SearchIcon className="h-6 w-6 text-ink-300" />
              <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">No roles match “{query}”</p>
              <p className="text-xs text-muted">Try a team name like “Design” or a city like “Jakarta”.</p>
              <Button variant="secondary" size="sm" className="mt-2" onClick={() => setQuery('')}>
                Clear search
              </Button>
            </Card>
          )}
        </section>

        <aside className="space-y-4" aria-label="Review queue and AI policy">
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-ink-200/80 px-4 py-3 dark:border-white/10">
              <h2 className="text-sm font-bold text-ink-900 dark:text-white">Needs your decision</h2>
              <Badge tone="warning">{reviewQueue.length}</Badge>
            </div>
            <ul className="divide-y divide-ink-200/70 dark:divide-white/10">
              {reviewQueue.map((candidate) => {
                const job = getJobById(candidate.jobId)
                const tone = stageTone(candidate.stage)
                return (
                  <li key={candidate.id}>
                    <button
                      type="button"
                      onClick={() => onOpenJob(candidate.jobId, candidate.stage)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-ink-50 dark:hover:bg-white/5"
                    >
                      <ScoreRing score={candidate.score} size={38} strokeWidth={4} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-ink-800 dark:text-ink-100">
                          {candidate.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[10px] text-muted">{job.title}</span>
                        <span
                          className={cn(
                            'mt-1 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold',
                            tone.bg,
                            tone.text,
                          )}
                        >
                          <span className={cn('h-1 w-1 rounded-full', tone.dot)} aria-hidden="true" />
                          {candidate.stageLabel}
                        </span>
                      </span>
                      <ChevronRightIcon className="h-4 w-4 shrink-0 text-ink-300" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                <ShieldIcon className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-bold text-ink-900 dark:text-white">How AI is used here</h2>
            </div>
            <ul className="mt-3 space-y-2 text-[11px] leading-relaxed text-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                Ranks and summarises submitted evidence only.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                Never auto-rejects, never sees protected attributes.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                Every score links back to the evidence a human can check.
              </li>
            </ul>
            <p className="mt-3 rounded-lg bg-ink-50 px-2.5 py-2 text-[10px] font-medium text-ink-500 dark:bg-white/5 dark:text-ink-400">
              Final hiring decisions are always made by a person.
            </p>
          </Card>

          <Card className="p-4">
            <h2 className="text-sm font-bold text-ink-900 dark:text-white">Stage legend</h2>
            <ul className="mt-2.5 space-y-1.5">
              {STAGES.map((stage) => (
                <li key={stage.id} className="flex items-center gap-2 text-[11px] text-muted">
                  <span className={cn('h-2 w-2 rounded-full', stageTone(stage.id).dot)} aria-hidden="true" />
                  {stage.label}
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </main>
  )
}
