import { useRef } from "react";
import { PortfolioList } from "../PortfolioList";
import { RoamingLamp } from "../RoamingLamp";
import type { RoamingLampHandle } from "../RoamingLamp";
import { Loading } from "../Loading";
import { useLandingAnimations } from "./useLandingAnimations";
import brosSvg from "/assets/illustrations/Bros.svg";

const LOGO_URL = "https://assets.loscolmebrothers.com/logo/landscape/vector.svg";

export const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const portfolioRef = useRef<HTMLUListElement>(null);
  const brosRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<RoamingLampHandle>(null);

  const handleLampClick = () => {
    window.location.hash = "page-2";
  };

  const { startEntrance } = useLandingAnimations({
    containerRef,
    logoRef,
    portfolioRef,
    brosRef,
    lampRef,
  });

  return (
    <>
      <RoamingLamp ref={lampRef} onLampClick={handleLampClick} />

      <Loading duration={2200} onFinish={startEntrance} />

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
