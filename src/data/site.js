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
  tagline: 'Freelance software studio',
  description:
    'Freelance software studio building Android apps, desktop SaaS and websites for founders and teams. From idea to launch - clean code, fixed quotes, real deadlines.',
  location: 'Remote - worldwide',
  availability: { label: 'Available for new projects', tone: 'emerald' },
  copyrightYear: 2026,
  contact: {
    // Paste your Formspree form id to receive real messages (https://formspree.io > New form).
    // Example: 'https://formspree.io/f/abcdwxyz'. Leave empty to open the visitor's mail client instead.
    formEndpoint: '',
  },
}

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const hero = {
  eyebrow: 'Freelance software studio',
  title: 'You bring the idea.',
  highlight: 'I build the product.',
  subtitle:
    'Android apps, desktop SaaS and websites for founders and teams - designed, engineered and shipped by one senior full-stack developer who cares about the details.',
  primaryCta: { label: 'Start a project', href: '#contact' },
  secondaryCta: { label: 'See what I build', href: '#services' },
  badges: ['Fixed-price quotes', 'Weekly demos', 'Clean, maintainable code'],
  stats: [
    { value: '30+', label: 'Projects delivered' },
    { value: '12+', label: 'Happy clients' },
    { value: '<24h', label: 'Response time' },
    { value: '100%', label: 'On-time launches' },
  ],
}

export const techStack = [
  'Flutter', 'Dart', 'Kotlin', 'React', 'TypeScript', 'Node.js', 'NestJS',
  'PostgreSQL', 'Redis', 'Firebase', 'Unity', 'C#', 'Docker', 'AWS',
  'Tailwind CSS', 'Figma',
]

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

export const services = [
  {
    id: 'android-apps',
    name: 'Android Apps',
    icon: 'phone',
    accent: 'cyan',
    tagline: 'Native Android apps, polished and performant - from first sketch to Play Store launch.',
    features: [
      'Flutter & Kotlin (native)',
      'Play Store listing & release',
      'Offline-first & Material 3 design',
      'Push notifications & analytics',
    ],
    cta: 'Request an app',
    href: '#contact',
  },
  {
    id: 'desktop-saas',
    name: 'Desktop SaaS',
    icon: 'box',
    accent: 'indigo',
    tagline: 'Cross-platform desktop tools for Windows, macOS and Linux that feel native and fast.',
    features: [
      'Electron / Tauri clients',
      'Auth, billing & subscriptions',
      'Realtime sync & offline mode',
      'Auto-updates & crash reporting',
    ],
    cta: 'Request desktop SaaS',
    href: '#contact',
  },
  {
    id: 'websites-webapps',
    name: 'Websites & Web Apps',
    icon: 'code',
    accent: 'violet',
    tagline: 'Fast, SEO-ready marketing sites and full web apps that load in under a second.',
    features: [
      'React / Next.js frontends',
      'Node.js APIs & databases',
      'SEO, analytics & speed budgets',
      'Deployment & monitoring',
    ],
    cta: 'Request a website',
    href: '#contact',
  },
  {
    id: 'something-else',
    name: 'Something Else',
    icon: 'sparkles',
    accent: 'emerald',
    tagline: 'A game, a bot, a dashboard, an API, a prototype - tell me what you have in mind.',
    features: [
      'Games & 3D (Unity)',
      'APIs & integrations',
      'Automation & scripts',
      'Tech consulting & audits',
    ],
    cta: "Let's talk about it",
    href: '#contact',
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Brief & scope',
    text: 'You explain the idea. I ask the right questions and turn it into a clear, written scope.',
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
    text: 'Deployment, handover docs and a support window after launch. I stick around.',
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
  { label: 'Mobile', items: ['Flutter', 'Dart', 'Kotlin', 'Jetpack Compose'] },
  { label: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  { label: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'Prisma'] },
  { label: 'Platform', items: ['Docker', 'AWS', 'Cloudflare', 'GitHub Actions'] },
  { label: 'Games & 3D', items: ['Unity', 'C#', 'Blender'] },
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
      { label: 'Android Apps', href: '#services' },
      { label: 'Desktop SaaS', href: '#services' },
      { label: 'Websites & Web Apps', href: '#services' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Process', href: '#process' },
      { label: 'About', href: '#about' },
      { label: 'Privacy Policy', href: '/privacy.html' },
    ],
  },
]

export const budgetOptions = ['Under $1,000', '$1,000 - $5,000', '$5,000 - $15,000', '$15,000+', 'Not sure yet']

export const privacySections = [
  {
    title: 'Overview',
    body: 'StackVibe (stackvibe.fyi) is an independent freelance software studio. This policy explains what data our website and projects may collect, and how it is used. In short: we collect as little as possible and never sell personal data.',
  },
  {
    title: 'What we collect',
    body: 'When you contact us, we collect the information you choose to send - typically your name, email address and project details. Our website is static and analytics-free by default, so we do not track your browsing behaviour.',
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