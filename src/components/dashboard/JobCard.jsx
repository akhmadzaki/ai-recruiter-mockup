import { motion } from 'framer-motion'
import { STAGES, getJobStats, getStageCounts } from '../../data/mockData.js'
import { stageTone } from '../../lib/stageTones.js'
import { cn, pluralize, relativeTime } from '../../lib/utils.js'
import { Badge } from '../ui/Badge.jsx'
import { Card } from '../ui/Card.jsx'
import { ChevronRightIcon, ClockIcon, MapPinIcon, SparklesIcon, UsersIcon } from '../ui/Icons.jsx'

export function JobCard({ job, onOpen, index = 0 }) {
  const counts = getStageCounts(job.id)
  const stats = getJobStats(job.id)
  const total = stats.total || 1
  const headingId = `job-${job.id}-title`

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
    >
      <Card
        as="article"
        interactive
        onClick={() => onOpen(job.id)}
        aria-labelledby={headingId}
        className="flex h-full w-full flex-col p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge tone="brand">{job.department}</Badge>
              <Badge tone="outline">{job.type}</Badge>
            </div>
            <h3
              id={headingId}
              className="mt-2.5 text-base font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300"
            >
              {job.title}
            </h3>
          </div>
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-400 transition-all duration-200 group-hover:bg-brand-600 group-hover:text-white dark:bg-white/5 dark:text-ink-400"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPinIcon className="h-3.5 w-3.5" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" />
            {job.workMode}
          </span>
          <span className="inline-flex items-center gap-1">
            <UsersIcon className="h-3.5 w-3.5" />
            {pluralize(stats.total, 'applicant')}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted">{job.description}</p>

        {/* Pipeline split by stage */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-ink-400">
            <span>Pipeline</span>
            <span className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400">
              <SparklesIcon className="h-3 w-3" />
              Avg fit {stats.avgScore}
            </span>
          </div>

          <div
            className="mt-2 flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full bg-ink-200/70 dark:bg-white/10"
            role="img"
            aria-label={STAGES.map((stage) => `${stage.label}: ${counts[stage.id]}`).join(', ')}
          >
            {STAGES.map((stage) =>
              counts[stage.id] > 0 ? (
                <span
                  key={stage.id}
                  className={cn('h-full rounded-full', stageTone(stage.id).bar)}
                  style={{ width: `${(counts[stage.id] / total) * 100}%` }}
                />
              ) : null,
            )}
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            {STAGES.filter((stage) => counts[stage.id] > 0).map((stage) => (
              <span
                key={stage.id}
                className="inline-flex items-center gap-1 text-[10px] font-medium text-ink-500 dark:text-ink-400"
              >
                <span className={cn('h-1.5 w-1.5 rounded-full', stageTone(stage.id).dot)} aria-hidden="true" />
                {stage.short}
                <span className="font-bold tabular-nums text-ink-700 dark:text-ink-200">
                  {counts[stage.id]}
                </span>
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-ink-200/70 pt-3 text-[10px] text-ink-400 dark:border-white/10">
            <span>Posted {relativeTime(job.postedAt)}</span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onOpen(job.id)
              }}
              className="inline-flex items-center gap-1 rounded-lg px-1 py-0.5 text-[11px] font-semibold text-brand-600 transition hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
            >
              View pipeline
              <ChevronRightIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
