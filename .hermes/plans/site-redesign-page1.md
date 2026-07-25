# Site Redesign — Page 1 Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Replace the current Island-based landing screen with a clean, white, poster-style Page 1 featuring the graffiti logo, a portfolio list, a free-roaming gold lamp, the bros characters, and an adapted starry background.

**Architecture:** A new `Landing` component replaces `Island` as the main scene. `SparkleSystem` is retained but tuned for white backgrounds (reduced to 80 sparkles). Three dead components (`FloatingIllustrations`, `CTATab`, `Island/SparkleEffect`) are removed. A `RoamingLamp` component handles the free-roaming lamp with GSAP — it sits at the highest z-index in the stacking context. A dedicated, swappable `Loading` component handles the pre-entrance state (basic now, easily replaceable later). The Bros image is rendered large, anchored to the bottom, and clipped by the `h-dvh` / `overflow-hidden` viewport so only ~40% of the bottom screen shows the characters.

**Tech Stack:** React 19, TypeScript, GSAP 3, Tailwind CSS 4, Vite 7, Vitest

---

## Design Spec (Page 1)

A white background, black + gold palette, composed vertically:

| Zone | Position | Element | Source |
|---|---|---|---|
| Background | Full viewport | White + subtle dark starry sparkles | `SparkleSystem.tsx` (adapted, 80 sparkles) |
| Top center | ~8-12% from top | Graffiti logo **LOS COLMEBROTHERS** (landscape vector) | `https://assets.loscolmebrothers.com/logo/landscape/vector.svg` |
| Center-upper | Below logo | Portfolio list — 3 items, each prefixed with ★ | New `PortfolioList.tsx` |
| Roaming | Anywhere in viewport | Gold genie lamp, `cursor: pointer`, click → Page 2. **Highest z-index** — everything renders below it | `Lamp.svg` (gold variant) |
| Lower ~40% | Bottom center, clipped | Two bros characters — rendered **large**, anchored to bottom, top half overflows/clipped by `h-dvh` + `overflow-hidden`. Only ~40% of bottom screen shows them | `Bros.svg` |

**Portfolio items** (mock links for now, prefixed with ★):
1. `★ FOREVER MESSAGE` → `https://forever-message.loscolmebrothers.com` (mock)
2. `★ PLANETPARTNERS` → `https://planetpartners.loscolmebrothers.com` (mock)
3. `★ EUROPABODAS` → `https://europabodas.loscolmebrothers.com` (mock)

**Typography:**
- Logo: graffiti SVG from CDN (no font)
- Portfolio list: ApfelGrotezk, uppercase, thin weight, letter-spacing wide, ~14-16px

**Palette:**
- Background: `#ffffff` (white)
- Text/logo: `#000000` (black)
- Accent: `#D4AF37` / `#C9A227` (gold) — lamp only

---

## Component Structure: Old → New

### Remove (3 components)
| File | Reason |
|---|---|
| `src/components/FloatingIllustrations.tsx` | 30 orbiting items — not in new design |
| `src/components/CTATab.tsx` | "Let's talk" bar — not in new design |
| `src/components/Island/` (entire folder) | Island SVG + balloon logo + SparkleEffect — replaced by Landing |

### Keep + Adapt (1 component)
| File | Change |
|---|---|
| `src/components/SparkleSystem.tsx` | Tune opacity for white bg; reduce count 120 → 80; adjust center-avoidance zone |

### Create (5 components)
| File | Purpose |
|---|---|
| `src/components/Landing/index.tsx` | Main scene container — logo, portfolio list, bros, lamp |
| `src/components/Landing/useLandingAnimations.ts` | GSAP entrance timeline (called after Loading completes) |
| `src/components/Loading/index.tsx` | Self-contained, swappable loading overlay. Basic now ("Loading…"), easily replaced later. Exposes a `finish()` ref method the timeline calls |
| `src/components/PortfolioList.tsx` | The 3-item list with star prefixes + mock links |
| `src/components/RoamingLamp.tsx` | Gold lamp with free-roaming GSAP animation + click handler stub. **z-index: top of stack** |

### Modify
| File | Change |
|---|---|
| `src/App.tsx` | Compose `SparkleSystem` + `Landing` (remove FloatingIllustrations, Island, CTATab) |
| `src/styles/globals.css` | Add gold text utility class |

---

## Tasks

### Task 1: Clean up App.tsx — remove dead components

**Objective:** Strip `FloatingIllustrations`, `Island`, and `CTATab` from the render tree.

**Files:**
- Modify: `src/App.tsx`

**Step 1: Rewrite App.tsx to minimal skeleton**

```tsx
import { useRef } from "react";
import { SparkleSystem } from "./components/SparkleSystem";
import type { SparkleSystemHandle } from "./components/SparkleSystem";

function App() {
  const sparkleSystemRef = useRef<SparkleSystemHandle>(null);

  return (
    <>
      <SparkleSystem ref={sparkleSystemRef} />
      {/* Landing component will go here in Task 6 */}
    </>
  );
}

export default App;
```

**Step 2: Verify build**

Run: `pnpm build`
Expected: Build succeeds

**Step 3: Verify test passes**

Run: `pnpm test -- --run`
Expected: PASS — App renders without crashing

**Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "refactor: strip dead components from App for redesign"
```

---

### Task 2: Delete dead component files

**Objective:** Remove the 3 dead components from the codebase.

**Files:**
- Delete: `src/components/FloatingIllustrations.tsx`
- Delete: `src/components/CTATab.tsx`
- Delete: `src/components/Island/` (entire folder)

**Step 1: Delete files**

```bash
rm src/components/FloatingIllustrations.tsx
rm src/components/CTATab.tsx
rm -rf src/components/Island/
```

**Step 2: Search for any remaining imports**

Run: `grep -rn "FloatingIllustrations\|CTATab\|Island\|SparkleEffect\|useIslandAnimations" src/`
Expected: No matches

**Step 3: Verify build**

Run: `pnpm build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove dead components (FloatingIllustrations, CTATab, Island)"
```

---

### Task 3: Create gold lamp variant SVG

**Objective:** The design calls for a gold lamp. Current `Lamp.svg` is black (`#000000`). Create a gold copy.

**Files:**
- Create: `public/assets/illustrations/LampGold.svg`

**Step 1: Copy Lamp.svg and recolor**

```bash
cp public/assets/illustrations/Lamp.svg public/assets/illustrations/LampGold.svg
sed -i 's/#000000/#D4AF37/g; s/#000/#D4AF37/g' public/assets/illustrations/LampGold.svg
```

**Step 2: Verify gold color applied**

Run: `grep -c "#D4AF37" public/assets/illustrations/LampGold.svg`
Expected: ≥1 match

**Step 3: Commit**

```bash
git add public/assets/illustrations/LampGold.svg
git commit -m "assets: add gold lamp variant for redesign"
```

---

### Task 4: Create swappable Loading component

**Objective:** A self-contained, easily-replaceable loading overlay. For now it just shows "Loading…" centered on white. Exposes a `finish()` ref method that fades it out.

**Files:**
- Create: `src/components/Loading/index.tsx`

> **Design intent:** This component is deliberately isolated so it can be swapped for a fancier loader later (shimmer, progress bar, logo animation) without touching the Landing/animation logic. The contract is: render an overlay + expose `finish()`.

**Step 1: Create the component**

```tsx
import { forwardRef, useImperativeHandle, useRef } from "react";
import { gsap } from "gsap";

export type LoadingHandle = {
  finish: (onComplete?: () => void) => void;
};

export const Loading = forwardRef<LoadingHandle>((_, ref) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    finish: (onComplete?: () => void) => {
      if (!overlayRef.current) {
        onComplete?.();
        return;
      }
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
          onComplete?.();
        },
      });
    },
  }));

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 bg-white flex items-center justify-center"
    >
      <span
        className="text-black/50 text-sm uppercase tracking-[0.3em]"
        style={{ fontFamily: "'ApfelGrotezk', sans-serif" }}
      >
        Loading…
      </span>
    </div>
  );
});

Loading.displayName = "Loading";
```

**Step 2: Commit**

```bash
git add src/components/Loading/index.tsx
git commit -m "feat: add swappable Loading overlay component"
```

---

### Task 5: Create PortfolioList component

**Objective:** The 3-item portfolio list with star prefixes and mock links.

**Files:**
- Create: `src/components/PortfolioList.tsx`
- Modify: `src/styles/globals.css`

**Step 1: Create the component**

```tsx
import { forwardRef } from "react";

export interface PortfolioItem {
  label: string;
  href: string;
}

const portfolioItems: PortfolioItem[] = [
  { label: "FOREVER MESSAGE", href: "https://forever-message.loscolmebrothers.com" },
  { label: "PLANETPARTNERS", href: "https://planetpartners.loscolmebrothers.com" },
  { label: "EUROPABODAS", href: "https://europabodas.loscolmebrothers.com" },
];

export const PortfolioList = forwardRef<HTMLUListElement>((_, ref) => {
  return (
    <ul
      ref={ref}
      className="flex flex-col items-center gap-1"
      style={{ fontFamily: "'ApfelGrotezk', sans-serif" }}
    >
      {portfolioItems.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/70 hover:text-black text-sm uppercase tracking-[0.2em] transition-colors duration-300 flex items-center gap-2"
          >
            <span className="text-gold">★</span>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
});

PortfolioList.displayName = "PortfolioList";
```

**Step 2: Add gold text utility to globals.css**

Add after the `@font-face` block:

```css
.text-gold {
  color: #D4AF37;
}
```

**Step 3: Commit**

```bash
git add src/components/PortfolioList.tsx src/styles/globals.css
git commit -m "feat: add PortfolioList component with mock links"
```

---

### Task 6: Create RoamingLamp component

**Objective:** Gold lamp that roams freely across the viewport with `cursor: pointer` and a click handler stub for Page 2. Sits at the **highest z-index** in the stacking context.

**Files:**
- Create: `src/components/RoamingLamp.tsx`

> **GSAP element-separation pattern:** The positioning layer (fixed anchor) is separate from the animation layer (GSAP controls x/y). This prevents transform conflicts.

**Step 1: Create the component**

```tsx
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import lampGold from "/assets/illustrations/LampGold.svg";

export type RoamingLampHandle = {
  start: () => void;
  stop: () => void;
};

interface RoamingLampProps {
  onLampClick: () => void;
}

export const RoamingLamp = forwardRef<RoamingLampHandle, RoamingLampProps>(
  ({ onLampClick }, ref) => {
    const lampRef = useRef<HTMLDivElement>(null);
    const roamTweenRef = useRef<gsap.core.Tween | null>(null);

    const pickRoamTarget = () => {
      if (typeof window === "undefined") return { x: 0, y: 0 };
      const margin = 80;
      const x = margin + Math.random() * (window.innerWidth - margin * 2);
      const y = margin + Math.random() * (window.innerHeight - margin * 2);
      return { x, y };
    };

    const roam = () => {
      if (!lampRef.current) return;
      const { x, y } = pickRoamTarget();
      roamTweenRef.current = gsap.to(lampRef.current, {
        x,
        y,
        duration: 5 + Math.random() * 4,
        ease: "sine.inOut",
        onComplete: roam,
      });
    };

    useImperativeHandle(ref, () => ({
      start: () => {
        if (!lampRef.current) return;
        gsap.set(lampRef.current, { opacity: 0, scale: 0.5 });
        gsap.to(lampRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
          onComplete: roam,
        });
      },
      stop: () => {
        roamTweenRef.current?.kill();
        if (lampRef.current) gsap.killTweensOf(lampRef.current);
      },
    }));

    useEffect(() => {
      return () => {
        roamTweenRef.current?.kill();
        if (lampRef.current) gsap.killTweensOf(lampRef.current);
      };
    }, []);

    return (
      <div className="fixed top-0 left-0 z-[9999] pointer-events-none">
        <div
          ref={lampRef}
          onClick={onLampClick}
          className="pointer-events-auto cursor-pointer w-16 h-16 opacity-0"
        >
          <img src={lampGold} alt="" className="w-full h-full object-contain" />
        </div>
      </div>
    );
  },
);

RoamingLamp.displayName = "RoamingLamp";
```

**Step 2: Commit**

```bash
git add src/components/RoamingLamp.tsx
git commit -m "feat: add RoamingLamp with free-roaming GSAP animation (top z-index)"
```

---

### Task 7: Create Landing component (scene composition)

**Objective:** The main scene container that assembles loading overlay, logo, portfolio list, bros (large, clipped), and lamp. Drives the entrance timeline after loading completes.

**Files:**
- Create: `src/components/Landing/index.tsx`
- Create: `src/components/Landing/useLandingAnimations.ts`

> **Bros positioning:** The Bros image is rendered large and anchored to the bottom center. The viewport (`h-dvh` + `overflow-hidden`) clips the overflowing top portion. Only ~40% of the bottom screen shows the characters. Tuned in Task 9 QA.

**Step 1: Create the animation hook**

`src/components/Landing/useLandingAnimations.ts`:

```tsx
import { useEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import type { RoamingLampHandle } from "../RoamingLamp";

interface UseLandingAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  logoRef: RefObject<HTMLImageElement | null>;
  portfolioRef: RefObject<HTMLUListElement | null>;
  brosRef: RefObject<HTMLDivElement | null>;
  lampRef: RefObject<RoamingLampHandle | null>;
}

export const useLandingAnimations = ({
  containerRef,
  logoRef,
  portfolioRef,
  brosRef,
  lampRef,
}: UseLandingAnimationsProps) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.4)" },
      )
        .fromTo(
          portfolioRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          brosRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4",
        );

      gsap.to(brosRef.current, {
        y: "+=10",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2,
      });

      lampRef.current?.start();
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, logoRef, portfolioRef, brosRef, lampRef]);
};
```

**Step 2: Create the Landing component**

`src/components/Landing/index.tsx`:

```tsx
import { useRef } from "react";
import { PortfolioList } from "../PortfolioList";
import { RoamingLamp } from "../RoamingLamp";
import type { RoamingLampHandle } from "../RoamingLamp";
import { Loading } from "../Loading";
import type { LoadingHandle } from "../Loading";
import { useLandingAnimations } from "./useLandingAnimations";
import brosSvg from "/assets/illustrations/Bros.svg";

const LOGO_URL = "https://assets.loscolmebrothers.com/logo/landscape/vector.svg";

export const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<LoadingHandle>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const portfolioRef = useRef<HTMLUListElement>(null);
  const brosRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<RoamingLampHandle>(null);

  const handleLampClick = () => {
    window.location.hash = "page-2";
  };

  useLandingAnimations({ containerRef, logoRef, portfolioRef, brosRef, lampRef });

  return (
    <>
      <RoamingLamp ref={lampRef} onLampClick={handleLampClick} />

      <Loading
        ref={loadingRef}
      />

      <div
        ref={containerRef}
        className="relative w-full h-dvh flex flex-col items-center overflow-hidden bg-white"
      >
        <img
          ref={logoRef}
          src={LOGO_URL}
          alt="LOS COLMEBROTHERS"
          className="w-[60%] max-w-md mt-[8vh] h-auto opacity-0"
        />

        <div className="mt-8">
          <PortfolioList ref={portfolioRef} />
        </div>

        <div
          ref={brosRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] max-w-[900px] opacity-0"
        >
          <img
            src={brosSvg}
            alt="The Colme Brothers"
            className="w-full h-auto object-contain object-bottom"
          />
        </div>
      </div>
    </>
  );
};
```

> **Note on Loading → animation handoff:** The `useLandingAnimations` hook runs on mount and starts the entrance timeline immediately. To gate the entrance behind the loading fade, the simplest robust approach is to call `loadingRef.current?.finish()` at the start of the timeline (before the entrance tweens) with a small delay, OR start the timeline inside the `finish()` callback. During implementation, wire the `loadingRef.current.finish(() => { startEntrance() })` pattern so the entrance only begins once loading completes. The hook may be adjusted to accept the loading ref and orchestrate this.

**Step 3: Wire into App.tsx**

```tsx
import { useRef } from "react";
import { SparkleSystem } from "./components/SparkleSystem";
import type { SparkleSystemHandle } from "./components/SparkleSystem";
import { Landing } from "./components/Landing";

function App() {
  const sparkleSystemRef = useRef<SparkleSystemHandle>(null);

  return (
    <>
      <SparkleSystem ref={sparkleSystemRef} />
      <Landing />
    </>
  );
}

export default App;
```

**Step 4: Verify build**

Run: `pnpm build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/components/Landing/ src/App.tsx
git commit -m "feat: add Landing component with entrance timeline"
```

---

### Task 8: Adapt SparkleSystem for white background

**Objective:** Tune sparkle opacity for visibility on white and reduce count to 80.

**Files:**
- Modify: `src/components/SparkleSystem.tsx`

**Changes:**
1. Count: `Array.from({ length: 120 })` → `Array.from({ length: 80 })`
2. Render opacity: `className="absolute opacity-10"` → `className="absolute opacity-25"`
3. Twinkle ranges (`calm` + `useEffect`): `0.05 + Math.random() * 0.35` → `0.1 + Math.random() * 0.3`

**Step 1: Update count + render opacity**

**Step 2: Update twinkle opacity ranges** (two occurrences: `calm` method and `useEffect`)

**Step 3: Verify visually**

Run: `pnpm dev`
Check: 80 subtle gray dots visible on white.

**Step 4: Commit**

```bash
git add src/components/SparkleSystem.tsx
git commit -m "style: tune SparkleSystem for white background (80 sparkles)"
```

---

### Task 9: Visual QA + polish

**Objective:** Run dev server, verify the full page matches the design intent, and adjust spacing/sizing — especially Bros clipping.

**Step 1: Run dev server**

```bash
pnpm dev
```

**Step 2: Verify checklist**
- [ ] White background
- [ ] "Loading…" overlay fades, then entrance plays
- [ ] Logo at top center, graffiti style
- [ ] Portfolio list below logo, 3 items, star-prefixed, ApfelGrotezk
- [ ] Portfolio links open (mock URLs)
- [ ] Bros large, anchored bottom, only ~40% bottom visible, top clipped
- [ ] Bros idle float
- [ ] Gold lamp visible and roaming freely, ABOVE everything
- [ ] Lamp cursor: pointer
- [ ] Lamp click → hash change to #page-2
- [ ] Sparkles visible as subtle dots (80 of them)

**Step 3: Tune Bros clipping** — adjust `w-[140%]` / `max-w-[900px]` / `bottom` offset until ~40% of bottom screen shows characters and faces are visible.

**Step 4: Commit adjustments**

```bash
git add -A
git commit -m "style: polish spacing, Bros clipping for Page 1 redesign"
```

---

### Task 10: Test + final build

**Step 1: Verify existing test passes**

Run: `pnpm test -- --run`
Expected: PASS

**Step 2: Full production build**

Run: `pnpm build`
Expected: Build succeeds, no errors

**Step 3: Final commit**

```bash
git add -A
git commit -m "test: verify redesign passes build and tests"
```

---

## Risk Audit

### High Risk

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 1 | **Lamp roaming uses `window.innerWidth/Height`** — crashes in SSR/jsdom | Test failure, runtime error | Guard with `typeof window !== "undefined"` in `pickRoamTarget` (done in code). jsdom defaults innerWidth=1024 — safe. |
| 2 | **`fromTo` initial state** — if GSAP context reverts, elements return to CSS (`opacity-0` class) → invisible | Blank page on revert | Acceptable in prod (no revert). During HMR/dev, `ctx.revert()` restores `opacity-0` but timeline re-runs on remount. Verify in QA. |
| 3 | **Loading → entrance handoff** — timing race between `finish()` callback and timeline start | Entrance plays before overlay gone, or vice versa | Use `finish(() => startEntrance())` callback pattern. Test in QA. |
| 4 | **Bros clipping is visual guesswork** | Wrong portion visible, faces cut off | Task 9 QA. Adjust width/max-w/object-position. Bros.svg composition determines which part shows. |

### Medium Risk

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 5 | **Sparkle opacity tuning is guesswork** | Too faint or too dark on white | Task 9 QA. Easy constant tweak. |
| 6 | **Lamp roaming on resize** — targets calculated once per hop, viewport changes | Lamp drifts off-screen | Targets are re-picked each hop (recursive `roam`), so self-corrects within one hop. Acceptable. |
| 7 | **`sparkleSystemRef` no longer used by Landing** | Dead prop | Removed from Landing props entirely (no longer passed). Keep ref in App for future. |
| 8 | **Gold lamp via duplicated SVG** — two lamp files to maintain | Divergence if original changes | Acceptable. CSS filter is less precise for metallic gold. |

### Low Risk

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 9 | **Loading overlay z-40, lamp z-9999** — lamp renders above loading overlay | Lamp visible during loading | Lamp starts at `opacity-0` and only `start()`s after entrance — so invisible during loading regardless of z-index. Correct per spec (lamp is highest). |
| 10 | **Page 2 via `window.location.hash`** — stub only | No back nav, no real page | Explicitly temporary. Replaced when Page 2 is designed. |
| 11 | **Logo CDN dependency** | Missing logo if CDN down | Same CDN as current site. Acceptable. |

---

## Resolved Decisions (from user)

1. **Loading effect** → Dedicated, swappable `Loading` component. Basic "Loading…" now, easily replaceable later. ✓
2. **Roaming speed** → 5-9s per hop. ✓
3. **Sparkle density** → 80 (down from 120). ✓
4. **Bros** → Large, anchored bottom, clipped by `h-dvh`+`overflow-hidden`, ~40% of bottom screen visible. ✓
5. **Lamp size** → 64px (`w-16`). ✓
6. **Lamp z-index** → Highest in stack (`z-[9999]`), everything below it. ✓
