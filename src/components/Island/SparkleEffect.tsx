import { useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import sparkle1 from "/assets/illustrations/sparkles/1.svg";
import sparkle2 from "/assets/illustrations/sparkles/2.svg";
import sparkle3 from "/assets/illustrations/sparkles/3.svg";
import sparkle4 from "/assets/illustrations/sparkles/4.svg";
import sparkle5 from "/assets/illustrations/sparkles/5.svg";
import sparkle6 from "/assets/illustrations/sparkles/6.svg";
import sparkle7 from "/assets/illustrations/sparkles/7.svg";

const sparkleImages = [sparkle1, sparkle2, sparkle3, sparkle4, sparkle5, sparkle6, sparkle7];

export type SparkleEffectHandle = {
  start: () => void;
  stop: () => void;
};

export const SparkleEffect = forwardRef<SparkleEffectHandle>((_, ref) => {
  const sparklesRef = useRef<(HTMLImageElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    start: () => {
      sparklesRef.current.forEach((sparkle, index) => {
        if (!sparkle) return;

        const delay = index * 0.15;
        const duration = 1 + Math.random() * 0.5;

        gsap.to(sparkle, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          delay,
          ease: "back.out(1.7)",
        });

        gsap.to(sparkle, {
          scale: 0.8,
          opacity: 0.6,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay + 0.3,
        });
      });
    },

    stop: () => {
      sparklesRef.current.forEach((sparkle) => {
        if (!sparkle) return;
        gsap.killTweensOf(sparkle);
        gsap.to(sparkle, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      });
    },
  }));

  return (
    <>
      {Array.from({ length: 25 }).map((_, index) => {
        const sparkleIndex = Math.floor(Math.random() * 7);
        const angle = (Math.random() * 360 * Math.PI) / 180;
        const distance = 50 + Math.random() * 30;
        const randomX = 50 + Math.cos(angle) * distance;
        const randomY = 50 + Math.sin(angle) * distance;

        return (
          <img
            key={index}
            ref={(el) => {
              sparklesRef.current[index] = el;
            }}
            src={sparkleImages[sparkleIndex]}
            alt=""
            className="absolute w-1.5 h-1.5 opacity-0 pointer-events-none"
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`,
            }}
          />
        );
      })}
    </>
  );
});

SparkleEffect.displayName = "SparkleEffect";
