# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page static portfolio website for Gabriel Fernandes' digital services business (pt-BR). No build tools or dependencies.

## File Structure & Editing

- **index.html** — Single-file portfolio/landing page. All HTML structure and content.
- **script.js** — Inline Tailwind config (tailwindcss package) + mobile menu toggle + WhatsApp quote form handler.
- **styles.css** — Custom CSS for glassmorphism effects and hover animations. Tailwind utilities handle responsive layout.
- **assets/** — Hero images (PNG and WebP formats for performance).

When editing, keep all three files in sync: HTML structure, Tailwind classes in markup, and custom CSS for special effects.

## Design System

- **Colors:** Custom palette in styles.css (Creme #F3EAD9, Oliva #6B8550, etc.). Tailwind config extends these in script.js.
- **Fonts:** Google Fonts (DM Sans body, Plus Jakarta Sans headings). Loaded via CDN in HTML `<head>`.
- **Responsive:** Mobile-first. Tailwind breakpoints: `sm:`, `md:`, `lg:`.
- **Icons:** FontAwesome 6.4.0 via CDN.

## Content & Features

- **Language:** Portuguese (pt-BR). Maintain this throughout unless explicitly asked to support multiple languages.
- **WhatsApp Integration:** Hardcoded phone (5585985313082) in links (`https://wa.me/...`). Update carefully.
- **Mobile Menu:** Toggled by JavaScript. Toggle button is in nav; menu slides in/out smoothly.
- **Quote Form:** Site type selector feeds into WhatsApp message URL. Preserves user selection in form context.

## Common Tasks

- **Update copy or images:** Edit index.html and replace/optimize assets/. No build step.
- **Add a new section:** Structure in HTML, use Tailwind classes for layout, add custom CSS if needed for visual polish.
- **Change colors:** Update CSS variables in styles.css AND the Tailwind config in script.js (they're used in different places).
- **Test responsive design:** Use browser DevTools. No dev server; just open index.html locally.

## Gotchas

- Tailwind config is inline in script.js (non-standard but keeps the site dependency-free).
- No linting or formatting tools configured; edits are manual. Keep consistent spacing and class ordering.
- All content lives in one HTML file. As it grows, consider splitting into a template system later.
