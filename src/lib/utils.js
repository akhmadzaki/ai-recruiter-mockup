// Join class names, dropping anything falsy.
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' })

export function formatDate(iso) {
  if (!iso) return '—'
  return dateFormatter.format(new Date(iso))
}

export function relativeTime(iso) {
  if (!iso) return '—'
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

// Score colours. Each tone also has a text label so colour isn't the only cue.
export function scoreTone(score) {
  if (score >= 85) {
    return {
      label: 'Strong fit',
      text: 'text-emerald-700 dark:text-emerald-300',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      stroke: '#10b981',
      bar: 'bg-emerald-500',
    }
  }
  if (score >= 75) {
    return {
      label: 'Good fit',
      text: 'text-brand-700 dark:text-brand-300',
      bg: 'bg-brand-50 dark:bg-brand-500/10',
      border: 'border-brand-200 dark:border-brand-500/30',
      stroke: '#6366f1',
      bar: 'bg-brand-500',
    }
  }
  if (score >= 65) {
    return {
      label: 'Worth a look',
      text: 'text-amber-700 dark:text-amber-300',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      border: 'border-amber-200 dark:border-amber-500/30',
      stroke: '#f59e0b',
      bar: 'bg-amber-500',
    }
  }
  return {
    label: 'Low signal',
    text: 'text-rose-700 dark:text-rose-300',
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    border: 'border-rose-200 dark:border-rose-500/30',
    stroke: '#f43f5e',
    bar: 'bg-rose-500',
  }
}

export function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`
}
