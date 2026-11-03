import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext.jsx'
import { MoonIcon, SunIcon } from './Icons.jsx'
import { cn } from '../../lib/utils.js'

export function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme()
  const reduceMotion = useReducedMotion()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-9 w-[68px] shrink-0 items-center rounded-full border p-1 transition-colors duration-300',
        isDark
          ? 'border-white/15 bg-ink-800'
          : 'border-ink-200 bg-ink-100',
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-ink-400 dark:text-ink-500">
        <SunIcon className={cn('h-3.5 w-3.5 transition-opacity', isDark ? 'opacity-40' : 'opacity-0')} />
        <MoonIcon className={cn('h-3.5 w-3.5 transition-opacity', isDark ? 'opacity-0' : 'opacity-40')} />
      </span>
      <motion.span
        layout
        transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 32 }}
        className={cn(
          'relative z-10 flex h-7 w-7 items-center justify-center rounded-full shadow-sm',
          isDark ? 'ml-auto bg-ink-950 text-brand-300' : 'mr-auto bg-white text-amber-500',
        )}
      >
        {isDark ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
      </motion.span>
    </button>
  )
}
