import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { gsap } from "gsap";
import sparkle1 from "/assets/illustrations/sparkles/1.svg";
import sparkle2 from "/assets/illustrations/sparkles/2.svg";
import sparkle3 from "/assets/illustrations/sparkles/3.svg";
import sparkle4 from "/assets/illustrations/sparkles/4.svg";
import sparkle5 from "/assets/illustrations/sparkles/5.svg";
import sparkle6 from "/assets/illustrations/sparkles/6.svg";
import sparkle7 from "/assets/illustrations/sparkles/7.svg";

const sparkleImages = [
  sparkle1,
  sparkle2,
  sparkle3,
  sparkle4,
  sparkle5,
  sparkle6,
  sparkle7,
];

export type SparkleSystemHandle = {
  intensify: () => void;
  calm: () => void;
};

export const SparkleSystem = forwardRef<SparkleSystemHandle>((_, ref) => {
  const sparklesRef = useRef<(HTMLImageElement | null)[]>([]);

  // Use lazy state initializer to ensure positions only calculated once
  const [sparklePositions] = useState(() =>
    Array.from({ length: 120 }).map((_, index) => {
      let x = Math.random() * 100;
      let y = Math.random() * 100;

      if (x > 35 && x < 65 && y > 25 && y < 75) {
        if (Math.random() > 0.5) {
          x = x < 50 ? Math.random() * 30 : 70 + Math.random() * 30;
        } else {
          y = y < 50 ? Math.random() * 20 : 80 + Math.random() * 20;
        }
      }

      const sparkleIndex = Math.floor(Math.random() * 7);
      const isBigSparkle =
        sparkleIndex === 0 || sparkleIndex === 5 || sparkleIndex === 6;
      const size = isBigSparkle
        ? 18 + Math.random() * 6
        : 6 + Math.random() * 2;

      return {
        index,
        sparkleIndex,
        x,
        y,
        size,
        floatDuration: 2 + Math.random() * 3,
        twinkleDuration: 0.3 + Math.random(),
        delay: Math.random() * 3,
      };
    }),
  );

  useImperativeHandle(ref, () => ({
    intensify: () => {
      sparklesRef.current.forEach((sparkle, index) => {
        if (!sparkle) return;
        const position = sparklePositions[index];

        gsap.to(sparkle, {
          opacity: 0.6 + Math.random() * 0.3,
          duration: position.twinkleDuration,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          overwrite: true,
        });
      });
    },
    calm: () => {
      sparklesRef.current.forEach((sparkle, index) => {
        if (!sparkle) return;
        const position = sparklePositions[index];

        gsap.to(sparkle, {
          opacity: 0.05 + Math.random() * 0.35,
          duration: position.twinkleDuration,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          overwrite: true,
        });
      });
    },
  }));

  useEffect(() => {
    sparklesRef.current.forEach((sparkle, index) => {
      if (!sparkle) return;

      const position = sparklePositions[index];

      gsap.to(sparkle, {
        y: "+=8",
        duration: position.floatDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: position.delay,
      });

      gsap.to(sparkle, {
        opacity: 0.05 + Math.random() * 0.35,
        duration: position.twinkleDuration,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: position.delay * 0.5,
      });
    });

    return () => {
      sparklesRef.current.forEach((sparkle) => {
        if (sparkle) gsap.killTweensOf(sparkle);
      });
    };
  }, [sparklePositions]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {sparklePositions.map((sparkle) => (
        <img
          key={sparkle.index}
          ref={(el) => {
            sparklesRef.current[sparkle.index] = el;
          }}
          src={sparkleImages[sparkle.sparkleIndex]}
          alt=""
          className="absolute opacity-10"
          style={{
            left: `${sparkle.x}vw`,
            top: `${sparkle.y}dvh`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
        />
      ))}
    </div>
  );
});
