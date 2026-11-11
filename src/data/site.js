// ============================================================================
// StackVibe — single source of truth.
// Swap any name, link, status, feature or social handle here and the whole
// site updates automatically. No component edits required.
// ============================================================================

export const site = {
  name: 'StackVibe',
  domain: 'stackvibe.fyi',
  url: 'https://stackvibe.fyi',
  email: 'hello@stackvibe.fyi',
  tagline: 'Independent software studio',
  description:
    'StackVibe designs and engineers Android apps, desktop SaaS and web tools — obsessing over performance, clean architecture, and interfaces that feel effortless.',
  location: 'Remote — worldwide',
  availability: { label: 'Available for select projects', tone: 'emerald' },
  copyrightYear: 2026,
}

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'android', label: 'Android Apps', href: '#android' },
  { id: 'desktop', label: 'Desktop SaaS', href: '#desktop' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const hero = {
  eyebrow: 'Independent software studio',
  title: 'Software that ships.',
  highlight: 'Products that feel alive.',
  subtitle:
    'StackVibe engineers Android apps, desktop SaaS and fast web tools — pairing clean, maintainable code with interfaces people love to use.',
  primaryCta: { label: 'View Android Apps', href: '#android' },
  secondaryCta: { label: 'Get Desktop SaaS', href: '#desktop' },
  badges: ['Design-led engineering', 'Performance budgets', 'Weekly releases'],
  stats: [
    { value: '12+', label: 'Products shipped' },
    { value: '4', label: 'Platforms' },
    { value: '99.9%', label: 'Uptime target' },
    { value: '<1.2s', label: 'Median load' },
  ],
}

export const techStack = [
  'Flutter', 'Dart', 'Kotlin', 'React', 'TypeScript', 'Node.js', 'NestJS',
  'PostgreSQL', 'Redis', 'Firebase', 'Unity', 'C#', 'Docker', 'AWS',
  'Tailwind CSS', 'Figma',
]

export const statusMeta = {
  live: {
    label: 'Live',
    pill: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
    dot: 'bg-emerald-400',
  },
  beta: {
    label: 'Beta',
    pill: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
    dot: 'bg-amber-400',
  },
  soon: {
    label: 'In development',
    pill: 'border-violet-400/25 bg-violet-400/10 text-violet-300',
    dot: 'bg-violet-400',
  },
}

export const accentMeta = {
  cyan: {
    tile: 'from-cyan-400/25 to-cyan-400/5 text-cyan-300',
    glow: 'hover:shadow-[0_30px_80px_-30px_rgba(34,211,238,0.5)] hover:border-cyan-400/30',
  },
  violet: {
    tile: 'from-violet-400/25 to-violet-400/5 text-violet-300',
    glow: 'hover:shadow-[0_30px_80px_-30px_rgba(168,85,247,0.5)] hover:border-violet-400/30',
  },
  indigo: {
    tile: 'from-indigo-400/25 to-indigo-400/5 text-indigo-300',
    glow: 'hover:shadow-[0_30px_80px_-30px_rgba(99,102,241,0.5)] hover:border-indigo-400/30',
  },
  emerald: {
    tile: 'from-emerald-400/25 to-emerald-400/5 text-emerald-300',
    glow: 'hover:shadow-[0_30px_80px_-30px_rgba(16,185,129,0.5)] hover:border-emerald-400/30',
  },
}

export const androidApps = [
  {
    id: 'utility-tool-pro',
    name: 'Utility Tool Pro',
    category: 'Android · Utility suite',
    status: 'live',
    accent: 'cyan',
    icon: 'wrench',
    featured: true,
    tagline: 'A precision toolbox that lives in your pocket — instant, offline, and out of the way.',
    description:
      'File utilities, unit converters, QR scanner and quick actions built for speed. Everything runs offline-first with zero sign-up friction.',
    features: [
      'Offline-first architecture — no account required',
      'Material 3 adaptive theming and dynamic color',
      'Home-screen quick actions and widgets',
    ],
    tech: ['Kotlin', 'Jetpack Compose', 'Room'],
    metrics: [
      { label: 'Installs', value: '50k+' },
      { label: 'Rating', value: '4.8★' },
    ],
    cta: 'Get it on Google Play',
    href: '#',
    preview: 'phone',
  },
  {
    id: 'mobile-app-studio',
    name: 'Mobile App Studio',
    category: 'Android · Productivity',
    status: 'beta',
    accent: 'violet',
    icon: 'layers',
    featured: false,
    tagline: 'Sketch, preview and iterate on mobile UI concepts directly from your device.',
    features: ['Drag-and-drop component canvas', 'Realtime preview with live data', 'Export to Flutter & Compose'],
    tech: ['Flutter', 'Dart', 'Hive'],
    cta: 'Join the beta',
    href: '#',
    preview: 'none',
  },
  {
    id: 'everyday-utilities',
    name: 'Everyday Utilities',
    category: 'Android · Tools',
    status: 'live',
    accent: 'emerald',
    icon: 'grid',
    featured: false,
    tagline: 'A lightweight collection of the small tools you reach for every single day.',
    features: ['Barcode & QR scanning', 'Unit & currency converter', 'Privacy-friendly — data stays local'],
    tech: ['Kotlin', 'Compose Multiplatform', 'SQLite'],
    cta: 'View on Google Play',
    href: '#',
    preview: 'none',
  },
  {
    id: 'pocket-ledger',
    name: 'Pocket Ledger',
    category: 'Android · Finance',
    status: 'soon',
    accent: 'indigo',
    icon: 'chart',
    featured: false,
    tagline: 'Fast, private cash-flow tracking with zero cloud lock-in.',
    features: ['One-tap expense entry', 'Local encrypted storage', 'CSV & spreadsheet export'],
    tech: ['Flutter', 'SQLCipher', 'Riverpod'],
    cta: 'Notify me',
    href: '#',
    preview: 'none',
  },
]

export const desktopProducts = [
  {
    id: 'saas-productivity-suite',
    name: 'SaaS Productivity Suite',
    category: 'Desktop SaaS',
    status: 'live',
    accent: 'cyan',
    icon: 'box',
    featured: true,
    tagline: 'Workspaces, tasks and time tracking in one fast desktop client — with a web app that syncs.',
    description:
      'Built for small teams and solo founders who want focus without the bloat. Native desktop performance with realtime collaboration and offline mode.',
    features: [
      'Realtime sync with offline-first desktop client',
      'Keyboard-driven command palette',
      'End-to-end encrypted workspaces',
    ],
    tech: ['Electron', 'React', 'PostgreSQL', 'Redis'],
    metrics: [
      { label: 'Active teams', value: '1.2k' },
      { label: 'Uptime', value: '99.98%' },
    ],
    cta: 'Start free trial',
    href: '#',
    preview: 'window',
  },
  {
    id: 'insight-dashboard',
    name: 'Insight Dashboard',
    category: 'Web + Desktop · Analytics',
    status: 'beta',
    accent: 'violet',
    icon: 'chart',
    featured: false,
    tagline: 'Product metrics that answer questions, not just show numbers.',
    features: ['Funnel & retention out of the box', 'SQL playground for power users', 'Shareable live dashboards'],
    tech: ['Next.js', 'ClickHouse', 'TypeScript'],
    cta: 'Request access',
    href: '#',
    preview: 'none',
  },
  {
    id: 'deploy-pilot',
    name: 'Deploy Pilot',
    category: 'Desktop SaaS',
    status: 'soon',
    accent: 'indigo',
    icon: 'rocket',
    featured: false,
    tagline: 'Release orchestration for small teams — preview, approve, ship.',
    features: ['One-click preview environments', 'Approval gates & rollbacks', 'Audit log for every release'],
    tech: ['Tauri', 'Rust', 'Docker'],
    cta: 'Join waitlist',
    href: '#',
    preview: 'none',
  },
  {
    id: 'api-workbench',
    name: 'API Workbench',
    category: 'Web Tool',
    status: 'live',
    accent: 'emerald',
    icon: 'code',
    featured: false,
    tagline: 'A fast, keyboard-first REST client that lives in your browser.',
    features: ['Environment variables & secrets', 'Collection runner & tests', 'Generates client code snippets'],
    tech: ['React', 'Vite', 'Web Workers'],
    cta: 'Open the tool',
    href: '#',
    preview: 'none',
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
    title: 'Design and engineering as one',
    text: 'Figma to production without the gap — the interface is part of the architecture.',
  },
]

export const stackGroups = [
  { label: 'Mobile', items: ['Flutter', 'Dart', 'Kotlin', 'Jetpack Compose'] },
  { label: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  { label: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'Prisma'] },
  { label: 'Platform', items: ['Docker', 'AWS', 'Cloudflare', 'GitHub Actions'] },
  { label: 'Games & 3D', items: ['Unity', 'C#', 'Blender'] },
]

export const socials = [
  { id: 'github', label: 'GitHub', icon: 'github', href: 'https://github.com/stackvibe' },
  { id: 'x', label: 'X (Twitter)', icon: 'x', href: 'https://x.com/stackvibe' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/stackvibe' },
  { id: 'email', label: 'Email', icon: 'mail', href: 'mailto:hello@stackvibe.fyi' },
]

export const footerColumns = [
  {
    title: 'Products',
    links: [
      { label: 'Android Apps', href: '#android' },
      { label: 'Desktop SaaS', href: '#desktop' },
      { label: 'Web Tools', href: '#desktop' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '/privacy.html' },
    ],
  },
]

export const privacySections = [
  {
    title: 'Overview',
    body: 'StackVibe (stackvibe.fyi) is an independent software studio. This policy explains what data our Android apps, desktop SaaS and web tools may collect, and how it is used. In short: we collect as little as possible and never sell personal data.',
  },
  {
    title: 'What we collect',
    body: 'Our websites are static and analytics-free by default. Where a product requires an account (for sync or collaboration), we collect only the minimum needed to provide the service — typically an email address, display name, and the content you create. Some Android apps store all data locally on your device, in which case we never receive it.',
  },
  {
    title: 'How we use data',
    body: 'We use data strictly to operate, maintain and improve the product you are using, to respond to support requests, and to meet legal obligations. We do not sell, rent or trade personal data to third parties.',
  },
  {
    title: 'Cookies & analytics',
    body: 'This marketing website does not use third-party tracking cookies. If optional privacy-friendly analytics are enabled in the future, they will be disclosed here and used only in aggregate form.',
  },
  {
    title: 'Your rights',
    body: 'Depending on your region, you may have the right to access, correct or delete your personal data, and to object to or restrict certain processing. Contact hello@stackvibe.fyi to exercise any of these rights, and we will respond within a reasonable timeframe.',
  },
  {
    title: 'Contact',
    body: 'For any privacy-related question, reach out to hello@stackvibe.fyi. We aim to reply within two business days.',
  },
]