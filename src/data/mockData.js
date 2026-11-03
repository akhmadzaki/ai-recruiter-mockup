// Fictional data for the demo. Scores come from a simulated ranking model and
// are advisory only — a person makes the hiring call.

export const COMPANY = {
  name: 'Recruiter',
  product: 'Talent AI',
  tagline: 'AI-assisted hiring, human-led decisions',
  plan: 'Scale',
  seats: 24,
  logoLetter: 'R',
}

export const STAGES = [
  {
    id: 'screening',
    label: 'Screening',
    short: 'Screening',
    description: 'CV review and AI pre-screen against the role scorecard.',
  },
  {
    id: 'hr-interview',
    label: 'HR Interview',
    short: 'HR',
    description: 'Motivation, availability, and compensation alignment.',
  },
  {
    id: 'technical-test',
    label: 'Technical Test',
    short: 'Tech test',
    description: 'Take-home or live exercise, graded against a rubric.',
  },
  {
    id: 'ceo-interview',
    label: 'CEO Interview',
    short: 'CEO',
    description: 'Final values and trajectory conversation with leadership.',
  },
  {
    id: 'offer',
    label: 'Offer',
    short: 'Offer',
    description: 'Offer extended — awaiting candidate response.',
  },
]

export const JOBS = [
  {
    id: 'job-frontend',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Jakarta, ID',
    workMode: 'Hybrid',
    type: 'Full-time',
    level: 'Senior',
    postedAt: '2026-10-06',
    hiringManager: 'Rani Prameswari',
    openSeats: 2,
    description:
      'Own the candidate-facing experience of our hiring platform. You will pair with design on a shared component system and keep Core Web Vitals green on low-end Android devices.',
    skills: ['React', 'TypeScript', 'Design systems', 'Accessibility', 'Performance'],
  },
  {
    id: 'job-designer',
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote (GMT+7 ±3)',
    workMode: 'Remote',
    type: 'Full-time',
    level: 'Mid–Senior',
    postedAt: '2026-10-11',
    hiringManager: 'Tomas Lindqvist',
    openSeats: 1,
    description:
      'Shape the recruiter workspace end to end: research, flows, and a design system that survives contact with real, messy hiring data.',
    skills: ['Figma', 'Design systems', 'User research', 'Prototyping'],
  },
  {
    id: 'job-ml',
    title: 'Machine Learning Engineer',
    department: 'AI Platform',
    location: 'Singapore, SG',
    workMode: 'On-site',
    type: 'Full-time',
    level: 'Senior',
    postedAt: '2026-09-28',
    hiringManager: 'Aditya Kurniawan',
    openSeats: 1,
    description:
      'Build the ranking and summarisation services behind candidate shortlists, with an emphasis on evaluation, bias monitoring, and explainability.',
    skills: ['Python', 'LLM evaluation', 'Ranking', 'MLOps', 'Fairness'],
  },
  {
    id: 'job-recruiter',
    title: 'Technical Recruiter',
    department: 'People',
    location: 'Jakarta, ID',
    workMode: 'Hybrid',
    type: 'Full-time',
    level: 'Mid',
    postedAt: '2026-10-19',
    hiringManager: 'Rani Prameswari',
    openSeats: 1,
    description:
      'Partner with engineering leaders to run structured, inclusive hiring loops and keep candidate experience above benchmark.',
    skills: ['Structured interviews', 'Sourcing', 'Employer branding'],
  },
  {
    id: 'job-data',
    title: 'Data Analyst',
    department: 'Data',
    location: 'Remote (GMT+7 ±2)',
    workMode: 'Remote',
    type: 'Contract',
    level: 'Mid',
    postedAt: '2026-10-24',
    hiringManager: 'Mei Lin Tan',
    openSeats: 1,
    description:
      'Turn funnel and assessment data into decisions: dashboards, cohort analysis, and honest reporting on where the process leaks.',
    skills: ['SQL', 'dbt', 'Experimentation', 'Data storytelling'],
  },
]

/** Raw candidate records. `accessibility` is self-declared and never scored. */
const RAW_CANDIDATES = [
  // ── Senior Frontend Engineer ───────────────────────────────────────────────
  {
    name: 'Nadia Kusuma',
    email: 'nadia.kusuma@example.com',
    jobId: 'job-frontend',
    stage: 'screening',
    score: 92,
    years: 7,
    location: 'Bandung, ID',
    source: 'Referral',
    appliedAt: '2026-10-28',
    strengths: ['Ships accessible, well-tested UI', 'Deep React and TypeScript fluency', 'Measured Core Web Vitals improvements'],
    weaknesses: ['Limited experience with native mobile'],
    accessibility: { needs: true, type: 'Low vision', accommodation: 'Screen-reader friendly take-home + extra time' },
    decision: 'pending',
    tags: ['Design systems', 'A11y'],
  },
  {
    name: 'Arif Wibowo',
    email: 'arif.wibowo@example.com',
    jobId: 'job-frontend',
    stage: 'screening',
    score: 78,
    years: 5,
    location: 'Surabaya, ID',
    source: 'LinkedIn',
    appliedAt: '2026-10-27',
    strengths: ['Strong component architecture', 'Comfortable owning CI pipelines'],
    weaknesses: ['Portfolio shows little accessibility testing', 'No design-system ownership yet'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Tooling'],
  },
  {
    name: 'Grace Lim',
    email: 'grace.lim@example.com',
    jobId: 'job-frontend',
    stage: 'screening',
    score: 66,
    years: 3,
    location: 'Kuala Lumpur, MY',
    source: 'Job board',
    appliedAt: '2026-10-26',
    strengths: ['Fast learner with clean code habits'],
    weaknesses: ['Below the senior bar on system design', 'No performance-budget experience'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Early career'],
  },
  {
    name: 'Dimas Prasetyo',
    email: 'dimas.prasetyo@example.com',
    jobId: 'job-frontend',
    stage: 'hr-interview',
    score: 88,
    years: 6,
    location: 'Jakarta, ID',
    source: 'Referral',
    appliedAt: '2026-10-22',
    strengths: ['Clear communicator in structured interviews', 'Strong motivation for the product mission'],
    weaknesses: ['Notice period is 3 months'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Product-minded'],
  },
  {
    name: 'Siti Rahmawati',
    email: 'siti.rahmawati@example.com',
    jobId: 'job-frontend',
    stage: 'hr-interview',
    score: 81,
    years: 5,
    location: 'Yogyakarta, ID',
    source: 'Inbound',
    appliedAt: '2026-10-21',
    strengths: ['Thoughtful answers on collaboration', 'Realistic salary expectations'],
    weaknesses: ['Prefers fully remote; role is hybrid'],
    accessibility: { needs: true, type: 'Chronic illness', accommodation: 'Flexible on-site days + remote-first onboarding' },
    decision: 'pending',
    tags: ['Remote-friendly'],
  },
  {
    name: 'Kevin Tanaka',
    email: 'kevin.tanaka@example.com',
    jobId: 'job-frontend',
    stage: 'technical-test',
    score: 94,
    years: 8,
    location: 'Singapore, SG',
    source: 'Sourced',
    appliedAt: '2026-10-18',
    strengths: ['Excellent take-home: accessible combobox from scratch', 'Strong performance reasoning', 'Writes tests without being asked'],
    weaknesses: ['Verbose written explanations'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Top signal', 'A11y'],
  },
  {
    name: 'Putri Anggraini',
    email: 'putri.anggraini@example.com',
    jobId: 'job-frontend',
    stage: 'technical-test',
    score: 73,
    years: 4,
    location: 'Denpasar, ID',
    source: 'Job board',
    appliedAt: '2026-10-17',
    strengths: ['Solid state-management choices', 'Good edge-case coverage'],
    weaknesses: ['Missed the accessibility requirement in the brief', 'Slow on the live refactor'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Needs mentoring'],
  },
  {
    name: 'Marcus Chen',
    email: 'marcus.chen@example.com',
    jobId: 'job-frontend',
    stage: 'ceo-interview',
    score: 90,
    years: 9,
    location: 'Jakarta, ID',
    source: 'Referral',
    appliedAt: '2026-10-12',
    strengths: ['Strong ownership stories', 'Aligned on craft-over-speed trade-offs'],
    weaknesses: ['Wants a staff-track title within 12 months'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Leadership'],
  },
  {
    name: 'Elena Petrova',
    email: 'elena.petrova@example.com',
    jobId: 'job-frontend',
    stage: 'offer',
    score: 95,
    years: 8,
    location: 'Jakarta, ID',
    source: 'Sourced',
    appliedAt: '2026-10-02',
    strengths: ['Best-in-cohort technical signal', 'Excellent design partnership', 'Immediate availability'],
    weaknesses: ['Competing offer deadline in 6 days'],
    accessibility: { needs: false },
    decision: 'advanced',
    tags: ['Offer out'],
  },

  // ── Product Designer ──────────────────────────────────────────────────────
  {
    name: 'Ayu Lestari',
    email: 'ayu.lestari@example.com',
    jobId: 'job-designer',
    stage: 'screening',
    score: 89,
    years: 6,
    location: 'Jakarta, ID',
    source: 'Inbound',
    appliedAt: '2026-10-29',
    strengths: ['Portfolio shows measurable funnel wins', 'Strong systems thinking'],
    weaknesses: ['Limited B2B SaaS exposure'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Systems'],
  },
  {
    name: 'Rizky Hidayat',
    email: 'rizky.hidayat@example.com',
    jobId: 'job-designer',
    stage: 'screening',
    score: 71,
    years: 4,
    location: 'Bandung, ID',
    source: 'Job board',
    appliedAt: '2026-10-28',
    strengths: ['Beautiful visual craft'],
    weaknesses: ['Thin research evidence', 'Case studies stop at the mockup'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Visual'],
  },
  {
    name: 'Hannah Weber',
    email: 'hannah.weber@example.com',
    jobId: 'job-designer',
    stage: 'hr-interview',
    score: 84,
    years: 7,
    location: 'Berlin, DE',
    source: 'Sourced',
    appliedAt: '2026-10-23',
    strengths: ['Excellent async communication', 'Comfortable with ambiguity'],
    weaknesses: ['Timezone overlap is 4 hours'],
    accessibility: { needs: true, type: 'ADHD', accommodation: 'Written briefs ahead of meetings, recorded calls' },
    decision: 'pending',
    tags: ['Async-first'],
  },
  {
    name: 'Bagus Santoso',
    email: 'bagus.santoso@example.com',
    jobId: 'job-designer',
    stage: 'technical-test',
    score: 87,
    years: 5,
    location: 'Jakarta, ID',
    source: 'Referral',
    appliedAt: '2026-10-20',
    strengths: ['Redesigned the dense applicant table with clear hierarchy', 'Documented every trade-off'],
    weaknesses: ['Prototype interactions were under-specified'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Data-dense UI'],
  },
  {
    name: 'Chloe Nguyen',
    email: 'chloe.nguyen@example.com',
    jobId: 'job-designer',
    stage: 'ceo-interview',
    score: 91,
    years: 8,
    location: 'Ho Chi Minh City, VN',
    source: 'Sourced',
    appliedAt: '2026-10-14',
    strengths: ['Sharp product judgement', 'Has scaled a design system across 4 squads'],
    weaknesses: ['Prefers a 4-day week'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Leadership'],
  },

  // ── Machine Learning Engineer ─────────────────────────────────────────────
  {
    name: 'Fajar Nugroho',
    email: 'fajar.nugroho@example.com',
    jobId: 'job-ml',
    stage: 'screening',
    score: 93,
    years: 6,
    location: 'Jakarta, ID',
    source: 'Referral',
    appliedAt: '2026-10-30',
    strengths: ['Published work on ranking evaluation', 'Hands-on with LLM eval harnesses'],
    weaknesses: ['Limited production MLOps depth'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Research', 'Ranking'],
  },
  {
    name: 'Priya Raman',
    email: 'priya.raman@example.com',
    jobId: 'job-ml',
    stage: 'screening',
    score: 80,
    years: 4,
    location: 'Bengaluru, IN',
    source: 'Job board',
    appliedAt: '2026-10-29',
    strengths: ['Strong Python and data engineering', 'Clear bias-audit experience'],
    weaknesses: ['No LLM fine-tuning experience'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Fairness'],
  },
  {
    name: 'Yusuf Maulana',
    email: 'yusuf.maulana@example.com',
    jobId: 'job-ml',
    stage: 'hr-interview',
    score: 76,
    years: 5,
    location: 'Singapore, SG',
    source: 'Inbound',
    appliedAt: '2026-10-24',
    strengths: ['Pragmatic about model scope', 'Good cross-team communication'],
    weaknesses: ['Relocation timeline unclear'],
    accessibility: { needs: true, type: 'Mobility impairment', accommodation: 'Step-free access + remote interview option' },
    decision: 'pending',
    tags: ['Relocation'],
  },
  {
    name: 'Lena Fischer',
    email: 'lena.fischer@example.com',
    jobId: 'job-ml',
    stage: 'technical-test',
    score: 96,
    years: 7,
    location: 'Singapore, SG',
    source: 'Sourced',
    appliedAt: '2026-10-19',
    strengths: ['Best take-home: calibrated ranking with documented failure modes', 'Excellent evaluation design', 'Reproducible notebooks'],
    weaknesses: ['Slightly over-engineered the serving layer'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Top signal'],
  },
  {
    name: 'Rangga Saputra',
    email: 'rangga.saputra@example.com',
    jobId: 'job-ml',
    stage: 'offer',
    score: 90,
    years: 6,
    location: 'Jakarta, ID',
    source: 'Referral',
    appliedAt: '2026-10-01',
    strengths: ['Strong systems + modelling balance', 'Great culture references'],
    weaknesses: ['Counter-offer risk from current employer'],
    accessibility: { needs: false },
    decision: 'advanced',
    tags: ['Offer out'],
  },

  // ── Technical Recruiter ───────────────────────────────────────────────────
  {
    name: 'Maya Sari',
    email: 'maya.sari@example.com',
    jobId: 'job-recruiter',
    stage: 'screening',
    score: 86,
    years: 5,
    location: 'Jakarta, ID',
    source: 'Inbound',
    appliedAt: '2026-10-27',
    strengths: ['Track record hiring engineers at scale', 'Structured interview advocate'],
    weaknesses: ['No in-house SaaS experience'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Structured hiring'],
  },
  {
    name: 'Daniel Okafor',
    email: 'daniel.okafor@example.com',
    jobId: 'job-recruiter',
    stage: 'screening',
    score: 69,
    years: 3,
    location: 'Jakarta, ID',
    source: 'Job board',
    appliedAt: '2026-10-26',
    strengths: ['High sourcing volume', 'Warm candidate feedback'],
    weaknesses: ['Limited technical screening depth', 'Weak on funnel metrics'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Agency background'],
  },
  {
    name: 'Intan Permata',
    email: 'intan.permata@example.com',
    jobId: 'job-recruiter',
    stage: 'hr-interview',
    score: 82,
    years: 4,
    location: 'Jakarta, ID',
    source: 'Referral',
    appliedAt: '2026-10-22',
    strengths: ['Excellent candidate-experience instincts', 'Strong stakeholder examples'],
    weaknesses: ['Wants a people-manager track sooner than we can offer'],
    accessibility: { needs: true, type: 'Deaf / hard of hearing', accommodation: 'Sign-language interpreter for interviews' },
    decision: 'pending',
    tags: ['Candidate experience'],
  },
  {
    name: 'Omar Haddad',
    email: 'omar.haddad@example.com',
    jobId: 'job-recruiter',
    stage: 'ceo-interview',
    score: 88,
    years: 6,
    location: 'Jakarta, ID',
    source: 'Sourced',
    appliedAt: '2026-10-15',
    strengths: ['Sharp on inclusive hiring practices', 'Comfortable pushing back on weak scorecards'],
    weaknesses: ['Salary expectation is at the top of band'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Inclusive hiring'],
  },

  // ── Data Analyst ──────────────────────────────────────────────────────────
  {
    name: 'Tara Wijaya',
    email: 'tara.wijaya@example.com',
    jobId: 'job-data',
    stage: 'screening',
    score: 85,
    years: 4,
    location: 'Jakarta, ID',
    source: 'Inbound',
    appliedAt: '2026-10-30',
    strengths: ['Strong SQL and dbt portfolio', 'Clear data storytelling'],
    weaknesses: ['Limited experimentation experience'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Analytics engineering'],
  },
  {
    name: 'Bima Kurnia',
    email: 'bima.kurnia@example.com',
    jobId: 'job-data',
    stage: 'screening',
    score: 64,
    years: 2,
    location: 'Semarang, ID',
    source: 'Job board',
    appliedAt: '2026-10-28',
    strengths: ['Eager, well-organised learner'],
    weaknesses: ['Below the experience bar for a contract role', 'No stakeholder-facing work yet'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Early career'],
  },
  {
    name: 'Mei Lin Tan',
    email: 'meilin.tan@example.com',
    jobId: 'job-data',
    stage: 'hr-interview',
    score: 79,
    years: 5,
    location: 'Kuala Lumpur, MY',
    source: 'Sourced',
    appliedAt: '2026-10-25',
    strengths: ['Strong contract-role motivation', 'Available within two weeks'],
    weaknesses: ['Prefers a permanent conversion path'],
    accessibility: { needs: false },
    decision: 'pending',
    tags: ['Contract-ready'],
  },
  {
    name: 'Joshua Tanoto',
    email: 'joshua.tanoto@example.com',
    jobId: 'job-data',
    stage: 'technical-test',
    score: 83,
    years: 4,
    location: 'Surabaya, ID',
    source: 'Referral',
    appliedAt: '2026-10-21',
    strengths: ['Clean funnel analysis with honest caveats', 'Good query performance instincts'],
    weaknesses: ['Dashboard design is functional but plain'],
    accessibility: { needs: true, type: 'Dyslexia', accommodation: 'Extra time on timed exercises, text-to-speech tools' },
    decision: 'pending',
    tags: ['Funnel analysis'],
  },
]

const STAGE_ORDER = STAGES.map((stage) => stage.id)

function buildBreakdown(score) {
  const offsets = [4, -3, 1, -6]
  const keys = ['technical', 'communication', 'problemSolving', 'cultureAdd']
  return keys.reduce((acc, key, index) => {
    acc[key] = Math.max(40, Math.min(99, score + offsets[index]))
    return acc
  }, {})
}

function buildEvidence(candidate, stageLabel) {
  const confidence = candidate.score >= 85 ? 'High' : candidate.score >= 72 ? 'Medium' : 'Low'
  return [
    { label: 'Stage', value: stageLabel },
    { label: 'Signal confidence', value: confidence },
    { label: 'Experience', value: `${candidate.years} years` },
    { label: 'Source', value: candidate.source },
  ]
}

function buildSummary(candidate, job, stageLabel, rank) {
  const [first, second] = candidate.strengths
  const weakness = candidate.weaknesses[0]
  return `${candidate.name} ranks #${rank} for ${job.title} with a ${candidate.score}/100 fit score. The model's strongest signals are ${first.toLowerCase()}${
    second ? ` and ${second.toLowerCase()}` : ''
  }. Main watch-out: ${weakness.toLowerCase()}. Currently in ${stageLabel}.`
}

function buildDetail(candidate, job, stageLabel) {
  const [first, second] = candidate.strengths
  const weakness = candidate.weaknesses[0]
  return [
    `Across the ${stageLabel.toLowerCase()} signals for ${job.title}, the model found consistent evidence that ${candidate.name} ${first.toLowerCase()}${
      second ? `, and ${second.toLowerCase()}` : ''
    }. With ${candidate.years} years of relevant experience and a ${candidate.source.toLowerCase()} application, the profile matches the role scorecard on most must-haves.`,
    `The main risk is that ${weakness.toLowerCase()}. This is a single negative signal, not a disqualifier — it is the area a human interviewer should probe next. The model has no visibility into motivation, team fit, or offer constraints, so treat this as a starting point for the conversation rather than a verdict.`,
  ]
}

function buildCandidates() {
  const withMeta = RAW_CANDIDATES.map((candidate, index) => {
    const job = JOBS.find((item) => item.id === candidate.jobId)
    const stage = STAGES.find((item) => item.id === candidate.stage)
    return {
      ...candidate,
      id: `cand-${String(index + 1).padStart(3, '0')}`,
      role: job.title,
      stageLabel: stage.label,
      breakdown: buildBreakdown(candidate.score),
      evidence: buildEvidence(candidate, stage.label),
      accessibility: {
        needs: false,
        ...candidate.accessibility,
      },
    }
  })

  // Rank within each job + stage bucket, highest score first.
  const buckets = new Map()
  withMeta.forEach((candidate) => {
    const key = `${candidate.jobId}:${candidate.stage}`
    if (!buckets.has(key)) buckets.set(key, [])
    buckets.get(key).push(candidate)
  })

  buckets.forEach((list) => {
    list
      .sort((a, b) => b.score - a.score)
      .forEach((candidate, index) => {
        candidate.rank = index + 1
        const job = JOBS.find((item) => item.id === candidate.jobId)
        candidate.aiSummary = buildSummary(candidate, job, candidate.stageLabel, index + 1)
        candidate.aiDetail = buildDetail(candidate, job, candidate.stageLabel)
      })
  })

  return withMeta
}

export const CANDIDATES = buildCandidates()

export function getJobById(jobId) {
  return JOBS.find((job) => job.id === jobId) ?? null
}

export function getCandidatesForJob(jobId) {
  return CANDIDATES.filter((candidate) => candidate.jobId === jobId)
}

export function getStageCounts(jobId) {
  const counts = STAGE_ORDER.reduce((acc, stageId) => {
    acc[stageId] = 0
    return acc
  }, {})
  getCandidatesForJob(jobId).forEach((candidate) => {
    counts[candidate.stage] = (counts[candidate.stage] ?? 0) + 1
  })
  return counts
}

export function getJobStats(jobId) {
  const candidates = getCandidatesForJob(jobId)
  const total = candidates.length
  const avgScore = total
    ? Math.round(candidates.reduce((sum, candidate) => sum + candidate.score, 0) / total)
    : 0
  const inOffer = candidates.filter((candidate) => candidate.stage === 'offer').length
  const needsReview = candidates.filter((candidate) => candidate.decision === 'pending').length
  return { total, avgScore, inOffer, needsReview }
}

export function getCompanyStats() {
  const totalApplicants = CANDIDATES.length
  const avgScore = Math.round(
    CANDIDATES.reduce((sum, candidate) => sum + candidate.score, 0) / totalApplicants,
  )
  const offers = CANDIDATES.filter((candidate) => candidate.stage === 'offer').length
  const pending = CANDIDATES.filter((candidate) => candidate.decision === 'pending').length
  return { openRoles: JOBS.length, totalApplicants, avgScore, offers, pending }
}
