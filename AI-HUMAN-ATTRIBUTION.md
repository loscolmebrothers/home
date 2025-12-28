# AI/Human Attribution

This project follows ethical AI/Human collaboration guidelines based on the framework by Manuel Masías:  

📍 [Etiquetado Ético - mmasias](https://github.com/mmasias/mmasias/blob/main/ai/etiquetadoEtico.md)

## Contribution Framework

We track contributions across four dimensions:
- **Conceptualization**: Ideas, planning, objectives
- **Analysis**: Data processing, evaluation, interpretation
- **Implementation**: Technical execution, development
- **Validation**: Quality control, verification

### Contribution Levels
- **Principal**: Majority responsibility
- **Equal**: Balanced participation
- **Support**: Secondary involvement
- **None**: No participation

---

## Project Contributions

**Last Updated**: 2025-12-28

### Overall Project Attribution

```
┌─────────────────────────────────────────────────────────────┐
│                  CONTRIBUTION BREAKDOWN                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Human: ██████████████████████████████░░░░░░░░░░░░░░ 65%    │
│  AI:    ░░░░░░░░░░░░░░░░░░░░░░░░░░████████████████░░ 35%    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Phase              │  Human       │  AI                    │
├─────────────────────────────────────────────────────────────┤
│  Conceptualization  │  Principal   │  Support               │
│  Analysis           │  Equal       │  Equal                 │
│  Implementation     │  Equal       │  Equal                 │
│  Validation         │  Principal   │  Support               │
└─────────────────────────────────────────────────────────────┘
```

---

## Detailed Contribution Log

### 2025-11-15: Project Setup & Planning

**Phase**: Conceptualization + Analysis

| Role | Human Contribution | AI Contribution |
|------|-------------------|-----------------|
| Conceptualization | Principal - Project vision, floating images concept, interaction types, animation requirements | Support - Tech stack recommendations, GSAP research |
| Analysis | Equal - Animation library evaluation, requirements clarification | Equal - GSAP licensing research, tech stack analysis |
| Implementation | None | None |
| Validation | None | None |

**Tools Used**: Claude Code (Claude Sonnet 4.5)
**Human Time**: ~30 minutes (brainstorming, decision-making)
**AI Interactions**: Planning conversations, documentation updates

---

### 2025-11-17: Bootstrap React Project

**Phase**: Implementation + Validation

| Role | Human Contribution | AI Contribution |
|------|-------------------|-----------------|
| Conceptualization | Support - Provided requirements, package manager preferences | Principal - Project structure planning, dependency selection |
| Analysis | None | Principal - Evaluated latest versions, Tailwind v4 compatibility |
| Implementation | None | Principal - Full React + Vite + TypeScript setup, all configurations |
| Validation | Principal - Code review, acceptance criteria verification | Support - Self-testing (build, tests, dev server) |

**Deliverables**:
- ✅ React 18 + TypeScript + Vite project
- ✅ GSAP 3.13.0, Tailwind CSS 4.1.17, Zustand 5.0.8
- ✅ Radix UI components, Vitest testing setup
- ✅ Complete folder structure
- ✅ All boilerplate removed

**Tools Used**: Claude Code (Claude Sonnet 4.5) via frontend-dev agent
**Human Time**: ~10 minutes (review and approval)
**AI Time**: ~15 minutes (scaffolding, configuration, cleanup)
**Commit**: `007440f` on `feature/bootstrap-react-app`

**Notes**:
- Agent used npm instead of pnpm (user preference noted for future tasks)
- Package name "temp-project" instead of "@loscolmebrothers/home" (to be corrected)
- All functionality validated and approved by PM

---

### 2025-11-17: Project Configuration Cleanup

**Phase**: Implementation + Validation

| Role | Human Contribution | AI Contribution |
|------|-------------------|-----------------|
| Conceptualization | Principal - Identified issues needing correction | Support - Understood requirements from feedback |
| Analysis | None | Principal - Determined migration approach, pnpm setup |
| Implementation | None | Principal - npm→pnpm migration, package renaming, title updates |
| Validation | Principal - Code review, verification of changes | Support - Self-testing (build, tests, pnpm commands) |

**Deliverables**:
- ✅ Package manager migrated: npm → pnpm
- ✅ Package name corrected: "@loscolmebrothers/home"
- ✅ HTML title updated: "Los Colme Brothers"
- ✅ README updated with pnpm commands
- ✅ pnpm-lock.yaml created, package-lock.json removed

**Tools Used**: Claude Code (Claude Sonnet 4.5) via frontend-dev agent
**Human Time**: ~5 minutes (review and approval)
**AI Time**: ~5 minutes (configuration changes)
**Commit**: `8357868` on `fix/project-config`

**Notes**:
- Quick cleanup task addressing bootstrap feedback
- No code changes, pure configuration
- Project now follows @loscolmebrothers standards

---

### 2025-11-18: Island Hero Component with Animations & Sparkle Effects

**Phase**: Implementation + Validation

| Role | Human Contribution | AI Contribution |
|------|-------------------|-----------------|
| Conceptualization | Principal - Creative vision for island scene, sparkle positioning, sizing decisions, interaction patterns | Support - Implementation suggestions, UX considerations |
| Analysis | Equal - Iterative refinement of sparkle size/count/positioning, performance considerations | Equal - GSAP animation patterns, Radix UI Dialog research |
| Implementation | Support - Real-time feedback, design adjustments, refactoring direction | Principal - Full component implementation, GSAP animations, code refactoring |
| Validation | Principal - Visual validation, UX testing, approving iterations | Support - Code structure validation, animation timing |

**Deliverables**:
- ✅ Island hero component with GSAP entrance animations
- ✅ Floating animation system (island, balloon, logo)
- ✅ Hover spring effect (island + bros scale differently)
- ✅ 25 sparkle particles with radial positioning
- ✅ Sparkle pulse animations (staggered, randomized)
- ✅ Radix UI Dialog integration (click to open modal)
- ✅ Component refactoring: SparkleEffect component + useIslandAnimations hook
- ✅ Renamed sparkle assets (Sparkles_path1-7.svg → 1-7.svg)
- ✅ Responsive sizing with grouped min/max constraints

**Animation Details**:
- Entrance sequence: Bros → Balloon/Logo → Island (with elastic/back easing)
- Continuous floating: Island (15px, 3s), Balloon (25px + rotation, 2.5s)
- Hover: Island scales 1.05x, Bros scales 1.15x (elastic spring)
- Sparkles: 25 particles at 1.5x1.5 size, positioned 50-80% from center

**Tools Used**: Claude Code (Claude Sonnet 4.5)
**Human Time**: ~2 hours (iterative design refinement, visual feedback)
**AI Time**: ~45 minutes (implementation, refactoring, troubleshooting)

**Notes**:
- Multiple iterations on sparkle size/count for optimal visual balance
- Attempted glow effects (failed to render) before pivoting to sparkles
- Refactored from 280-line component to modular structure (SparkleEffect + hook)
- TypeScript `verbatimModuleSyntax` issue resolved with type-only imports
- Desktop: hover shows sparkles, click opens modal
- Touch: tap opens modal (no hover sparkles)

---

### 2025-11-19: Global Sparkle System

**Phase**: Implementation + Validation

| Role | Human Contribution | AI Contribution |
|------|-------------------|--------------------|
| Conceptualization | Principal - Background sparkle vision, particle count, positioning strategy | None |
| Analysis | Principal - Evaluated sparkle sizes, distribution patterns, performance | None |
| Implementation | Principal - Full SparkleSystem component (111 lines), GSAP animations, ref management | None |
| Validation | Principal - Visual testing, animation timing, opacity levels | None |

**Deliverables**:
- ✅ SparkleSystem component with 120 animated particles
- ✅ 7 different sparkle SVG variants with size tiers
- ✅ Radial positioning avoiding center island area
- ✅ Float animations (2-5s duration, ±8px vertical)
- ✅ Twinkle opacity animations (0.05-0.4 range)
- ✅ Exposed `intensify()` and `calm()` methods for interactions
- ✅ Fixed z-index layering (z-0 for background)

**Tools Used**: None (manual implementation)
**Human Time**: ~1 hour (design, implementation, refinement)
**AI Time**: 0 minutes
**Commit**: `f52448d`

**Notes**:
- Independently implemented from scratch
- Uses GSAP for smooth float and twinkle animations
- Sparkles positioned to avoid central 35-65% horizontal × 25-75% vertical area
- Three size tiers: big sparkles (18-24px) for indices 0,5,6; small (6-8px) for others

---

### 2025-11-19: Orbiting Illustrations System

**Phase**: Implementation + Validation

| Role | Human Contribution | AI Contribution |
|------|-------------------|--------------------|
| Conceptualization | Principal - Orbiting animation concept, 30 illustration selection, size grouping strategy | None |
| Analysis | Principal - Determined orbital mechanics, radius ranges, rotation angles | None |
| Implementation | Principal - Full FloatingIllustrations component (188 lines), GSAP orbital animation, ref system | None |
| Validation | Principal - Visual validation, animation speeds, illustration sizes | None |

**Deliverables**:
- ✅ FloatingIllustrations component with 30 SVG illustrations
- ✅ Circular orbital motion around viewport center (50vw, 50vh)
- ✅ Three size tiers: Extra big (180-260px), Big (120-200px), Standard (80-160px)
- ✅ Random orbital radius (40-60vw from center)
- ✅ Continuous GSAP animations (30-70s per orbit)
- ✅ `fadeOut()` and `fadeIn()` methods for hover interactions
- ✅ Fixed positioning with z-[5] layering

**Illustrations**:
- Extra big: Venus, Palm Tree
- Big: Plant, Unicycle
- Standard: Amplifier, Bottle, Cap, CD, Coffee, Cup, Dice, Drum, Flower, Glove, Guitar, Headset, Lamp, Master Sword, Mona Lisa, Monitor, Mouse, Nintendo Switch, Pawn, Pencil, PlayStation Controller, Pokeball, Starry Night, Tattoo Machine, Ticket, Trumpet, UNO Reverse Card

**Tools Used**: None (manual implementation)
**Human Time**: ~2 hours (SVG imports, orbit calculations, GSAP animation logic)
**AI Time**: 0 minutes
**Commit**: `a766485`

**Notes**:
- Independently implemented orbital mechanics using trigonometry
- Each illustration has unique: angle, radius, size, rotation, orbit duration
- Uses vh/vw units for viewport-relative positioning (later updated to dvh)
- Pointer events disabled for non-blocking background layer

---

### 2025-11-19: CTA Tab Component

**Phase**: Implementation + Validation

| Role | Human Contribution | AI Contribution |
|------|-------------------|--------------------|
| Conceptualization | Principal - Bottom CTA design, messaging, contact link | None |
| Analysis | Principal - Glassmorphism styling, positioning strategy | None |
| Implementation | Principal - Full CTATab component (23 lines), backdrop blur, hover effects | None |
| Validation | Principal - Visual design validation, hover interaction testing | None |

**Deliverables**:
- ✅ Fixed bottom CTA tab with glassmorphism design
- ✅ Backdrop blur with semi-transparent black background
- ✅ "Yours could look this cool" messaging
- ✅ Email link button with hover scale effect
- ✅ React Feather Send icon integration
- ✅ Rounded top corners with border styling

**Tools Used**: None (manual implementation)
**Human Time**: ~30 minutes (design, implementation, styling)
**AI Time**: 0 minutes
**Commit**: `9417b9d` (also included single-file folder refactoring)

**Notes**:
- Uses ApfelGrotezk custom font
- Pointer events carefully managed (none on wrapper, auto on content)
- Email link: hello@loscolmebrothers.com
- Z-index 20 to stay above other elements

---

### 2025-11-20: Bros Hover Effects & Enhancements

**Phase**: Implementation + Validation

| Role | Human Contribution | AI Contribution |
|------|-------------------|--------------------|
| Conceptualization | Principal - Interactive hover behavior, sparkle/illustration fade effects | None |
| Analysis | Principal - Determined interaction choreography between island, sparkles, and illustrations | None |
| Implementation | Principal - Enhanced Island animations, SparkleSystem intensity methods, FloatingIllustrations fade logic | None |
| Validation | Principal - Cross-component interaction testing, timing coordination | None |

**Deliverables**:
- ✅ Island hover triggers sparkle intensification
- ✅ Island hover fades out floating illustrations (opacity 0.6 → 0.2)
- ✅ Bros scale animation enhanced (1.15x with spring effect)
- ✅ Coordinated animations across Island, SparkleSystem, FloatingIllustrations
- ✅ ConstructionWarning component (later removed)
- ✅ Deployment preparation (DNS, icons, build config)

**Tools Used**: None (manual implementation)
**Human Time**: ~3 hours (cross-component coordination, animation refinement)
**AI Time**: 0 minutes
**Commit**: `8c553c7`

**Notes**:
- Complex interaction choreography across three major components
- Uses imperative handles to trigger animations across component boundaries
- SparkleSystem methods: `intensify()` boosts opacity (0.6-0.9), `calm()` returns to base (0.05-0.4)
- FloatingIllustrations methods: `fadeOut()` dims to 0.2, `fadeIn()` returns to 0.6
- Added react-feather dependency for icons

---

### 2025-12-28: Mobile Viewport Height Fix

**Phase**: Implementation + Validation

| Role | Human Contribution | AI Contribution |
|------|-------------------|--------------------|
| Conceptualization | Principal - Identified mobile bottom bar issue, requested dvh conversion | Support - Understood requirements, planned implementation |
| Analysis | Support - Provided context about mobile browser UI | Principal - Scanned codebase for all vh usage, identified affected files |
| Implementation | None | Principal - Updated vh → dvh across Island, FloatingIllustrations, SparkleSystem |
| Validation | Principal - Will test on mobile devices | Support - Code review, syntax validation |

**Deliverables**:
- ✅ Island component: `h-screen` → `h-dvh` (src/components/Island/index.tsx:47)
- ✅ FloatingIllustrations: `vh` → `dvh` for vertical positioning (lines 166, 200)
- ✅ SparkleSystem: `vh` → `dvh` for vertical positioning (line 147)
- ✅ Consistent mobile viewport handling across all components

**Tools Used**: Claude Code (Claude Sonnet 4.5)
**Human Time**: ~5 minutes (issue identification, code review)
**AI Time**: ~10 minutes (codebase exploration, implementation)

**Notes**:
- `dvh` (dynamic viewport height) accounts for mobile browser UI (address bar, bottom navigation)
- Browser support: Safari 15.4+, Chrome 108+, Firefox 110+ (all March 2022+)
- Only vertical positioning affected; horizontal `vw` units unchanged
- User initially requested bottle image enhancements (glow, link) but reverted those changes
- Final implementation: mobile viewport fix only

---

## Future Entries Template

```markdown
### YYYY-MM-DD: [Feature/Task Name]

**Phase**: [Conceptualization/Analysis/Implementation/Validation]

| Role | Human Contribution | AI Contribution |
|------|-------------------|-----------------|
| Conceptualization | [Level - Description] | [Level - Description] |
| Analysis | [Level - Description] | [Level - Description] |
| Implementation | [Level - Description] | [Level - Description] |
| Validation | [Level - Description] | [Level - Description] |

**Tools Used**: [AI tools/models used]
**Human Time**: [Approximate time]
**AI Interactions**: [Brief description]
```

---

## Notes

- This file is updated regularly as the project progresses
- Each significant feature/task gets its own entry
- Attribution is tracked honestly and transparently
- The framework helps us understand and communicate the collaborative nature of this work
