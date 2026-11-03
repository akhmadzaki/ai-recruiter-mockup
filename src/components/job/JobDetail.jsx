import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  STAGES,
  getCandidatesForJob,
  getJobById,
  getJobStats,
  getStageCounts,
} from '../../data/mockData.js'
import { useToast } from '../ui/Toast.jsx'
import { cn, pluralize, relativeTime } from '../../lib/utils.js'
import { Badge } from '../ui/Badge.jsx'
import { Button } from '../ui/Button.jsx'
import { Card } from '../ui/Card.jsx'
import { Tabs } from '../ui/Tabs.jsx'
import { ApplicantCardSkeleton, TableSkeleton } from '../ui/Skeleton.jsx'
import { ApplicantCard } from './ApplicantCard.jsx'
import { ApplicantTable } from './ApplicantTable.jsx'
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  ClockIcon,
  GridIcon,
  MapPinIcon,
  SearchIcon,
  ShieldIcon,
  SparklesIcon,
  TableIcon,
  UsersIcon,
  XIcon,
} from '../ui/Icons.jsx'

// Lazy-load the drawer; it's only needed when a candidate is opened.
const ApplicantDrawer = lazy(() => import('./ApplicantDrawer.jsx'))

const SORT_OPTIONS = [
  { value: 'ai', label: 'AI rank (best first)' },
  { value: 'score-desc', label: 'Score: high to low' },
  { value: 'score-asc', label: 'Score: low to high' },
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'recent', label: 'Most recent' },
]

const DECISION_LABELS = { advanced: 'Advanced', hold: 'On hold', rejected: 'Rejected' }

export function JobDetail({ jobId, initialStage, onBack }) {
  const job = getJobById(jobId)
  const { toast } = useToast()

  const [stage, setStage] = useState(initialStage ?? 'screening')
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('ai')
  const [view, setView] = useState('cards')
  const [decisions, setDecisions] = useState({})
  const [activeCandidate, setActiveCandidate] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Simulated fetch: shows skeleton states on mount and on every stage switch.
  useEffect(() => {
    setLoading(true)
    const timer = window.setTimeout(() => setLoading(false), 480)
    return () => window.clearTimeout(timer)
  }, [stage])

  const counts = useMemo(() => (job ? getStageCounts(job.id) : {}), [job])
  const stats = useMemo(() => (job ? getJobStats(job.id) : null), [job])

  const stageCandidates = useMemo(() => {
    if (!job) return []
    const term = query.trim().toLowerCase()
    const list = getCandidatesForJob(job.id).filter((candidate) => candidate.stage === stage)
    const filtered = term
      ? list.filter((candidate) =>
          [candidate.name, candidate.location, candidate.source, ...candidate.tags]
            .join(' ')
            .toLowerCase()
            .includes(term),
        )
      : list

    const sorted = [...filtered]
    switch (sort) {
      case 'score-desc':
        sorted.sort((a, b) => b.score - a.score)
        break
      case 'score-asc':
        sorted.sort((a, b) => a.score - b.score)
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'recent':
        sorted.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
        break
      default:
        sorted.sort((a, b) => a.rank - b.rank)
    }
    return sorted
  }, [job, stage, query, sort])

  if (!job) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-lg font-bold text-ink-900 dark:text-white">Role not found</h1>
        <p className="mt-1 text-sm text-muted">This role may have been closed or archived.</p>
        <Button className="mt-4" onClick={onBack}>
          Back to dashboard
        </Button>
      </main>
    )
  }

  const activeStage = STAGES.find((item) => item.id === stage) ?? STAGES[0]

  function openCandidate(candidate) {
    setActiveCandidate(candidate)
    setDrawerOpen(true)
  }

  function handleDecision(candidate, decision) {
    if (!candidate) return
    setDecisions((current) => ({ ...current, [candidate.id]: decision }))
    toast({
      title: `${candidate.name} — ${DECISION_LABELS[decision]}`,
      description: 'Decision recorded for the hiring team. The AI score is unchanged.',
      tone: decision === 'rejected' ? 'warning' : 'success',
    })
  }

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 rounded-lg px-1 py-1 text-xs font-semibold text-ink-500 transition hover:text-brand-700 dark:text-ink-400 dark:hover:text-brand-300"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        All roles
      </button>

      {/* Job header */}
      <header className="mt-3">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge tone="brand">{job.department}</Badge>
              <Badge tone="outline">{job.type}</Badge>
              <Badge tone="outline">{job.level}</Badge>
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-ink-900 dark:text-white sm:text-3xl">
              {job.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <BriefcaseIcon className="h-3.5 w-3.5" />
                {job.workMode}
              </span>
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="h-3.5 w-3.5" />
                Posted {relativeTime(job.postedAt)}
              </span>
              <span className="inline-flex items-center gap-1">
                <UsersIcon className="h-3.5 w-3.5" />
                {pluralize(stats.total, 'applicant')}
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{job.description}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Required skills">
              {job.skills.map((skill) => (
                <li key={skill}>
                  <Badge tone="neutral">{skill}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <Card className="w-full shrink-0 p-4 lg:w-64">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Hiring manager</p>
            <p className="mt-1 text-sm font-semibold text-ink-900 dark:text-white">{job.hiringManager}</p>
            <dl className="mt-3 grid grid-cols-2 gap-2">
              <div className="surface-muted px-2.5 py-2">
                <dt className="text-[9px] font-semibold uppercase tracking-wider text-ink-400">Avg fit</dt>
                <dd className="text-base font-black tabular-nums text-ink-900 dark:text-white">
                  {stats.avgScore}
                </dd>
              </div>
              <div className="surface-muted px-2.5 py-2">
                <dt className="text-[9px] font-semibold uppercase tracking-wider text-ink-400">Seats</dt>
                <dd className="text-base font-black tabular-nums text-ink-900 dark:text-white">
                  {job.openSeats}
                </dd>
              </div>
            </dl>
            <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-relaxed text-ink-400">
              <ShieldIcon className="mt-px h-3 w-3 shrink-0" />
              AI ranks and summarises. A recruiter makes every decision.
            </p>
          </Card>
        </div>
      </header>

      {/* Stage tabs */}
      <section aria-labelledby="pipeline-heading" className="mt-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="pipeline-heading" className="text-lg font-bold tracking-tight text-ink-900 dark:text-white">
              Pipeline
            </h2>
            <p className="text-xs text-muted">{activeStage.description}</p>
          </div>
          <p className="text-[11px] font-medium text-ink-400">
            {pluralize(stats.total, 'candidate')} across {STAGES.length} stages
          </p>
        </div>

        <Tabs
          className="mt-3"
          ariaLabel="Application stages"
          value={stage}
          onChange={setStage}
          tabs={STAGES.map((item) => ({ id: item.id, label: item.label, count: counts[item.id] ?? 0 }))}
        />

        {/* Toolbar */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <label htmlFor="candidate-search" className="sr-only">
              Search candidates in {activeStage.label}
            </label>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              id="candidate-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, skill, location…"
              className="h-9 w-full rounded-xl border border-ink-200 bg-white pl-9 pr-9 text-xs text-ink-800 placeholder:text-ink-400 focus:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:text-ink-100 dark:placeholder:text-ink-500"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear candidate search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <label htmlFor="sort-select" className="sr-only">
                Sort candidates
              </label>
              <select
                id="sort-select"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-9 appearance-none rounded-xl border border-ink-200 bg-white pl-3 pr-8 text-xs font-medium text-ink-700 focus:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:text-ink-200"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
            </div>

            <div
              role="group"
              aria-label="View mode"
              className="flex items-center gap-0.5 rounded-xl border border-ink-200 bg-white p-0.5 dark:border-white/10 dark:bg-white/5"
            >
              <button
                type="button"
                onClick={() => setView('cards')}
                aria-pressed={view === 'cards'}
                aria-label="Card view"
                className={cn(
                  'rounded-lg p-1.5 transition',
                  view === 'cards'
                    ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300'
                    : 'text-ink-400 hover:text-ink-700 dark:hover:text-ink-100',
                )}
              >
                <GridIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setView('table')}
                aria-pressed={view === 'table'}
                aria-label="Table view"
                className={cn(
                  'rounded-lg p-1.5 transition',
                  view === 'table'
                    ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300'
                    : 'text-ink-400 hover:text-ink-700 dark:hover:text-ink-100',
                )}
              >
                <TableIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div
          id={`panel-${stage}`}
          role="tabpanel"
          aria-labelledby={`tab-${stage}`}
          tabIndex={-1}
          className="mt-3 outline-none"
        >
          <div aria-live="polite" className="sr-only">
            {loading
              ? 'Loading candidates'
              : `${stageCandidates.length} candidates in ${activeStage.label}`}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {view === 'cards' ? (
                  <div className="grid gap-3 lg:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <ApplicantCardSkeleton key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-ink-200/80 dark:border-white/10">
                    <TableSkeleton rows={5} />
                  </div>
                )}
              </motion.div>
            ) : stageCandidates.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="flex flex-col items-center justify-center gap-2 p-10 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-100 text-ink-400 dark:bg-white/5">
                    <UsersIcon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">
                    {query ? `No candidates match “${query}”` : `No candidates in ${activeStage.label}`}
                  </p>
                  <p className="max-w-sm text-xs text-muted">
                    {query
                      ? 'Try a different name, skill, or location.'
                      : 'Candidates appear here as soon as they reach this stage.'}
                  </p>
                  {query ? (
                    <Button variant="secondary" size="sm" className="mt-1" onClick={() => setQuery('')}>
                      Clear search
                    </Button>
                  ) : null}
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key={`${stage}-${view}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {view === 'cards' ? (
                  <div className="grid gap-3 lg:grid-cols-2">
                    {stageCandidates.map((candidate, index) => (
                      <ApplicantCard
                        key={candidate.id}
                        candidate={candidate}
                        decision={decisions[candidate.id]}
                        onOpen={openCandidate}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <ApplicantTable
                    key={stage}
                    candidates={stageCandidates}
                    decisions={decisions}
                    onOpen={openCandidate}
                    onDecision={handleDecision}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-4 flex items-start gap-1.5 rounded-xl border border-ink-200/70 bg-white/60 px-3 py-2.5 text-[10px] leading-relaxed text-ink-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-ink-400">
          <SparklesIcon className="mt-px h-3.5 w-3.5 shrink-0 text-brand-500" />
          Scores are generated from submitted evidence and are advisory. Accessibility disclosures are
          never scored and are shown only to arrange accommodations.
        </p>
      </section>

      <Suspense fallback={null}>
        {activeCandidate ? (
          <ApplicantDrawer
            candidate={activeCandidate}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            decision={decisions[activeCandidate.id]}
            onDecision={(decision) => handleDecision(activeCandidate, decision)}
          />
        ) : null}
      </Suspense>
    </main>
  )
}
