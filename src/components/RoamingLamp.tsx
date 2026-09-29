import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import lamp from "/assets/illustrations/LampInverted.svg";

export type RoamingLampHandle = {
  start: () => void;
  stop: () => void;
  getPosition: () => { x: number; y: number };
};

interface RoamingLampProps {
  onLampClick: (x: number, y: number) => void;
  isOpen?: boolean;
}

export const RoamingLamp = forwardRef<RoamingLampHandle, RoamingLampProps>(
  ({ onLampClick, isOpen = false }, ref) => {
    const lampRef = useRef<HTMLDivElement>(null);
    const xRef = useRef<HTMLDivElement>(null);
    const clickMeRef = useRef<HTMLDivElement>(null);
    const roamTweenRef = useRef<gsap.core.Tween | null>(null);
    const hintTweenRef = useRef<gsap.core.Timeline | null>(null);
    const [hintDismissed, setHintDismissed] = useState(false);

    const dismissHint = () => setHintDismissed(true);

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
      dismissHint();
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
        if (clickMeRef.current) {
          gsap.set(clickMeRef.current, { opacity: 0, scale: 0.5 });
          hintTweenRef.current = gsap
            .timeline({ delay: 1.5 + 0.8 + 0.5 })
            .to(clickMeRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" })

        }
      },
      stop: () => {
        roamTweenRef.current?.kill();
        hintTweenRef.current?.kill();
        if (lampRef.current) gsap.killTweensOf(lampRef.current);
        if (clickMeRef.current) gsap.killTweensOf([clickMeRef.current, clickMeRef.current.querySelector("span")]);
      },
      getPosition: () => {
        if (!lampRef.current) return { x: 0, y: 0 };
        const rect = lampRef.current.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
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
      if (isOpen || hintDismissed) {
        hintTweenRef.current?.kill();
        return;
      }
      const dismissTimer = window.setTimeout(() => setHintDismissed(true), 15000);
      return () => window.clearTimeout(dismissTimer);
    }, [isOpen, hintDismissed]);

    useEffect(() => {
      return () => {
        roamTweenRef.current?.kill();
        hintTweenRef.current?.kill();
        if (lampRef.current) gsap.killTweensOf(lampRef.current);
      };
    }, []);

    return (
      <div className="fixed top-0 left-0 z-9999 pointer-events-none mix-blend-exclusion">
        <div
          ref={lampRef}
          onClick={handleClick}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") roamTweenRef.current?.pause();
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") roamTweenRef.current?.resume();
          }}
          role="button"
          aria-label={isOpen ? "Close" : "Open"}
          className="pointer-events-auto cursor-pointer relative md:w-68 md:h-68 w-48 h-48 opacity-0"
        >
          <div className="w-full h-full">
            <img
              src={lamp}
              alt=""
              draggable={false}
              className="w-full object-cover flex"
            />
          </div>
          {!isOpen && !hintDismissed && (
            <div
              ref={clickMeRef}
              aria-hidden="true"
              className="absolute right-1/4 translate-x-3 md:translate-x-1 top-1/2 whitespace-nowrap"
            >
              <span
                className="bg-white p-1 text-black font-bold text-xs tracking-[0.3em] uppercase select-none animate-pulse"
                style={{ fontFamily: "'ApfelGrotezk', sans-serif" }}
              >
                {"Click me"}
              </span>
            </div>
          )}
          <div
            ref={xRef}
            className="absolute inset-0 bottom-10 left-10 flex items-center justify-center opacity-0 text-4xl hover:text-6xl"
            aria-hidden="true"
          >
            <span className="text-white  font-thin select-none leading-none ">
              ×
            </span>
          </div>
        </div>
      </div>
    );
  },
);

RoamingLamp.displayName = "RoamingLamp";
