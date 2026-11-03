import { motion } from 'framer-motion'
import { cn, relativeTime } from '../../lib/utils.js'
import { Avatar } from '../ui/Avatar.jsx'
import { Badge } from '../ui/Badge.jsx'
import { Card } from '../ui/Card.jsx'
import { ScoreRing } from '../ui/ScoreRing.jsx'
import {
  AccessibilityIcon,
  AlertTriangleIcon,
  CheckIcon,
  ChevronRightIcon,
  SparklesIcon,
} from '../ui/Icons.jsx'

const DECISION_BADGES = {
  advanced: { tone: 'success', label: 'Advanced' },
  hold: { tone: 'warning', label: 'On hold' },
  rejected: { tone: 'danger', label: 'Rejected' },
}

export function ApplicantCard({ candidate, decision, onOpen, index = 0 }) {
  const decisionBadge = DECISION_BADGES[decision]
  const headingId = `candidate-${candidate.id}-name`

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.24), ease: [0.22, 1, 0.36, 1] }}
    >
      <Card
        as="article"
        interactive
        onClick={() => onOpen(candidate)}
        aria-labelledby={headingId}
        className="w-full p-4 sm:p-5"
      >
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <Avatar name={candidate.name} size="md" />
            <span
              className={cn(
                'absolute -bottom-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px] font-black ring-2 ring-white dark:ring-ink-900',
                candidate.rank === 1
                  ? 'bg-amber-400 text-amber-950'
                  : 'bg-ink-700 text-white dark:bg-ink-600',
              )}
              aria-hidden="true"
            >
              #{candidate.rank}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 id={headingId} className="truncate text-sm font-bold text-ink-900 dark:text-white">
                {candidate.name}
              </h3>
              {decisionBadge ? <Badge tone={decisionBadge.tone}>{decisionBadge.label}</Badge> : null}
            </div>
            <p className="mt-0.5 truncate text-[11px] text-muted">
              {candidate.years} yrs experience · {candidate.location} · {candidate.source}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1">
              {candidate.tags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
              {candidate.accessibility.needs ? (
                <Badge
                  tone="brand"
                  icon={AccessibilityIcon}
                  title={`Self-declared accessibility need: ${candidate.accessibility.type}. Used for accommodations only — never scored.`}
                >
                  {candidate.accessibility.type}
                </Badge>
              ) : null}
            </div>
          </div>

          <ScoreRing score={candidate.score} size={52} strokeWidth={5} showLabel className="shrink-0" />
        </div>

        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted">{candidate.aiSummary}</p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-200/60 bg-emerald-50/60 p-2.5 dark:border-emerald-500/20 dark:bg-emerald-500/[0.06]">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              <CheckIcon className="h-3 w-3" />
              Strengths
            </p>
            <ul className="mt-1 space-y-0.5">
              {candidate.strengths.slice(0, 2).map((strength) => (
                <li key={strength} className="line-clamp-1 text-[11px] text-ink-600 dark:text-ink-300">
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-amber-200/60 bg-amber-50/60 p-2.5 dark:border-amber-500/20 dark:bg-amber-500/[0.06]">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              <AlertTriangleIcon className="h-3 w-3" />
              Watch-outs
            </p>
            <ul className="mt-1 space-y-0.5">
              {candidate.weaknesses.slice(0, 2).map((weakness) => (
                <li key={weakness} className="line-clamp-1 text-[11px] text-ink-600 dark:text-ink-300">
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-ink-200/70 pt-3 dark:border-white/10">
          <span className="text-[10px] text-ink-400">Applied {relativeTime(candidate.appliedAt)}</span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onOpen(candidate)
            }}
            className="inline-flex items-center gap-1 rounded-lg px-1 py-0.5 text-[11px] font-semibold text-brand-600 transition hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
          >
            <SparklesIcon className="h-3.5 w-3.5" />
            View AI analysis
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </Card>
    </motion.div>
  )
}
