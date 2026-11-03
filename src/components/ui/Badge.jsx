import { cn } from '../../lib/utils.js'

const TONES = {
  neutral:
    'border-ink-200 bg-ink-100/80 text-ink-600 dark:border-white/10 dark:bg-white/5 dark:text-ink-300',
  brand:
    'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300',
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
  warning:
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300',
  danger:
    'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300',
  outline: 'border-ink-200 text-ink-600 dark:border-white/15 dark:text-ink-300',
}

export function Badge({ tone = 'neutral', className, children, icon: Icon, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold leading-5',
        TONES[tone] ?? TONES.neutral,
        className,
      )}
      {...props}
    >
      {Icon ? <Icon className="h-3 w-3" /> : null}
      {children}
    </span>
  )
}
