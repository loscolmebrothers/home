import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import lamp from "/assets/illustrations/LampInverted.svg";

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
      return () => {
        roamTweenRef.current?.kill();
        if (lampRef.current) gsap.killTweensOf(lampRef.current);
      };
    }, []);

    return (
      <div className="fixed top-0 left-0 z-9999 pointer-events-none mix-blend-exclusion">
        <div
          ref={lampRef}
          onClick={onLampClick}
          className="pointer-events-auto cursor-help md:w-82 md:h-82 w-52 h-52 opacity-0"
        >
          <img src={lamp} alt="" className="w-full h-full object-contain" />
        </div>
      </div>
    );
  },
);

RoamingLamp.displayName = "RoamingLamp";
