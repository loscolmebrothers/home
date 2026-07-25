import { useEffect, useRef } from "react";
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
  const startEntranceRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      startEntranceRef.current = () => {
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

        gsap.to([brosRef.current, logoRef.current, portfolioRef.current], {
          y: "+=10",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 2,
        });

        lampRef.current?.start();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, logoRef, portfolioRef, brosRef, lampRef]);

  return {
    startEntrance: () => startEntranceRef.current?.(),
  };
};
