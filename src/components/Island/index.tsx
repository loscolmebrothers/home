import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Island = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const islandRef = useRef<HTMLDivElement>(null);
  const brosRef = useRef<HTMLImageElement>(null);
  const balloonLogoRef = useRef<HTMLDivElement>(null);
  const losRef = useRef<HTMLImageElement>(null);
  const colmeRef = useRef<HTMLImageElement>(null);
  const brothersRef = useRef<HTMLImageElement>(null);

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
            opacity: 0,
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
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b"
    >
      <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            ref={islandRef}
            className="absolute  left-1/2 -translate-x-1/2 w-[95%] min-w-[400px] max-w-[460px] opacity-00"
          >
            <img
              src="/assets/illustrations/Island.svg"
              alt="Floating Island"
              className="w-full h-full object-contain object-bottom"
            />
          </div>

          {/* Bros - standing on island */}
          <div
            ref={brosRef}
            className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[25%] min-w-[80px] opacity-0 pointer-events-none"
            style={{ maxWidth: "180px" }}
          >
            <img
              src="/assets/illustrations/Bros.svg"
              alt="Colme Brothers"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Balloon with Logo - floating above */}
          <div
            ref={balloonLogoRef}
            className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[35%] min-w-[120px] flex flex-col items-center gap-1 opacity-0"
            style={{
              transformOrigin: "center bottom",
              maxWidth: "220px",
            }}
          >
            <img
              ref={losRef}
              src="https://assets.loscolmebrothers.com/logo/slices/vector/LOS.svg"
              alt="LOS"
              className="w-full h-auto"
            />
            <img
              ref={colmeRef}
              src="https://assets.loscolmebrothers.com/logo/slices/vector/COLME.svg"
              alt="COLME"
              className="w-full h-auto"
            />
            <img
              ref={brothersRef}
              src="https://assets.loscolmebrothers.com/logo/slices/vector/BROTHERS.svg"
              alt="BROTHERS"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
