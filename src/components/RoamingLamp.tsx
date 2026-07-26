import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import lamp from "/assets/illustrations/LampInverted.svg";

export type RoamingLampHandle = {
  start: () => void;
  stop: () => void;
};

interface RoamingLampProps {
  onLampClick: (x: number, y: number) => void;
  isOpen?: boolean;
}

export const RoamingLamp = forwardRef<RoamingLampHandle, RoamingLampProps>(
  ({ onLampClick, isOpen = false }, ref) => {
    const lampRef = useRef<HTMLDivElement>(null);
    const xRef = useRef<HTMLDivElement>(null);
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

    const handleClick = () => {
      if (!lampRef.current) return;
      const rect = lampRef.current.getBoundingClientRect();
      onLampClick(rect.left + rect.width / 2, rect.top + rect.height / 2);
    };

    useImperativeHandle(ref, () => ({
      start: () => {
        if (!lampRef.current) return;
        gsap.set(lampRef.current, { opacity: 0, scale: 0.2 });
        gsap.to(lampRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
          delay: 1.5,
          onComplete: roam,
        });
      },
      stop: () => {
        roamTweenRef.current?.kill();
        if (lampRef.current) gsap.killTweensOf(lampRef.current);
      },
    }));

    useEffect(() => {
      if (!xRef.current) return;
      gsap.to(xRef.current, {
        opacity: isOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }, [isOpen]);

    useEffect(() => {
      return () => {
        roamTweenRef.current?.kill();
        if (lampRef.current) gsap.killTweensOf(lampRef.current);
      };
    }, []);

    return (
      <div className="fixed top-0 left-0 z-9999 pointer-events-none">
        <div
          ref={lampRef}
          onClick={handleClick}
          onMouseEnter={() => roamTweenRef.current?.pause()}
          onMouseLeave={() => roamTweenRef.current?.resume()}
          role="button"
          aria-label={isOpen ? "Close" : "Open"}
          className="pointer-events-auto cursor-pointer relative md:w-82 md:h-82 w-52 h-52 opacity-0"
        >
          <div className="mix-blend-exclusion w-full h-full">
            <img
              src={lamp}
              alt=""
              draggable={false}
              className="w-full h-full object-contain"
            />
          </div>
          <div
            ref={xRef}
            className="absolute inset-0 flex items-center justify-center opacity-0"
            aria-hidden="true"
          >
            <span className="text-white text-4xl font-thin select-none leading-none">
              ×
            </span>
          </div>
        </div>
      </div>
    );
  },
);

RoamingLamp.displayName = "RoamingLamp";
