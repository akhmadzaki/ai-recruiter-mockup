import { useId, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils.js'

// Tabs with roving tabindex and arrow/Home/End keys.
export function Tabs({ tabs, value, onChange, ariaLabel, className }) {
  const layoutId = useId()
  const refs = useRef([])
  const reduceMotion = useReducedMotion()

  const focusTab = (index) => {
    const next = (index + tabs.length) % tabs.length
    refs.current[next]?.focus()
    onChange(tabs[next].id)
  }

  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        focusTab(index + 1)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        focusTab(index - 1)
        break
      case 'Home':
        event.preventDefault()
        focusTab(0)
        break
      case 'End':
        event.preventDefault()
        focusTab(tabs.length - 1)
        break
      default:
        break
    }
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'no-scrollbar flex gap-1 overflow-x-auto rounded-xl border border-ink-200/80 bg-ink-100/70 p-1',
        'dark:border-white/10 dark:bg-white/[0.04]',
        className,
      )}
    >
      {tabs.map((tab, index) => {
        const selected = tab.id === value
        return (
          <button
            key={tab.id}
            ref={(element) => {
              refs.current[index] = element
            }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              'relative flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors duration-150 sm:text-sm',
              selected
                ? 'text-ink-900 dark:text-white'
                : 'text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100',
            )}
          >
            {selected ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-white/10"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 420, damping: 34 }
                }
                aria-hidden="true"
              />
            ) : null}
            <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
            <span
              className={cn(
                'relative z-10 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
                selected
                  ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200'
                  : 'bg-ink-200/80 text-ink-500 dark:bg-white/10 dark:text-ink-400',
              )}
            >
              {tab.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
