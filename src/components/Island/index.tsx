import { useRef, useState, type RefObject } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { SparkleEffect } from "./SparkleEffect";
import type { SparkleEffectHandle } from "./SparkleEffect";
import { useIslandAnimations } from "./useIslandAnimations";
import type { SparkleSystemHandle } from "../SparkleSystem";
import type { FloatingIllustrationsHandle } from "../FloatingIllustrations";
import islandSvg from "/assets/illustrations/Island.svg";
import brosSvg from "/assets/illustrations/Bros.svg";

interface IslandProps {
  sparkleSystemRef: RefObject<SparkleSystemHandle | null>;
  floatingIllustrationsRef: RefObject<FloatingIllustrationsHandle | null>;
}

export const Island = ({
  sparkleSystemRef,
  floatingIllustrationsRef,
}: IslandProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const islandRef = useRef<HTMLDivElement>(null);
  const brosRef = useRef<HTMLDivElement>(null);
  const balloonLogoRef = useRef<HTMLDivElement>(null);
  const losRef = useRef<HTMLImageElement>(null);
  const colmeRef = useRef<HTMLImageElement>(null);
  const brothersRef = useRef<HTMLImageElement>(null);
  const sparklesRef = useRef<SparkleEffectHandle>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useIslandAnimations({
    containerRef,
    islandRef,
    brosRef,
    balloonLogoRef,
    losRef,
    colmeRef,
    brothersRef,
    sparklesRef,
    sparkleSystemRef,
    floatingIllustrationsRef,
  });

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div
        ref={containerRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b"
      >
        <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              ref={islandRef}
              className="absolute left-1/2 -translate-x-1/2 w-[95%] min-w-[380px] max-w-[420px] opacity-0"
            >
              <img
                src={islandSvg}
                alt="Floating Island"
                className="w-full h-full object-contain object-bottom"
              />

              <div
                ref={balloonLogoRef}
                className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[60%] flex flex-col items-center gap-0.5 opacity-0 origin-bottom"
              >
                <img
                  ref={losRef}
                  src="https://assets.loscolmebrothers.com/logo/slices/vector/LOS.svg"
                  alt="LOS"
                  className="w-[30%] h-auto"
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

              <div
                ref={brosRef}
                className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[56%] opacity-0"
              >
                <img
                  src={brosSvg}
                  alt="Colme Brothers"
                  className="w-full h-auto object-contain"
                />
              </div>

              <SparkleEffect ref={sparklesRef} />
            </div>
          </div>
        </div>
      </div>
    </Dialog.Root>
  );
};
