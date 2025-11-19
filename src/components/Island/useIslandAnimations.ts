import { useEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import type { SparkleEffectHandle } from "./SparkleEffect";

interface UseIslandAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  islandRef: RefObject<HTMLDivElement | null>;
  brosRef: RefObject<HTMLDivElement | null>;
  balloonLogoRef: RefObject<HTMLDivElement | null>;
  losRef: RefObject<HTMLImageElement | null>;
  colmeRef: RefObject<HTMLImageElement | null>;
  brothersRef: RefObject<HTMLImageElement | null>;
  sparklesRef: RefObject<SparkleEffectHandle | null>;
}

export const useIslandAnimations = ({
  containerRef,
  islandRef,
  brosRef,
  balloonLogoRef,
  losRef,
  colmeRef,
  brothersRef,
  sparklesRef,
}: UseIslandAnimationsProps) => {
  useEffect(() => {
    if (
      !containerRef.current ||
      !islandRef.current ||
      !brosRef.current ||
      !balloonLogoRef.current ||
      !losRef.current ||
      !colmeRef.current ||
      !brothersRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Entrance sequence: Bros → Balloon → Logo
      tl.to(brosRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.5)",
      })
        .to(
          balloonLogoRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.2",
        )
        .to(
          [losRef.current, colmeRef.current, brothersRef.current],
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: "back.out(2)",
          },
          "-=0.3",
        )
        .to(
          islandRef.current,
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.inOut",
          },
          0,
        );

      // Continuous floating animations
      gsap.to(islandRef.current, {
        y: "+=15",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(balloonLogoRef.current, {
        y: "+=25",
        rotation: "+=3",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(balloonLogoRef.current, {
        rotation: "-=2",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.3,
      });

      // Hover spring effect
      const handleMouseEnter = () => {
        gsap.to(islandRef.current, {
          scale: 1.05,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
        gsap.to(brosRef.current, {
          scale: 1.15,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(islandRef.current, {
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
        gsap.to(brosRef.current, {
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      };

      islandRef.current?.addEventListener("mouseenter", handleMouseEnter);
      islandRef.current?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        islandRef.current?.removeEventListener("mouseenter", handleMouseEnter);
        islandRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [
    containerRef,
    islandRef,
    brosRef,
    balloonLogoRef,
    losRef,
    colmeRef,
    brothersRef,
    sparklesRef,
  ]);
};
