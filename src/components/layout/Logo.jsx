import { cn } from '../../lib/utils.js'

export function Logo({ className, showWordmark = true, size = 'md' }) {
  const markSize = size === 'sm' ? 'h-8 w-8 text-sm' : 'h-9 w-9 text-base'
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-violet-600 font-black text-white shadow-sm',
          markSize,
        )}
      >
        R
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-ink-950" />
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="text-sm font-bold tracking-tight text-ink-900 dark:text-white">Recruiter</span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            Talent AI
          </span>
        </span>
      ) : null}
    </span>
  )
}
