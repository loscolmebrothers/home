import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ContactOverlayProps {
  open: boolean;
  originX: number;
  originY: number;
}

export const ContactOverlay = ({ open, originX, originY }: ContactOverlayProps) => {
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
      className="fixed inset-0 z-200 bg-black pointer-events-none text-gray-200 flex justify-center flex-col text-center gap-2"
      style={{ clipPath: "circle(0px at 0px 0px)" }}
    >
      <div style={{ fontFamily: "'ApfelGrotezk', sans-serif" }} className="px-6">
        <h1 className="text-8xl font-extrabold"> Make a wish </h1>
        <p className="text-md mb-12 opacity-80"> A new webpage? Fix your IT mess? New idea you want to bring to life?</p>
        <a
          href="mailto:hello@loscolmebrothers.com"
          className="group relative inline-block text-3xl cursor-pointer transition-colors duration-300 hover:text-[#D4AF37]"
        >
          Let's talk!
          <span className="absolute -bottom-2 left-0 h-0.5 w-full origin-center scale-x-0 bg-[#D4AF37] transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </a>
      </div>
    </div>
  );
};
