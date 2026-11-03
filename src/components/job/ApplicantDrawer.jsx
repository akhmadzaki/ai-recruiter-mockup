import { Badge } from '../ui/Badge.jsx'
import { Button } from '../ui/Button.jsx'
import { Drawer } from '../ui/Drawer.jsx'
import { ScoreBar, ScoreRing } from '../ui/ScoreRing.jsx'
import { cn, formatDate, scoreTone } from '../../lib/utils.js'
import {
  AccessibilityIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  CheckIcon,
  InfoIcon,
  ShieldIcon,
  SparklesIcon,
  StarIcon,
} from '../ui/Icons.jsx'

const BREAKDOWN_LABELS = {
  technical: 'Technical signal',
  communication: 'Communication',
  problemSolving: 'Problem solving',
  cultureAdd: 'Team & values',
}

const DECISIONS = [
  { id: 'advanced', label: 'Advance', variant: 'success' },
  { id: 'hold', label: 'Hold', variant: 'secondary' },
  { id: 'rejected', label: 'Reject', variant: 'danger' },
]

export default function ApplicantDrawer({ candidate, open, onClose, decision, onDecision }) {
  if (!candidate) return null

  const tone = scoreTone(candidate.score)
  const isDecided = Boolean(decision)

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={candidate.name}
      subtitle={`${candidate.role} · ${candidate.stageLabel}`}
      footer={
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
              Human decision
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-ink-400">
              <ShieldIcon className="h-3 w-3" />
              AI is advisory only
            </span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {DECISIONS.map((option) => {
              const selected = decision === option.id
              return (
                <Button
                  key={option.id}
                  variant={selected ? option.variant : 'secondary'}
                  size="sm"
                  aria-pressed={selected}
                  onClick={() => onDecision(option.id)}
                  className={cn('justify-center', selected && 'ring-2 ring-offset-1 ring-offset-white dark:ring-offset-ink-900')}
                >
                  {selected ? <CheckIcon className="h-3.5 w-3.5" /> : null}
                  {option.label}
                </Button>
              )
            })}
          </div>
          <p aria-live="polite" className="mt-2 text-center text-[10px] text-muted">
            {isDecided
              ? `Recorded as “${DECISIONS.find((item) => item.id === decision)?.label}”. You can change this at any time.`
              : 'Nothing is submitted automatically — choose an outcome to record it.'}
          </p>
        </div>
      }
    >
      {/* Score hero */}
      <section aria-label="AI fit score" className="surface-muted flex items-center gap-4 p-4">
        <ScoreRing score={candidate.score} size={84} strokeWidth={7} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={cn('text-sm font-bold', tone.text)}>{tone.label}</span>
            <Badge tone="brand" icon={SparklesIcon}>
              Rank #{candidate.rank} in stage
            </Badge>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted">
            Model confidence:{' '}
            <span className="font-semibold text-ink-700 dark:text-ink-200">
              {candidate.evidence.find((item) => item.label === 'Signal confidence')?.value ?? 'Medium'}
            </span>
            . Based on {candidate.stageLabel.toLowerCase()} evidence only.
          </p>
          <p className="mt-1 text-[10px] text-ink-400">
            Applied {formatDate(candidate.appliedAt)} · {candidate.source}
          </p>
        </div>
      </section>

      {/* AI summary */}
      <section aria-labelledby="ai-summary-heading" className="mt-5">
        <h3
          id="ai-summary-heading"
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400"
        >
          <SparklesIcon className="h-3.5 w-3.5 text-brand-500" />
          AI summary
        </h3>
        <p className="mt-2 rounded-xl border border-brand-200/70 bg-brand-50/60 p-3.5 text-sm leading-relaxed text-ink-700 dark:border-brand-500/20 dark:bg-brand-500/[0.07] dark:text-ink-200">
          {candidate.aiSummary}
        </p>
      </section>

      {/* Breakdown */}
      <section aria-labelledby="breakdown-heading" className="mt-5">
        <h3
          id="breakdown-heading"
          className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400"
        >
          Score breakdown
        </h3>
        <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
          {Object.entries(candidate.breakdown).map(([key, value]) => (
            <ScoreBar key={key} label={BREAKDOWN_LABELS[key] ?? key} value={value} />
          ))}
        </div>
      </section>

      {/* Strengths / watch-outs */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <section
          aria-labelledby="strengths-heading"
          className="rounded-xl border border-emerald-200/70 bg-emerald-50/50 p-3.5 dark:border-emerald-500/20 dark:bg-emerald-500/[0.06]"
        >
          <h3
            id="strengths-heading"
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300"
          >
            <CheckCircleIcon className="h-4 w-4" />
            Strengths
          </h3>
          <ul className="mt-2 space-y-1.5">
            {candidate.strengths.map((strength) => (
              <li key={strength} className="flex gap-2 text-[11px] leading-relaxed text-ink-700 dark:text-ink-200">
                <CheckIcon className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                {strength}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="watchouts-heading"
          className="rounded-xl border border-amber-200/70 bg-amber-50/50 p-3.5 dark:border-amber-500/20 dark:bg-amber-500/[0.06]"
        >
          <h3
            id="watchouts-heading"
            className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300"
          >
            <AlertTriangleIcon className="h-4 w-4" />
            Watch-outs
          </h3>
          <ul className="mt-2 space-y-1.5">
            {candidate.weaknesses.map((weakness) => (
              <li key={weakness} className="flex gap-2 text-[11px] leading-relaxed text-ink-700 dark:text-ink-200">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                {weakness}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Full analysis */}
      <section aria-labelledby="full-analysis-heading" className="mt-5">
        <h3
          id="full-analysis-heading"
          className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400"
        >
          Full analysis
        </h3>
        <div className="mt-2 space-y-2.5">
          {candidate.aiDetail.map((paragraph, index) => (
            <p key={index} className="text-xs leading-relaxed text-ink-600 dark:text-ink-300">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Accessibility */}
      {candidate.accessibility.needs ? (
        <section
          aria-labelledby="accessibility-heading"
          className="mt-5 rounded-xl border border-brand-200/70 bg-brand-50/50 p-3.5 dark:border-brand-500/20 dark:bg-brand-500/[0.06]"
        >
          <h3
            id="accessibility-heading"
            className="flex items-center gap-1.5 text-xs font-bold text-brand-800 dark:text-brand-300"
          >
            <AccessibilityIcon className="h-4 w-4" />
            Accessibility & accommodations
          </h3>
          <dl className="mt-2 space-y-1.5 text-[11px]">
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 font-semibold text-ink-500 dark:text-ink-400">Self-declared</dt>
              <dd className="text-ink-700 dark:text-ink-200">{candidate.accessibility.type}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 font-semibold text-ink-500 dark:text-ink-400">Arrangement</dt>
              <dd className="text-ink-700 dark:text-ink-200">{candidate.accessibility.accommodation}</dd>
            </div>
          </dl>
          <p className="mt-2 flex gap-1.5 rounded-lg bg-white/70 px-2.5 py-2 text-[10px] leading-relaxed text-ink-500 dark:bg-white/5 dark:text-ink-400">
            <InfoIcon className="mt-px h-3 w-3 shrink-0" />
            Shared only with the interview panel to arrange accommodations. It is excluded from the AI
            score and from every ranking.
          </p>
        </section>
      ) : null}

      {/* Evidence */}
      <section aria-labelledby="evidence-heading" className="mt-5">
        <h3
          id="evidence-heading"
          className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400"
        >
          Evidence used
        </h3>
        <dl className="mt-2 grid grid-cols-2 gap-2">
          {candidate.evidence.map((item) => (
            <div key={item.label} className="surface-muted px-3 py-2">
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">{item.label}</dt>
              <dd className="mt-0.5 text-xs font-semibold text-ink-800 dark:text-ink-100">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-5 rounded-xl border border-ink-200/80 bg-ink-50/70 p-3.5 dark:border-white/10 dark:bg-white/[0.03]">
        <h3 className="flex items-center gap-1.5 text-xs font-bold text-ink-700 dark:text-ink-200">
          <StarIcon className="h-3.5 w-3.5 text-ink-400" />
          What the model did not see
        </h3>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
          Motivation, availability, compensation, references, and how this person works with a team.
          Those are yours to assess in the next conversation.
        </p>
      </section>
    </Drawer>
  )
}
