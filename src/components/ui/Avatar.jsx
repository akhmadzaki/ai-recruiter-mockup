import { cn, initials } from '../../lib/utils.js'

const GRADIENTS = [
  'from-brand-500 to-violet-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
  'from-sky-500 to-cyan-500',
  'from-fuchsia-500 to-purple-500',
]

const SIZES = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
}

function hashName(name = '') {
  let hash = 0
  for (let index = 0; index < name.length; index += 1) {
    hash = (hash * 31 + name.charCodeAt(index)) % 997
  }
  return hash
}

export function Avatar({ name = '', size = 'md', className, ring = false }) {
  const gradient = GRADIENTS[hashName(name) % GRADIENTS.length]
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white',
        gradient,
        SIZES[size] ?? SIZES.md,
        ring && 'ring-2 ring-white dark:ring-ink-900',
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}
