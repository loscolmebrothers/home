import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { gsap } from "gsap";
import type { LoadingHandle, LoadingProps } from "./types";
import { DEFAULT_SLICES } from "./defaultAssets";

export const Loading = forwardRef<LoadingHandle, LoadingProps>(
  ({ slices = DEFAULT_SLICES, className = "", duration, onFinish }, ref) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const sliceRefs = useRef<(HTMLDivElement | null)[]>([]);
    const finishedRef = useRef(false);
    const durationTimerRef = useRef<number | undefined>(undefined);
    const onFinishRef = useRef(onFinish);
    const exitFnRef = useRef<((onComplete?: () => void) => void) | null>(null);

    onFinishRef.current = onFinish;

    useEffect(() => {
      if (!overlayRef.current) return;
      finishedRef.current = false;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          sliceRefs.current,
          { opacity: 0, y: 24, scale: 0.92 },
          {
            opacity: 0.5,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.18,
            ease: "back.out(1.5)",
          },
        );

        const idleDelay = 0.7 + slices.length * 0.18 + 0.2;
        sliceRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            y: "+=10",
            duration: 1.6 + i * 0.25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: idleDelay,
          });
          gsap.to(el, {
            opacity: 0.3,
            duration: 1.5 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: idleDelay + i * 0.1,
          });
        });

        if (duration) {
          durationTimerRef.current = window.setTimeout(() => {
            exitFnRef.current?.();
          }, duration);
        }
      }, overlayRef);

      exitFnRef.current = (onComplete?: () => void) => {
        if (finishedRef.current) {
          onComplete?.();
          return;
        }
        finishedRef.current = true;
        if (durationTimerRef.current) clearTimeout(durationTimerRef.current);

        sliceRefs.current.forEach((el) => {
          if (el) gsap.killTweensOf(el);
        });

        const tl = gsap.timeline({
          onComplete: () => {
            if (overlayRef.current) overlayRef.current.style.display = "none";
            onComplete?.();
            onFinishRef.current?.();
          },
        });

        tl.to(sliceRefs.current, {
          y: "+=18",
          duration: 0.28,
          ease: "sine.inOut",
          stagger: 0.04,
        })
          .to(
            sliceRefs.current,
            {
              opacity: 0,
              y: -32,
              duration: 0.4,
              stagger: 0.06,
              ease: "power2.in",
              overwrite: true,
            },
            "-=0.05",
          )
          .to(
            overlayRef.current,
            { opacity: 0, duration: 0.3, ease: "power2.inOut" },
            "-=0.15",
          );
      };

      return () => {
        ctx.revert();
        if (durationTimerRef.current) clearTimeout(durationTimerRef.current);
      };
    }, [slices, duration]);

    useImperativeHandle(ref, () => ({
      finish: (onComplete?: () => void) => {
        exitFnRef.current?.(onComplete);
      },
    }));

    return (
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-1 bg-white ${className}`}
      >
        {slices.map((slice, i) => (
          <div
            key={i}
            ref={(el) => {
              sliceRefs.current[i] = el;
            }}
            className="opacity-0"
          >
            <img
              src={slice.src}
              alt={slice.alt ?? ""}
              draggable={false}
              className="h-9 w-auto select-none sm:h-11"
            />
          </div>
        ))}
      </div>
    );
  },
);

Loading.displayName = "Loading";
