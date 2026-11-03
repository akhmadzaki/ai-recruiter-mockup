import { motion, useReducedMotion } from 'framer-motion'
import { cn, scoreTone } from '../../lib/utils.js'

export function ScoreRing({ score, size = 56, strokeWidth = 5, className, showLabel = false }) {
  const tone = scoreTone(score)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const reduceMotion = useReducedMotion()

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <div
        className="relative inline-flex items-center justify-center"
        style={{ width: size, height: size }}
        role="img"
        aria-label={`AI fit score ${score} out of 100 — ${tone.label}`}
      >
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-ink-200 dark:stroke-white/10"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={tone.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={reduceMotion ? false : { strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span
          className={cn('absolute text-sm font-bold tabular-nums', tone.text)}
          style={{ fontSize: Math.max(11, size * 0.26) }}
        >
          {score}
        </span>
      </div>
      {showLabel ? (
        <span className={cn('text-[11px] font-semibold', tone.text)}>{tone.label}</span>
      ) : null}
    </div>
  )
}

export function ScoreBar({ label, value }) {
  const tone = scoreTone(value)
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs font-medium text-ink-600 dark:text-ink-300">{label}</span>
        <span className="text-xs font-semibold tabular-nums text-ink-700 dark:text-ink-200">{value}</span>
      </div>
      <div
        className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-200/80 dark:bg-white/10"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.div
          className={cn('h-full rounded-full', tone.bar)}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
