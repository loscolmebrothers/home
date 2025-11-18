# @loscolmebrothers/home

Interactive landing page featuring floating images with delicious, professional animations.

## Overview

A modern React landing page with:
- **Floating images** that animate across the UI
- **Interactive elements**: Click images to open modals, navigate to links, or trigger visual effects
- **Professional animations** powered by GSAP (GreenSock)
- **Clean, accessible design** with Radix UI primitives

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Animation**: GSAP (GreenSock)
- **State Management**: Zustand
- **UI Components**: Radix UI
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm (install with `npm install -g pnpm`)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:5173` to view the app.

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm preview  # Preview production build
pnpm test     # Run tests
pnpm test:ui  # Run tests with UI
pnpm lint     # Run ESLint
```

## Project Structure

```
src/
├── components/
│   ├── Island/         # Hero component with animated island scene
│   │   ├── index.tsx              # Main Island component
│   │   ├── SparkleEffect.tsx      # Sparkle particle system
│   │   └── useIslandAnimations.ts # GSAP animation hook
│   ├── FloatingImage/  # Core floating image component
│   ├── Modal/          # Modal system for interactions
│   └── ui/             # Reusable UI primitives
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── styles/             # Global styles
├── assets/             # Images and static assets
└── test/               # Test configuration
```

## Features

- [x] Island hero component with GSAP entrance animations
- [x] Floating animation system (continuous motion)
- [x] Interactive hover effects with spring animations
- [x] Sparkle particle system (25 animated sparkles)
- [x] Modal integration with Radix UI Dialog
- [x] Responsive sizing with grouped constraints
- [ ] Additional floating images
- [ ] Link navigation
- [ ] UI effect triggers
- [ ] Full responsive design
- [ ] Accessible components (WCAG 2.1 AA)

## Development

This project follows strict quality standards:
- TypeScript strict mode
- Comprehensive testing
- Accessible components (WCAG 2.1 AA)
- Clean, self-documenting code
- Professional animation patterns

## Attribution

This project uses AI-assisted development with ethical attribution tracking.
See [AI-HUMAN-ATTRIBUTION.md](./AI-HUMAN-ATTRIBUTION.md) for detailed contribution breakdowns.

## License

See [LICENSE](./LICENSE)
