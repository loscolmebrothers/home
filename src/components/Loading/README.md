# Loading

A self-contained, reusable loading overlay. Stacks image "slices" vertically,
plays a staggered entrance → idle opacity loop → exit drift+rise, and can be
driven by either a `duration` prop or an external `finish()` trigger.
Zero project coupling — brand assets live in `defaultAssets.ts` and are
overridable via props. Built to be lifted into its own package.

## Usage

### Duration mode (auto-finish)

```tsx
import { Loading } from "./Loading";

<Loading duration={2200} onFinish={() => startScene()} />
```

### Trigger mode (caller-controlled)

```tsx
import { Loading, type LoadingHandle } from "./Loading";

const ref = useRef<LoadingHandle>(null);

<Loading ref={ref} onFinish={() => startScene()} />

// later, when ready:
ref.current?.finish();
```

### Both (duration as fallback, trigger as override)

```tsx
<Loading ref={ref} duration={5000} onFinish={startScene} />
// Calling ref.current?.finish() before 5s exits immediately.
```

## Props

| Prop        | Type                              | Default          | Description                                      |
| ----------- | --------------------------------- | ---------------- | ------------------------------------------------ |
| `slices`    | `LoadingSlice[]`                  | LOS / COLME / BROTHERS | Images stacked vertically                   |
| `className` | `string`                          | `""`             | Extra classes on the overlay                     |
| `duration`  | `number` (ms)                     | `undefined`      | Auto-finish after N ms. Omit for trigger mode.   |
| `onFinish`  | `() => void`                      | `undefined`      | Called when loading completes (both modes)       |

## Handle

`finish(onComplete?)` — manually trigger the exit animation. `onComplete` fires
after the exit timeline finishes.

## Animation phases

1. **Entrance** — slices rise in with `back.out(1.5)`, staggered top→bottom,
   landing at 50% opacity.
2. **Idle** — gentle balloon bob (per-slice phase) + subtle opacity breathing
   (0.3 ↔ 0.5, staggered).
3. **Exit** — brief downward drift, then slices rise up and fade, overlay fades out.
