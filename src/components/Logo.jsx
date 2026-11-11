import { useId } from 'react'

export default function Logo({ className = 'size-9' }) {
  const id = useId()
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="StackVibe logo">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="52%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect x="1.25" y="1.25" width="37.5" height="37.5" rx="11" fill={`url(#${id})`} fillOpacity="0.14" />
      <rect x="1.25" y="1.25" width="37.5" height="37.5" rx="11" fill="none" stroke={`url(#${id})`} strokeOpacity="0.5" strokeWidth="1.4" />
      <path d="M20 9.4 9.6 15l10.4 5.6L30.4 15 20 9.4Z" fill={`url(#${id})`} />
      <path d="M9.6 19.6 20 25.2l10.4-5.6" fill="none" stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
      <path d="M9.6 24.2 20 29.8l10.4-5.6" fill="none" stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.42" />
    </svg>
  )
}