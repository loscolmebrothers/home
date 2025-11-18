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

**Last Updated**: 2025-11-17

### Overall Project Attribution

```
┌─────────────────────────────────────────────────────────────┐
│                  CONTRIBUTION BREAKDOWN                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Human: ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 40%    │
│  AI:    ░░░░░░░░░░░░░░░░████████████████████████████ 60%    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Phase              │  Human       │  AI                    │
├─────────────────────────────────────────────────────────────┤
│  Conceptualization  │  Principal   │  Support               │
│  Analysis           │  Equal       │  Equal                 │
│  Implementation     │  Support     │  Principal             │
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
