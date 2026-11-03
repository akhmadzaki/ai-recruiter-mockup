import { forwardRef } from 'react'
import { cn } from '../../lib/utils.js'
import { Spinner } from './Icons.jsx'

const VARIANTS = {
  primary:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800 disabled:bg-brand-600/60',
  secondary:
    'border border-ink-200 bg-white text-ink-700 shadow-sm hover:bg-ink-50 hover:text-ink-900 ' +
    'dark:border-white/10 dark:bg-white/5 dark:text-ink-100 dark:hover:bg-white/10',
  ghost:
    'text-ink-600 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-white',
  subtle:
    'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20',
  danger:
    'bg-rose-600 text-white shadow-sm hover:bg-rose-700 active:bg-rose-800 disabled:bg-rose-600/60',
  success:
    'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-emerald-600/60',
  outline:
    'border border-brand-300 text-brand-700 hover:bg-brand-50 dark:border-brand-500/40 dark:text-brand-300 dark:hover:bg-brand-500/10',
}

const SIZES = {
  sm: 'h-8 gap-1.5 rounded-lg px-3 text-xs',
  md: 'h-10 gap-2 rounded-xl px-4 text-sm',
  lg: 'h-11 gap-2 rounded-xl px-5 text-sm',
  icon: 'h-9 w-9 rounded-lg',
}

export const Button = forwardRef(function Button(
  {
    as: Component = 'button',
    variant = 'primary',
    size = 'md',
    loading = false,
    loadingLabel = 'Loading',
    className,
    children,
    disabled,
    type,
    ...props
  },
  ref,
) {
  const isButton = Component === 'button'
  return (
    <Component
      ref={ref}
      type={isButton ? type ?? 'button' : type}
      disabled={isButton ? disabled || loading : undefined}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex select-none items-center justify-center font-semibold transition-colors duration-150',
        'disabled:cursor-not-allowed disabled:opacity-70',
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <Spinner className="h-4 w-4" />
          <span className="sr-only">{loadingLabel}</span>
        </>
      ) : null}
      {children}
    </Component>
  )
})
