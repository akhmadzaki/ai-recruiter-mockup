import { useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useFocusTrap } from '../../hooks/useFocusTrap.js'
import { XIcon } from './Icons.jsx'
import { cn } from '../../lib/utils.js'

// Side panel rendered in a portal; focus handling lives in useFocusTrap.
export function Drawer({ open, onClose, title, subtitle, children, footer, className }) {
  const panelRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()
  const reduceMotion = useReducedMotion()

  useFocusTrap(panelRef, open, onClose)

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={subtitle ? descriptionId : undefined}
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={
              reduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 320, damping: 34 }
            }
            className={cn(
              'absolute inset-y-0 right-0 flex w-full flex-col bg-white shadow-drawer outline-none',
              'dark:bg-ink-900 sm:max-w-xl',
              className,
            )}
          >
            <header className="flex items-start gap-3 border-b border-ink-200/80 px-4 py-4 dark:border-white/10 sm:px-6">
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="truncate text-base font-bold text-ink-900 dark:text-white">
                  {title}
                </h2>
                {subtitle ? (
                  <p id={descriptionId} className="mt-0.5 truncate text-xs text-muted">
                    {subtitle}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Close panel"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </header>

            <div className="scroll-thin flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
              {children}
            </div>

            {footer ? (
              <div className="border-t border-ink-200/80 bg-ink-50/60 px-4 py-4 dark:border-white/10 dark:bg-white/[0.02] sm:px-6">
                {footer}
              </div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
