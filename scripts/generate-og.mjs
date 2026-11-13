import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(import.meta.dirname, '..')
const outDir = resolve(root, 'public')
await mkdir(outDir, { recursive: true })

const gradientDef = (id) => `
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0891b2" />
      <stop offset="52%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>`

const mark = (x, y, size, id) => `
    <g transform="translate(${x},${y})">
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.28)}" fill="#ffffff" />
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.28)}" fill="none" stroke="url(#${id})" stroke-opacity="0.9" stroke-width="${Math.max(1.5, size * 0.02)}" />
      <path d="M${size / 2} ${size * 0.24} L${size * 0.24} ${size * 0.5} L${size / 2} ${size * 0.76} L${size * 0.76} ${size * 0.5} Z" fill="url(#${id})" />
      <path d="M${size * 0.24} ${size * 0.62} L${size / 2} ${size * 0.88} L${size * 0.76} ${size * 0.62}" fill="none" stroke="url(#${id})" stroke-width="${size * 0.055}" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />
      <path d="M${size * 0.24} ${size * 0.74} L${size / 2} ${size} L${size * 0.76} ${size * 0.74}" fill="none" stroke="url(#${id})" stroke-width="${size * 0.055}" stroke-linecap="round" stroke-linejoin="round" opacity="0.4" />
    </g>`

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    ${gradientDef('svOgGrad')}
    <radialGradient id="svGlowTop" cx="0.5" cy="0" r="0.9">
      <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#4f46e5" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="svGlowCyan" cx="0.15" cy="0.85" r="0.8">
      <stop offset="0%" stop-color="#0891b2" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#0891b2" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="svGlowViolet" cx="0.9" cy="0.7" r="0.8">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0" />
    </radialGradient>
    <pattern id="svGrid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M72 0H0V72" fill="none" stroke="#0b0f17" stroke-opacity="0.05" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#ffffff" />
  <rect width="1200" height="630" fill="url(#svGlowTop)" />
  <rect width="1200" height="630" fill="url(#svGlowCyan)" />
  <rect width="1200" height="630" fill="url(#svGlowViolet)" />
  <rect width="1200" height="630" fill="url(#svGrid)" />
  ${mark(564, 96, 72, 'svOgGrad')}
  <text x="600" y="292" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="112" font-weight="800" fill="#0b0f17">Stack<tspan fill="url(#svOgGrad)">Vibe</tspan></text>
  <text x="600" y="356" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="400" fill="#475069">Apps - Desktop - Web - AI</text>
  <g font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600" fill="#0b0f17">
    <rect x="376" y="410" width="120" height="46" rx="23" fill="#ffffff" stroke="#0b0f17" stroke-opacity="0.14" />
    <text x="436" y="440" text-anchor="middle">Mobile</text>
    <rect x="508" y="410" width="150" height="46" rx="23" fill="#ffffff" stroke="#0b0f17" stroke-opacity="0.14" />
    <text x="583" y="440" text-anchor="middle">Desktop</text>
    <rect x="670" y="410" width="154" height="46" rx="23" fill="#ffffff" stroke="#0b0f17" stroke-opacity="0.14" />
    <text x="747" y="440" text-anchor="middle">Web + AI</text>
  </g>
  <text x="600" y="566" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" fill="#64748b">stackvibe.fyi</text>
</svg>`

const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>${gradientDef('svIconGrad')}</defs>
  ${mark(size * 0.07, size * 0.07, size * 0.86, 'svIconGrad')}
</svg>`

await sharp(Buffer.from(ogSvg)).png().toFile(resolve(outDir, 'og-image.png'))
await sharp(Buffer.from(iconSvg(180))).png().toFile(resolve(outDir, 'apple-touch-icon.png'))
await sharp(Buffer.from(iconSvg(192))).png().toFile(resolve(outDir, 'icon-192.png'))
await sharp(Buffer.from(iconSvg(512))).png().toFile(resolve(outDir, 'icon-512.png'))

console.log('Generated og-image.png + app icons in /public')