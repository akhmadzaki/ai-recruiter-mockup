import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils.js'

const ToastContext = createContext(null)

const TONE_STYLES = {
  success: 'border-emerald-200 bg-white text-ink-800 dark:border-emerald-500/30 dark:bg-ink-900 dark:text-ink-100',
  info: 'border-brand-200 bg-white text-ink-800 dark:border-brand-500/30 dark:bg-ink-900 dark:text-ink-100',
  warning: 'border-amber-200 bg-white text-ink-800 dark:border-amber-500/30 dark:bg-ink-900 dark:text-ink-100',
}

const TONE_DOT = {
  success: 'bg-emerald-500',
  info: 'bg-brand-500',
  warning: 'bg-amber-500',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)
  const reduceMotion = useReducedMotion()

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback(
    ({ title, description, tone = 'success', duration = 4200 }) => {
      idRef.current += 1
      const id = idRef.current
      setToasts((current) => [...current.slice(-2), { id, title, description, tone }])
      window.setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
        role="region"
        aria-label="Notifications"
      >
        <div aria-live="polite" aria-atomic="false" className="flex w-full flex-col items-center gap-2 sm:items-end">
          <AnimatePresence initial={false}>
            {toasts.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border p-3.5 shadow-card-hover',
                  TONE_STYLES[item.tone] ?? TONE_STYLES.info,
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', TONE_DOT[item.tone] ?? TONE_DOT.info)}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{item.title}</p>
                  {item.description ? (
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.description}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(item.id)}
                  className="rounded-md p-1 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label={`Dismiss notification: ${item.title}`}
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside <ToastProvider>')
  return context
}
