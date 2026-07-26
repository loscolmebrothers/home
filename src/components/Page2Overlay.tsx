import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Page2OverlayProps {
  open: boolean;
  originX: number;
  originY: number;
}

export const Page2Overlay = ({ open, originX, originY }: Page2OverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const maxR =
      Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY),
      ) + 50;

    const proxy = { r: open ? 0 : maxR };

    if (open) {
      el.style.clipPath = `circle(0px at ${originX}px ${originY}px)`;
    } else {
      el.style.clipPath = `circle(${maxR}px at ${originX}px ${originY}px)`;
    }

    const tween = gsap.to(proxy, {
      r: open ? maxR : 0,
      duration: 0.8,
      ease: "power2.inOut",
      onUpdate: () => {
        el.style.clipPath = `circle(${proxy.r}px at ${originX}px ${originY}px)`;
      },
    });

    return () => {
      tween.kill();
    };
  }, [open, originX, originY]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-black pointer-events-none"
      style={{ clipPath: "circle(0px at 0px 0px)" }}
    />
  );
};
