import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { stageTone } from '../../lib/stageTones.js'
import { cn, relativeTime, scoreTone } from '../../lib/utils.js'
import { Badge } from '../ui/Badge.jsx'
import { Button } from '../ui/Button.jsx'
import { ScoreRing } from '../ui/ScoreRing.jsx'
import {
  AccessibilityIcon,
  AlertTriangleIcon,
  ArrowUpDownIcon,
  CheckIcon,
  ChevronRightIcon,
  FilterIcon,
  SparklesIcon,
} from '../ui/Icons.jsx'

const COLUMNS = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'stage', label: 'Stage', sortable: true },
  { id: 'score', label: 'AI Score', sortable: true },
  { id: 'experience', label: 'Experience', sortable: true },
  { id: 'location', label: 'Location', sortable: false },
  { id: 'accessibility', label: 'Accessibility', sortable: false },
  { id: 'applied', label: 'Applied', sortable: true },
  { id: 'decision', label: 'Decision', sortable: true },
]

const PER_PAGE = 5

const DECISION_BADGES = {
  advanced: { tone: 'success', label: 'Advanced' },
  hold: { tone: 'warning', label: 'On hold' },
  rejected: { tone: 'danger', label: 'Rejected' },
}

function sortCandidates(list, column, direction) {
  if (!column || !direction) return list
  const sorted = [...list]
  sorted.sort((a, b) => {
    let result = 0
    switch (column) {
      case 'name':
        result = a.name.localeCompare(b.name)
        break
      case 'score':
        result = a.score - b.score
        break
      case 'experience':
        result = a.years - b.years
        break
      case 'applied':
        result = new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime()
        break
      case 'stage':
        result = a.stageLabel.localeCompare(b.stageLabel)
        break
      case 'decision':
        result = (a.decision ?? '').localeCompare(b.decision ?? '')
        break
      default:
        result = 0
    }
    return direction === 'asc' ? result : -result
  })
  return sorted
}

export function ApplicantTable({ candidates, decisions, onOpen, onDecision }) {
  const [sortColumn, setSortColumn] = useState('score')
  const [sortDirection, setSortDirection] = useState('desc')
  const [page, setPage] = useState(1)
  const [visibleColumns, setVisibleColumns] = useState(new Set(COLUMNS.map((col) => col.id)))
  const [expandedRows, setExpandedRows] = useState(new Set())
  const [columnMenuOpen, setColumnMenuOpen] = useState(false)
  const columnMenuRef = useRef(null)

  // Close column menu on outside click
  useEffect(() => {
    if (!columnMenuOpen) return undefined
    const onPointerDown = (event) => {
      if (!columnMenuRef.current?.contains(event.target)) setColumnMenuOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [columnMenuOpen])

  const sorted = useMemo(
    () => sortCandidates(candidates, sortColumn, sortDirection),
    [candidates, sortColumn, sortDirection],
  )

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = useMemo(
    () => sorted.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE),
    [sorted, safePage],
  )

  function toggleSort(columnId) {
    if (sortColumn === columnId) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(columnId)
      setSortDirection('asc')
    }
    setPage(1)
  }

  function toggleColumn(columnId) {
    const next = new Set(visibleColumns)
    if (next.has(columnId)) {
      next.delete(columnId)
    } else {
      next.add(columnId)
    }
    setVisibleColumns(next)
  }

  function toggleExpand(rowId) {
    const next = new Set(expandedRows)
    if (next.has(rowId)) {
      next.delete(rowId)
    } else {
      next.add(rowId)
    }
    setExpandedRows(next)
  }

  const visibleCols = COLUMNS.filter((col) => visibleColumns.has(col.id))

  return (
    <div className="overflow-x-auto scroll-thin rounded-xl border border-ink-200/80 dark:border-white/10">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 sm:px-5">
        <p className="text-[11px] font-semibold text-ink-500 dark:text-ink-400">
          {sorted.length} candidate{sorted.length === 1 ? '' : 's'}
        </p>
        <div className="relative" ref={columnMenuRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setColumnMenuOpen((value) => !value)}
            aria-expanded={columnMenuOpen}
            aria-controls="column-menu"
            aria-label="Toggle columns"
          >
            <FilterIcon className="h-4 w-4" />
            Columns
          </Button>
          {columnMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.14 }}
              id="column-menu"
              className="absolute right-0 top-[calc(100%+6px)] z-20 w-48 origin-top-right rounded-xl border border-ink-200 bg-white shadow-card-hover dark:border-white/10 dark:bg-ink-900"
              role="group"
              aria-label="Column visibility"
            >
              {COLUMNS.map((col) => (
                <label
                  key={col.id}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-ink-700 transition hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-white/5"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.has(col.id)}
                    onChange={() => toggleColumn(col.id)}
                    className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500 dark:border-white/20"
                  />
                  {col.label}
                </label>
              ))}
            </motion.div>
          ) : null}
        </div>
      </div>

      <table
        className="w-full border-collapse text-left text-xs"
        role="table"
        aria-label="Applicants"
      >
        <thead>
          <tr className="border-b border-ink-200/80 dark:border-white/10">
            <th scope="col" className="w-8 px-2 py-2.5">
              <span className="sr-only">Expand row</span>
            </th>
            {visibleCols.map((col) => (
              <th
                key={col.id}
                scope="col"
                className={cn(
                  'px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400',
                  col.sortable && 'cursor-pointer select-none hover:text-ink-800 dark:hover:text-ink-100',
                )}
                aria-sort={
                  col.sortable && sortColumn === col.id
                    ? (sortDirection === 'asc' ? 'ascending' : 'descending')
                    : undefined
                }
                onClick={col.sortable ? () => toggleSort(col.id) : undefined}
                tabIndex={col.sortable ? 0 : undefined}
                onKeyDown={col.sortable ? (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSort(col.id) } } : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortColumn === col.id ? (
                    <ArrowUpDownIcon
                      className={cn('h-3 w-3', sortDirection === 'asc' ? 'rotate-180' : '')}
                    />
                  ) : null}
                </span>
              </th>
            ))}
            <th scope="col" className="w-10 px-2 py-2.5">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((candidate) => {
            const expanded = expandedRows.has(candidate.id)
            const decisionBadge = DECISION_BADGES[decisions[candidate.id]]
            const tone = stageTone(candidate.stage)
            const scoreToneValue = scoreTone(candidate.score)
            return (
              <Fragment key={candidate.id}>
                <tr
                  className={cn(
                    'border-b border-ink-200/70 cursor-pointer transition-colors hover:bg-ink-50 dark:border-white/10 dark:hover:bg-white/5',
                    expanded && 'bg-brand-50/50 dark:bg-brand-500/[0.05]',
                  )}
                  tabIndex={0}
                  onClick={() => toggleExpand(candidate.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      toggleExpand(candidate.id)
                    }
                  }}
                  aria-expanded={expanded}
                >
                  <td className="w-0 px-2 py-2.5">
                    <ChevronRightIcon
                      className={cn('h-3.5 w-3.5 text-ink-400 transition-transform', expanded && 'rotate-90')}
                    />
                  </td>
                  {visibleCols.map((col) => (
                    <td key={col.id} className="px-3 py-2.5 text-ink-700 dark:text-ink-200">
                      {renderCell(col.id, candidate, decisionBadge, tone, scoreToneValue)}
                    </td>
                  ))}
                  <td className="px-2 py-2.5">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        onOpen(candidate)
                      }}
                      className="rounded-lg p-1 text-brand-600 transition hover:bg-brand-50 hover:text-brand-800 dark:text-brand-400 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
                      aria-label={`View AI analysis for ${candidate.name}`}
                    >
                      <SparklesIcon className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
                {expanded ? (
                  <tr className="border-b border-ink-200/70 dark:border-white/10">
                    <td colSpan={visibleCols.length + 2} className="px-4 py-3 sm:px-5">
                      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                        <div className="min-w-0">
                          <p className="text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                            {candidate.aiSummary}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {candidate.strengths.slice(0, 2).map((strength) => (
                              <span
                                key={strength}
                                className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                              >
                                <CheckIcon className="h-3 w-3" />
                                {strength}
                              </span>
                            ))}
                            {candidate.weaknesses.slice(0, 1).map((weakness) => (
                              <span
                                key={weakness}
                                className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                              >
                                <AlertTriangleIcon className="h-3 w-3" />
                                {weakness}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {[
                            { id: 'advanced', label: 'Advance', variant: 'success' },
                            { id: 'hold', label: 'Hold', variant: 'secondary' },
                            { id: 'rejected', label: 'Reject', variant: 'danger' },
                          ].map((option) => {
                            const selected = decisions[candidate.id] === option.id
                            return (
                              <Button
                                key={option.id}
                                variant={selected ? option.variant : 'secondary'}
                                size="sm"
                                aria-pressed={selected}
                                onClick={(event) => {
                                  event.stopPropagation()
                                  onDecision(candidate, option.id)
                                }}
                              >
                                {selected ? <CheckIcon className="h-3 w-3" /> : null}
                                {option.label}
                              </Button>
                            )
                          })}
                          <Button
                            variant="subtle"
                            size="sm"
                            onClick={(event) => {
                              event.stopPropagation()
                              onOpen(candidate)
                            }}
                          >
                            Full AI analysis
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            )
          })}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 ? (
        <div className="flex items-center justify-between gap-2 border-t border-ink-200/80 px-4 py-2.5 dark:border-white/10 sm:px-5">
          <p className="text-[10px] text-muted">
            Page {safePage} of {totalPages}
          </p>
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage(safePage - 1)}
              className="rounded-lg px-2 py-1.5 text-[11px] font-semibold text-ink-600 transition hover:bg-ink-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-ink-400 dark:hover:bg-white/10"
              aria-label="Previous page"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setPage(pageNum)}
                  aria-current={pageNum === safePage ? 'page' : undefined}
                  aria-label={`Page ${pageNum}`}
                  className={cn(
                    'rounded-lg px-2 py-1.5 text-[11px] font-semibold transition',
                    pageNum === safePage
                      ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300'
                      : 'text-ink-600 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-white/10',
                  )}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage(safePage + 1)}
              className="rounded-lg px-2 py-1.5 text-[11px] font-semibold text-ink-600 transition hover:bg-ink-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-ink-400 dark:hover:bg-white/10"
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        </div>
      ) : null}
    </div>
  )
}

function renderCell(columnId, candidate, decisionBadge, stageToneValue, scoreToneValue) {
  switch (columnId) {
    case 'name':
      return (
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-[9px] font-bold text-white"
          >
            {candidate.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()}
          </span>
          <span className="truncate font-semibold text-ink-800 dark:text-ink-100">{candidate.name}</span>
        </span>
      )
    case 'stage':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold',
            stageToneValue.bg,
            stageToneValue.text,
          )}
        >
          <span className={cn('h-1.5 w-1.5 rounded-full', stageToneValue.dot)} aria-hidden="true" />
          {candidate.stageLabel}
        </span>
      )
    case 'score':
      return (
        <span className="inline-flex items-center gap-1.5">
          <ScoreRing score={candidate.score} size={34} strokeWidth={3.5} />
          <span className={cn('text-[10px] font-semibold', scoreToneValue.text)}>{scoreToneValue.label}</span>
        </span>
      )
    case 'experience':
      return <span className="tabular-nums">{candidate.years} yr{candidate.years === 1 ? '' : 's'}</span>
    case 'location':
      return <span className="text-muted">{candidate.location}</span>
    case 'accessibility':
      return candidate.accessibility.needs ? (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-brand-600 dark:text-brand-400">
          <AccessibilityIcon className="h-3 w-3" />
          {candidate.accessibility.type}
        </span>
      ) : (
        <span className="text-muted">—</span>
      )
    case 'applied':
      return <span className="tabular-nums text-muted">{relativeTime(candidate.appliedAt)}</span>
    case 'decision':
      return decisionBadge ? <Badge tone={decisionBadge.tone}>{decisionBadge.label}</Badge> : null
    default:
      return null
  }
}