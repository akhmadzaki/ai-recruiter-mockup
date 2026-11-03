import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext.jsx'
import { COMPANY } from '../../data/mockData.js'
import { Avatar } from '../ui/Avatar.jsx'
import { ThemeToggle } from '../ui/ThemeToggle.jsx'
import { BuildingIcon, ChevronDownIcon, LogOutIcon, ShieldIcon } from '../ui/Icons.jsx'
import { Logo } from './Logo.jsx'
import { cn } from '../../lib/utils.js'

function UserMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (!user) return null

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Account menu for ${user.name}`}
        className="flex items-center gap-2 rounded-full border border-transparent p-0.5 pr-1.5 transition hover:border-ink-200 hover:bg-white dark:hover:border-white/10 dark:hover:bg-white/5"
      >
        <Avatar name={user.name} size="sm" />
        <span className="hidden text-left sm:block">
          <span className="block text-xs font-semibold leading-tight text-ink-800 dark:text-ink-100">
            {user.name}
          </span>
          <span className="block text-[10px] leading-tight text-muted">{user.role}</span>
        </span>
        <ChevronDownIcon
          className={cn('h-4 w-4 text-ink-400 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-label="Account menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+8px)] w-64 origin-top-right overflow-hidden rounded-xl border border-ink-200 bg-white shadow-card-hover dark:border-white/10 dark:bg-ink-900"
          >
            <div className="border-b border-ink-200/80 px-4 py-3 dark:border-white/10">
              <p className="truncate text-sm font-semibold text-ink-900 dark:text-white">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
              <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <ShieldIcon className="h-3 w-3" />
                Signed in with Google
              </p>
            </div>
            <div className="p-1.5">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  logout()
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-ink-700 transition hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/10"
              >
                <LogOutIcon className="h-4 w-4" />
                Log out
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function Header({ onNavigateHome, showHomeLink = false }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-ink-50/80 backdrop-blur-md dark:border-white/10 dark:bg-ink-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onNavigateHome}
          className="rounded-lg focus-visible:ring-offset-2"
          aria-label="Recruiter Talent AI — go to dashboard"
        >
          <Logo />
        </button>

        <span className="mx-1 hidden h-6 w-px bg-ink-200 dark:bg-white/10 sm:block" aria-hidden="true" />

        <span className="hidden items-center gap-1.5 rounded-full border border-ink-200 bg-white px-2.5 py-1 text-xs font-semibold text-ink-600 dark:border-white/10 dark:bg-white/5 dark:text-ink-300 sm:inline-flex">
          <BuildingIcon className="h-3.5 w-3.5 text-brand-500" />
          {COMPANY.name}
          <span className="rounded-full bg-brand-50 px-1.5 text-[10px] font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            {COMPANY.plan}
          </span>
        </span>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {showHomeLink ? (
            <button
              type="button"
              onClick={onNavigateHome}
              className="hidden rounded-lg px-3 py-2 text-xs font-semibold text-ink-600 transition hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-white sm:block"
            >
              All roles
            </button>
          ) : null}
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
