import { useRef, useState, useEffect } from "react";
import { PortfolioList } from "../PortfolioList";
import { RoamingLamp } from "../RoamingLamp";
import type { RoamingLampHandle } from "../RoamingLamp";
import { Loading } from "../Loading";
import { ContactOverlay } from "../ContactOverlay";
import { useLandingAnimations } from "./useLandingAnimations";
import brosSvg from "/assets/illustrations/Bros.svg";

const LOGO_URL = "https://assets.loscolmebrothers.com/logo/landscape/vector.svg";

export const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const portfolioRef = useRef<HTMLUListElement>(null);
  const brosRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<RoamingLampHandle>(null);

  const [page2, setPage2] = useState({ open: false, x: 0, y: 0 });

  const handleLampClick = (x: number, y: number) => {
    setPage2((prev) => ({ open: !prev.open, x, y }));
  };

  useEffect(() => {
    if (!page2.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const pos = lampRef.current?.getPosition() ?? { x: page2.x, y: page2.y };
        setPage2({ open: false, x: pos.x, y: pos.y });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page2.open]);

  const { startEntrance } = useLandingAnimations({
    containerRef,
    logoRef,
    portfolioRef,
    brosRef,
    lampRef,
  });

  return (
    <>
      <RoamingLamp ref={lampRef} onLampClick={handleLampClick} isOpen={page2.open} />

      <Loading duration={2200} onFinish={startEntrance} />

      <ContactOverlay open={page2.open} originX={page2.x} originY={page2.y} />

      <div
        ref={containerRef}
        className="relative w-full h-dvh flex flex-col items-center overflow-hidden"
      >
        <img
          ref={logoRef}
          src={LOGO_URL}
          alt="LOS COLMEBROTHERS logo"
          className="w-[90%] max-w-lg mt-[8vh] h-auto opacity-0"
        />

        <div className="mt-8">
          <PortfolioList ref={portfolioRef} />
        </div>

        <div
          ref={brosRef}
          className="absolute md:top-60 top-75 left-1/2 -translate-x-1/2 w-full max-w-[1100px] opacity-0"
        >
          <img
            src={brosSvg}
            alt="The bros themselves"
            className="w-full h-auto object-contain object-bottom"
          />
        </div>
      </div>
    </>
  );
};
