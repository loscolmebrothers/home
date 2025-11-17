# AI/Human Attribution

This project follows ethical AI/Human collaboration guidelines based on the framework by Manuel Masías:
**Reference**: [Etiquetado Ético - mmasias](https://github.com/mmasias/mmasias/blob/main/ai/etiquetadoEtico.md)

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
│  Human: ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░ 40%    │
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
