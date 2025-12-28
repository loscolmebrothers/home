import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { gsap } from "gsap";

import amplifier from "/assets/illustrations/Amplifier.svg";
import bottle from "/assets/illustrations/Bottle.svg";
import cap from "/assets/illustrations/Cap.svg";
import cd from "/assets/illustrations/CD.svg";
import coffee from "/assets/illustrations/Coffee.svg";
import cup from "/assets/illustrations/Cup.svg";
import dice from "/assets/illustrations/Dice.svg";
import drum from "/assets/illustrations/Drum.svg";
import flower from "/assets/illustrations/Flower.svg";
import glove from "/assets/illustrations/Glove.svg";
import guitar from "/assets/illustrations/Guitar.svg";
import headset from "/assets/illustrations/Headset.svg";
import lamp from "/assets/illustrations/Lamp.svg";
import masterSword from "/assets/illustrations/MasterSword.svg";
import monaLisa from "/assets/illustrations/MonaLisa.svg";
import monitor from "/assets/illustrations/Monitor.svg";
import mouse from "/assets/illustrations/Mouse.svg";
import nintendoSwitch from "/assets/illustrations/NintendoSwitch.svg";
import palmTree from "/assets/illustrations/PalmTree.svg";
import pawn from "/assets/illustrations/Pawn.svg";
import pencil from "/assets/illustrations/Pencil.svg";
import plant from "/assets/illustrations/Plant.svg";
import playstationController from "/assets/illustrations/PlaystationController.svg";
import pokeball from "/assets/illustrations/Pokeball.svg";
import starryNight from "/assets/illustrations/StarryNight.svg";
import tattooMachine from "/assets/illustrations/TattooMachine.svg";
import ticket from "/assets/illustrations/Ticket.svg";
import trumpet from "/assets/illustrations/Trumpet.svg";
import unicycle from "/assets/illustrations/Unicycle.svg";
import unoReverseCard from "/assets/illustrations/UNOReverseCard.svg";
import venus from "/assets/illustrations/Venus.svg";

const illustrations = [
  amplifier,
  bottle,
  cap,
  cd,
  coffee,
  cup,
  dice,
  drum,
  flower,
  glove,
  guitar,
  headset,
  lamp,
  masterSword,
  monaLisa,
  monitor,
  mouse,
  nintendoSwitch,
  palmTree,
  pawn,
  pencil,
  plant,
  playstationController,
  pokeball,
  starryNight,
  tattooMachine,
  ticket,
  trumpet,
  unicycle,
  unoReverseCard,
  venus,
];

export type FloatingIllustrationsHandle = {
  fadeOut: () => void;
  fadeIn: () => void;
};

export const FloatingIllustrations = forwardRef<FloatingIllustrationsHandle>(
  (_, ref) => {
    const illustrationsRef = useRef<(HTMLImageElement | null)[]>([]);

    const [floatingItems] = useState(() => {
      const centerX = 50;
      const centerY = 50;

      return illustrations.map((src, index) => {
        const angle = Math.random() * 360;
        const minRadius = 40 + Math.random() * 20;
        const radius = minRadius;

        const isExtraBig = src === venus || src === palmTree;
        const isBig = src === plant || src === unicycle;

        const size = isExtraBig
          ? 180 + Math.random() * 80
          : isBig
            ? 120 + Math.random() * 80
            : 80 + Math.random() * 80;

        const rotation = -20 + Math.random() * 40;
        const orbitDuration = 30 + Math.random() * 40;

        return {
          src,
          centerX,
          centerY,
          radius,
          angle,
          size,
          rotation,
          orbitDuration,
          index,
        };
      });
    });

    useImperativeHandle(ref, () => ({
      fadeOut: () => {
        illustrationsRef.current.forEach((illustration) => {
          if (!illustration) return;
          gsap.to(illustration, {
            opacity: 0.2,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      },
      fadeIn: () => {
        illustrationsRef.current.forEach((illustration) => {
          if (!illustration) return;
          gsap.to(illustration, {
            opacity: 0.6,
            duration: 0.6,
            ease: "power2.inOut",
          });
        });
      },
    }));

    useEffect(() => {
      const tweens: gsap.core.Tween[] = [];

      illustrationsRef.current.forEach((illustration, index) => {
        if (!illustration) return;

        const item = floatingItems[index];

        const tween = gsap.to(
          { angle: item.angle },
          {
            angle: item.angle + 360,
            duration: item.orbitDuration,
            repeat: -1,
            ease: "none",
            onUpdate: function () {
              if (!illustration) return;
              const currentAngle = this.targets()[0].angle;
              const radians = currentAngle * (Math.PI / 180);
              const x = item.centerX + item.radius * Math.cos(radians);
              const y = item.centerY + item.radius * Math.sin(radians);

              illustration.style.left = `${x}vw`;
              illustration.style.top = `${y}dvh`;
            },
          },
        );
        tweens.push(tween);
      });

      return () => {
        tweens.forEach((tween) => tween.kill());
        illustrationsRef.current.forEach((illustration) => {
          if (illustration) gsap.killTweensOf(illustration);
        });
      };
    }, [floatingItems]);

    return (
      <div className="fixed inset-0 pointer-events-none z-[5]">
        {floatingItems.map((item, index) => {
          const x =
            item.centerX + item.radius * Math.cos(item.angle * (Math.PI / 180));
          const y =
            item.centerY + item.radius * Math.sin(item.angle * (Math.PI / 180));

          return (
            <img
              key={item.index}
              ref={(el) => {
                illustrationsRef.current[index] = el;
              }}
              src={item.src}
              alt=""
              className="absolute opacity-60"
              style={{
                left: `${x}vw`,
                top: `${y}dvh`,
                width: `${item.size}px`,
                height: "auto",
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
              }}
            />
          );
        })}
      </div>
    );
  },
);
