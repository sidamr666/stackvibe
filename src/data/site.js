// ============================================================================
// StackVibe - single source of truth.
// Every service, link, feature and string lives here.
// Swap the placeholders for your real details and the whole site updates.
// ============================================================================

export const site = {
  name: 'StackVibe',
  domain: 'stackvibe.fyi',
  url: 'https://stackvibe.fyi',
  email: 'hello@stackvibe.fyi',
  tagline: 'Independent software studio',
  description:
    'Independent software studio building apps, desktop software, websites and AI systems on any platform. Fixed quotes, weekly demos, you own the code.',
  location: 'Remote - worldwide',
  availability: { label: 'Available for new projects', tone: 'emerald' },
  copyrightYear: 2026,
  currency: 'USD',
}

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const hero = {
  eyebrow: 'Independent software studio',
  title: 'You bring the idea.',
  highlight: 'We ship the product.',
  subtitle:
    'Mobile, desktop, web and AI - any software system, on any platform. Designed, engineered and shipped end to end by a senior team that cares about the details.',
  primaryCta: { label: 'Start a project', href: '#contact' },
  secondaryCta: { label: 'See the work', href: '#work' },
  badges: ['Fixed-price quotes', 'Weekly demos', 'You own the code'],
  stats: [
    { value: '30+', label: 'Projects delivered' },
    { value: '12+', label: 'Happy clients' },
    { value: '<24h', label: 'Response time' },
    { value: '100%', label: 'On-time launches' },
  ],
}

export const techStack = [
  'Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'Flutter', 'React', 'TypeScript',
  'Node.js', 'Tauri', 'Electron', 'C#', '.NET', 'Python', 'PyTorch',
  'Firebase', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS', 'Figma',
]

export const accentMeta = {
  cyan: {
    tile: 'from-cyan-500/15 to-cyan-500/5 text-cyan-700',
    glow: 'hover:shadow-[0_30px_80px_-30px_rgba(8,145,178,0.35)] hover:border-cyan-500/30',
  },
  violet: {
    tile: 'from-violet-500/15 to-violet-500/5 text-violet-700',
    glow: 'hover:shadow-[0_30px_80px_-30px_rgba(124,58,237,0.35)] hover:border-violet-500/30',
  },
  indigo: {
    tile: 'from-indigo-500/15 to-indigo-500/5 text-indigo-700',
    glow: 'hover:shadow-[0_30px_80px_-30px_rgba(79,70,229,0.35)] hover:border-indigo-500/30',
  },
  emerald: {
    tile: 'from-emerald-500/15 to-emerald-500/5 text-emerald-700',
    glow: 'hover:shadow-[0_30px_80px_-30px_rgba(5,150,105,0.35)] hover:border-emerald-500/30',
  },
  amber: {
    tile: 'from-amber-500/15 to-amber-500/5 text-amber-700',
    glow: 'hover:shadow-[0_30px_80px_-30px_rgba(217,119,6,0.35)] hover:border-amber-500/30',
  },
  rose: {
    tile: 'from-rose-500/15 to-rose-500/5 text-rose-700',
    glow: 'hover:shadow-[0_30px_80px_-30px_rgba(225,29,72,0.35)] hover:border-rose-500/30',
  },
}

export const services = [
  {
    id: 'mobile-apps',
    name: 'Mobile Apps',
    icon: 'phone',
    accent: 'cyan',
    tagline: 'Native apps for iOS and Android - Swift, Kotlin or Flutter - from first sketch to the stores.',
    features: [
      'iOS (Swift/SwiftUI) & Android (Kotlin/Compose)',
      'App Store + Play Store release',
      'Payments, push & offline mode',
      'Cross-platform with Flutter',
    ],
    cta: 'Request a mobile app',
    href: '#contact',
  },
  {
    id: 'desktop-apps',
    name: 'Desktop Apps',
    icon: 'box',
    accent: 'indigo',
    tagline: 'Native and cross-platform desktop software for macOS, Windows and Linux.',
    features: [
      'macOS (SwiftUI/AppKit)',
      'Windows & Linux (Tauri/Electron/.NET)',
      'Signing & auto-updates',
      'Offline-first & file handling',
    ],
    cta: 'Request a desktop app',
    href: '#contact',
  },
  {
    id: 'web-saas',
    name: 'Web & SaaS',
    icon: 'code',
    accent: 'violet',
    tagline: 'Fast marketing sites and full web apps with auth, billing and dashboards.',
    features: [
      'React / Next.js frontends',
      'Node.js APIs & databases',
      'Auth, billing & subscriptions',
      'SEO, analytics & speed budgets',
    ],
    cta: 'Request a website',
    href: '#contact',
  },
  {
    id: 'ai-features',
    name: 'AI Features',
    icon: 'sparkles',
    accent: 'amber',
    tagline: 'LLM apps, agents, RAG and custom models - grounded, evaluated and production-ready.',
    features: [
      'LLM apps & agents',
      'RAG & retrieval pipelines',
      'Fine-tuning & evaluations',
      'Vision & speech integration',
    ],
    cta: 'Request an AI build',
    href: '#contact',
  },
  {
    id: 'document-automation',
    name: 'Documents & Calculations',
    icon: 'doc',
    accent: 'emerald',
    tagline: 'Turn documents into data and automate calculations - extract, classify, compute and route.',
    features: [
      'OCR & data extraction',
      'Calculations & reports',
      'Contracts, invoices & PDFs',
      'End-to-end automation',
    ],
    cta: 'Automate my documents',
    href: '#contact',
  },
  {
    id: 'custom-software',
    name: 'Custom Software',
    icon: 'layers',
    accent: 'rose',
    tagline: 'APIs, integrations, calculators, automation - any software system your workflow needs.',
    features: [
      'APIs & integrations',
      'Calculators & data tools',
      'Automation & scripts',
      'Tech audits & maintenance',
    ],
    cta: 'Request custom work',
    href: '#contact',
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Brief & scope',
    text: 'You explain the idea. We ask the right questions and turn it into a clear, written scope.',
  },
  {
    step: '02',
    title: 'Proposal & quote',
    text: 'A fixed-price quote, timeline and milestone plan - no surprises, no hourly clock.',
  },
  {
    step: '03',
    title: 'Build in sprints',
    text: 'Weekly demos and a shared repo. You see working progress every step of the way.',
  },
  {
    step: '04',
    title: 'Launch & support',
    text: 'Deployment, handover docs and a support window after launch. We stick around.',
  },
]

export const principles = [
  {
    icon: 'sparkles',
    title: 'Clarity over cleverness',
    text: 'Code that a new engineer can read in one sitting beats an elegant puzzle every time.',
  },
  {
    icon: 'bolt',
    title: 'Performance is a feature',
    text: 'Budgets, profiling and honest measurements. If it lags, it ships late.',
  },
  {
    icon: 'shield',
    title: 'Your product, your code',
    text: 'You own the repo, the accounts and the docs. No lock-in, ever.',
  },
]

export const stackGroups = [
  { label: 'Mobile', items: ['Swift', 'Kotlin', 'Flutter', 'Jetpack Compose'] },
  { label: 'Desktop', items: ['SwiftUI', 'Tauri', 'Electron', '.NET'] },
  { label: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  { label: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'Firebase'] },
  { label: 'AI & Data', items: ['Python', 'PyTorch', 'OpenAI', 'RAG'] },
]

export const socials = [
  { id: 'email', label: 'Email', icon: 'mail', href: 'mailto:hello@stackvibe.fyi' },
  { id: 'facebook', label: 'Facebook', icon: 'facebook', href: '#' },
  { id: 'instagram', label: 'Instagram', icon: 'instagram', href: '#' },
]

export const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'Mobile Apps', href: '#services' },
      { label: 'Desktop Apps', href: '#services' },
      { label: 'Web & SaaS', href: '#services' },
      { label: 'AI & Documents', href: '#services' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Work', href: '#work' },
      { label: 'Process', href: '#process' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Privacy Policy', href: '/privacy.html' },
    ],
  },
]

export const budgetOptions = [
  { value: 'under-1000', label: 'Under $1,000', min: 0, max: 1000 },
  { value: '1000-5000', label: '$1,000 - $5,000', min: 1000, max: 5000 },
  { value: '5000-15000', label: '$5,000 - $15,000', min: 5000, max: 15000 },
  { value: '15000-plus', label: '$15,000+', min: 15000, max: null },
  { value: 'not-sure', label: 'Not sure yet', min: null, max: null },
]

export const privacySections = [
  {
    title: 'Overview',
    body: 'StackVibe (stackvibe.fyi) is an independent software studio. This policy explains what data our website and projects may collect, and how it is used. In short: we collect as little as possible and never sell personal data.',
  },
  {
    title: 'What we collect',
    body: 'When you contact us, we collect the information you choose to send - typically your name, email address, budget range and project details. This is stored securely in Firebase Firestore so we can respond to your enquiry. Our marketing site itself is static and analytics-free by default.',
  },
  {
    title: 'How we use data',
    body: 'We use your data strictly to respond to your enquiry, provide the services you request, and meet legal obligations. We do not sell, rent or trade personal data to third parties.',
  },
  {
    title: 'Cookies & analytics',
    body: 'This website does not use third-party tracking cookies. If optional privacy-friendly analytics are enabled in the future, they will be disclosed here and used only in aggregate form.',
  },
  {
    title: 'Your rights',
    body: 'Depending on your region, you may have the right to access, correct or delete your personal data, and to object to or restrict certain processing. Contact hello@stackvibe.fyi to exercise any of these rights.',
  },
  {
    title: 'Contact',
    body: 'For any privacy-related question, reach out to hello@stackvibe.fyi. We aim to reply within two business days.',
  },
]

export const work = [
  {
    id: 'dental-booking',
    title: 'Clinic booking & reminders',
    type: 'Mobile',
    accent: 'cyan',
    featured: true,
    summary: 'A mobile app for a dental clinic: appointments, payments and smart reminders on iOS and Android.',
    tags: ['SwiftUI', 'Kotlin', 'Push'],
    results: [
      { value: '4.8', label: 'App Store rating', suffix: '' },
      { value: '2,400+', label: 'bookings / month', suffix: '' },
      { value: '-35%', label: 'no-shows', suffix: '' },
    ],
  },
  {
    id: 'notes-workspace',
    title: 'Local-first notes workspace',
    type: 'Desktop',
    accent: 'indigo',
    featured: true,
    summary: 'A distraction-free desktop notes app for macOS, Windows and Linux with offline sync.',
    tags: ['SwiftUI', 'Tauri', 'SQLite'],
    results: [
      { value: '12k', label: 'installs', suffix: '' },
      { value: '4.7', label: 'Mac App Store', suffix: '' },
      { value: '0ms', label: 'open latency', suffix: '' },
    ],
  },
  {
    id: 'field-dashboard',
    title: 'Field-operations dashboard',
    type: 'Web',
    accent: 'violet',
    featured: true,
    summary: 'A realtime web dashboard for a field-services company: jobs, crews, invoices and live maps.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    results: [
      { value: '60%', label: 'less admin time', suffix: '' },
      { value: '<1s', label: 'page loads', suffix: '' },
      { value: '300+', label: 'daily users', suffix: '' },
    ],
  },
  {
    id: 'intake-assistant',
    title: 'AI document intake',
    type: 'AI',
    accent: 'amber',
    featured: false,
    summary: 'An AI assistant that reads client documents, extracts key facts and drafts responses for review.',
    tags: ['RAG', 'LLM', 'Evaluation'],
    results: [
      { value: '90%', label: 'extraction accuracy', suffix: '' },
      { value: '5x', label: 'faster intake', suffix: '' },
      { value: '$0.08', label: 'per document', suffix: '' },
    ],
  },
  {
    id: 'invoice-ocr',
    title: 'Invoice OCR pipeline',
    type: 'Documents',
    accent: 'emerald',
    featured: false,
    summary: 'An OCR pipeline that ingests invoices and receipts, validates totals and syncs to accounting.',
    tags: ['OCR', 'Python', 'Workflow'],
    results: [
      { value: '50k', label: 'documents / month', suffix: '' },
      { value: '99.2%', label: 'field accuracy', suffix: '' },
      { value: '4h', label: 'saved daily', suffix: '' },
    ],
  },
  {
    id: 'vendor-api',
    title: 'Multi-vendor marketplace API',
    type: 'Custom',
    accent: 'rose',
    featured: false,
    summary: 'A headless marketplace backend: catalog, orders, payouts and webhooks for sellers.',
    tags: ['Node.js', 'API', 'Webhooks'],
    results: [
      { value: '200+', label: 'sellers', suffix: '' },
      { value: '99.9%', label: 'uptime', suffix: '' },
      { value: '3', label: 'integrations', suffix: '' },
    ],
  },
]

export const audiences = [
  {
    id: 'founders',
    icon: 'rocket',
    title: 'Founders & individuals',
    text: 'You have an idea and want a working product, not a slide deck. We build the MVP, handle the store launches, and hand you clean code you own.',
    points: ['MVP in 4-8 weeks', 'Fixed price, no hourly meter', 'You keep the repo & accounts'],
  },
  {
    id: 'companies',
    icon: 'building',
    title: 'Companies & teams',
    text: 'You need capacity, integration with your stack, and production-grade quality. We slot into your workflow with clear SLAs and docs.',
    points: ['NDA & procurement friendly', 'Code reviews & CI/CD', 'Support & maintenance retainer'],
  },
]

export const packages = [
  {
    id: 'launch',
    name: 'Launch',
    price: 900,
    cadence: 'from',
    description: 'A fast, polished website or landing page that gets you in business this week.',
    features: ['Up to 6 pages', 'Responsive + SEO', 'Contact & request form', 'Analytics setup', '2 revision rounds'],
    cta: 'Start with Launch',
    highlighted: false,
  },
  {
    id: 'product',
    name: 'Product',
    price: 4500,
    cadence: 'from',
    description: 'A real mobile, desktop or web product: accounts, payments, and a dashboard.',
    features: ['Mobile / desktop / web app', 'Auth & payments', 'Admin dashboard', 'Store or deploy', 'Weekly demos'],
    cta: 'Build a product',
    highlighted: true,
  },
  {
    id: 'ai',
    name: 'Product + AI',
    price: 8000,
    cadence: 'from',
    description: 'A full product with an AI layer: assistants, RAG, extraction or automation.',
    features: ['Everything in Product', 'LLM / RAG integration', 'Document automation', 'Evaluations & tuning', 'Priority support'],
    cta: 'Build with AI',
    highlighted: false,
  },
  {
    id: 'retainer',
    name: 'Retainer',
    price: 800,
    cadence: 'per month',
    description: 'Ongoing maintenance, fixes and small features so your product keeps shipping.',
    features: ['Bug fixes & updates', 'Monthly feature budget', 'Monitoring & backups', 'Same-week turnaround'],
    cta: 'Keep it running',
    highlighted: false,
  },
]

export const faqs = [
  {
    q: 'Which platforms do you support?',
    a: 'All of them. iOS, Android, macOS, Windows, Linux and the web - plus AI and document automation that run anywhere. If it is software, we can build it.',
  },
  {
    q: 'Who owns the code and accounts?',
    a: 'You do - always. The repository, App Store account, cloud account and documentation are all in your name from day one. No lock-in.',
  },
  {
    q: 'How does pricing work?',
    a: 'We agree a fixed price before we start, based on scope and your budget. The request form asks for your budget range so we can propose something that fits or phase the work.',
  },
  {
    q: 'How long does a project take?',
    a: 'A landing site ships in about a week. An MVP takes 4-8 weeks. We demo weekly so you always see real progress.',
  },
  {
    q: 'What about the App Store review?',
    a: 'We prepare the submission, screenshots, privacy details and handle rejections until you are live. It is included in iOS and macOS projects.',
  },
  {
    q: 'Do you sign an NDA?',
    a: 'Yes. Send your NDA before we discuss details and we will sign and return it, usually the same day.',
  },
  {
    q: 'What happens after launch?',
    a: 'You get a support window for free. After that, a monthly retainer covers fixes, updates and new features as you grow.',
  },
  {
    q: 'Can you work with my existing team or codebase?',
    a: 'Yes. We audit what exists, fit into your CI/CD and code-review flow, and document everything we touch.',
  },
]

export const platformOptions = [
  'iPhone', 'iPad', 'Android', 'Mac', 'Windows', 'Linux', 'Web',
]

export const featureOptions = [
  'Accounts & auth', 'Payments & subscriptions', 'Admin dashboard',
  'Push notifications', 'Offline sync', 'AI chat / assistant',
  'OCR & extraction', 'Calculations & reports', 'Multi-language',
  'App Store submission', 'Play Store submission',
]

export const timelineOptions = [
  { value: 'rush', label: 'Rush (under 4 weeks)' },
  { value: 'standard', label: 'Standard (4-8 weeks)' },
  { value: 'flexible', label: 'Flexible' },
]