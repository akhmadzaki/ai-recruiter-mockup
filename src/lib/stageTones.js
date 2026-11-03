// Stage colours used by the pipeline bar, tabs and table.
export const STAGE_TONES = {
  screening: {
    dot: 'bg-sky-500',
    bar: 'bg-sky-500',
    text: 'text-sky-700 dark:text-sky-300',
    bg: 'bg-sky-50 dark:bg-sky-500/10',
    border: 'border-sky-200 dark:border-sky-500/30',
  },
  'hr-interview': {
    dot: 'bg-violet-500',
    bar: 'bg-violet-500',
    text: 'text-violet-700 dark:text-violet-300',
    bg: 'bg-violet-50 dark:bg-violet-500/10',
    border: 'border-violet-200 dark:border-violet-500/30',
  },
  'technical-test': {
    dot: 'bg-amber-500',
    bar: 'bg-amber-500',
    text: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    border: 'border-amber-200 dark:border-amber-500/30',
  },
  'ceo-interview': {
    dot: 'bg-fuchsia-500',
    bar: 'bg-fuchsia-500',
    text: 'text-fuchsia-700 dark:text-fuchsia-300',
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10',
    border: 'border-fuchsia-200 dark:border-fuchsia-500/30',
  },
  offer: {
    dot: 'bg-emerald-500',
    bar: 'bg-emerald-500',
    text: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-200 dark:border-emerald-500/30',
  },
}

export function stageTone(stageId) {
  return STAGE_TONES[stageId] ?? STAGE_TONES.screening
}
