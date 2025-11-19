import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

// Import illustrations (excluding Bros, Island, and sparkles which are used elsewhere)
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

export const FloatingIllustrations = () => {
  const illustrationsRef = useRef<(HTMLImageElement | null)[]>([]);

  // Use lazy state initializer for random positions (fresh on each reload)
  const [floatingItems] = useState(() => {
    const centerX = 50;
    const centerY = 50;

    return illustrations.map((src, index) => {
      // Random position (avoiding center where island is)
      let x = Math.random() * 100;
      let y = Math.random() * 100;

      // Push items away from center (35-65% x, 25-75% y)
      if (x > 35 && x < 65 && y > 25 && y < 75) {
        // If in center zone, push to edges
        if (Math.random() > 0.5) {
          x = x < 50 ? Math.random() * 30 : 70 + Math.random() * 30;
        } else {
          y = y < 50 ? Math.random() * 20 : 80 + Math.random() * 20;
        }
      }

      // Calculate angle and radius from center
      const dx = x - centerX;
      const dy = y - centerY;
      const radius = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Check illustration size category
      const isExtraBig = src === venus || src === palmTree;
      const isBig = src === plant || src === unicycle;

      // Random size with appropriate minimums
      const size = isExtraBig
        ? 180 + Math.random() * 80  // Extra big items: 180-260px
        : isBig
        ? 120 + Math.random() * 80  // Big items: 120-200px
        : 80 + Math.random() * 80;   // Regular items: 80-160px

      // Random rotation
      const rotation = -20 + Math.random() * 40; // -20 to 20 degrees

      // Orbit duration (slower for items further from center)
      const orbitDuration = 30 + Math.random() * 40; // 30-70s

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

  useEffect(() => {
    illustrationsRef.current.forEach((illustration, index) => {
      if (!illustration) return;

      const item = floatingItems[index];

      // Orbit animation - rotate around center by updating position
      gsap.to(
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
            illustration.style.top = `${y}vh`;
          },
        }
      );
    });
  }, [floatingItems]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5]">
      {floatingItems.map((item, index) => {
        // Calculate initial position based on angle and radius
        const x = item.centerX + item.radius * Math.cos(item.angle * (Math.PI / 180));
        const y = item.centerY + item.radius * Math.sin(item.angle * (Math.PI / 180));

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
              top: `${y}vh`,
              width: `${item.size}px`,
              height: "auto",
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};
