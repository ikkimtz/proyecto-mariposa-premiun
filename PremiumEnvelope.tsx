"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type PremiumEnvelopeProps = {
  isOpening: boolean;
  onOpen: () => void;
};

export function PremiumEnvelope({ isOpening, onOpen }: PremiumEnvelopeProps) {
  return (
    <button
      className="relative h-[370px] w-[430px] max-w-[98vw] border-0 bg-transparent p-0 outline-none"
      aria-label="Abrir invitación"
      onClick={onOpen}
    >
      <Image
        src="/assets/decorations/sparkles.svg"
        alt=""
        width={180}
        height={135}
        className="pointer-events-none absolute left-1/2 top-[-10px] z-0 -translate-x-1/2 select-none opacity-70"
        draggable={false}
      />

      <motion.div
        className="absolute inset-0 z-20"
        animate={{
          scale: isOpening ? [1, 1.015, 1.08] : 1,
          y: isOpening ? [0, -4, -14] : 0,
          opacity: isOpening ? [1, 1, 0.55, 0] : 1
        }}
        transition={{ duration: 1.65, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Image
          src="/assets/envelope/envelope-base.svg"
          alt="Sobre premium"
          fill
          priority
          className="object-contain select-none"
          draggable={false}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-30"
        animate={{
          rotateX: isOpening ? 178 : 0,
          y: isOpening ? -8 : 0,
          opacity: isOpening ? [1, 1, 0.35, 0] : 1
        }}
        transition={{
          duration: 1.35,
          delay: isOpening ? 0.28 : 0,
          ease: [0.2, 0.8, 0.2, 1]
        }}
        style={{ transformOrigin: "50% 66%" }}
      >
        <Image
          src="/assets/envelope/envelope-flap.svg"
          alt="Solapa del sobre"
          fill
          priority
          className="object-contain select-none"
          draggable={false}
        />
      </motion.div>

      {/* v2.0.4: centrado real. No usa -translate-x porque Framer Motion lo sobrescribe. */}
      <motion.div
        className="absolute top-[178px] z-40 h-[118px] w-[118px]"
        style={{ left: "calc(50% - 59px)" }}
        animate={{
          scale: isOpening ? [1, 1.08, 0.78, 0.18] : [1, 1.035, 1],
          opacity: isOpening ? [1, 1, 0.55, 0] : 1,
          rotate: isOpening ? [0, -6, 18, 38] : 0,
          x: isOpening ? [0, 0, 24, 48] : 0,
          y: isOpening ? [0, -12, 18, 44] : 0
        }}
        transition={{
          duration: isOpening ? 1.05 : 2.8,
          repeat: isOpening ? 0 : Infinity,
          ease: "easeInOut"
        }}
      >
        <Image
          src="/assets/envelope/wax-seal.svg"
          alt="Sello J&C"
          fill
          priority
          className="object-contain select-none"
          draggable={false}
        />
      </motion.div>

      <motion.div
        animate={{ opacity: isOpening ? [1, 1, 0] : 1, y: isOpening ? [0, -8, -18] : 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
      >
        <Image
          src="/assets/florals/floral-left.svg"
          alt=""
          width={145}
          height={145}
          className="pointer-events-none absolute left-[-4px] top-[20px] z-50 select-none"
          draggable={false}
        />

        <Image
          src="/assets/florals/floral-right.svg"
          alt=""
          width={150}
          height={150}
          className="pointer-events-none absolute right-[-10px] top-[18px] z-50 select-none"
          draggable={false}
        />
      </motion.div>

      <BurstButterfly isOpening={isOpening} side="left" />
      <BurstButterfly isOpening={isOpening} side="right" gold />
    </button>
  );
}

function BurstButterfly({
  isOpening,
  side,
  gold = false
}: {
  isOpening: boolean;
  side: "left" | "right";
  gold?: boolean;
}) {
  const leftSide = side === "left";

  return (
    <motion.span
      className={`absolute top-[150px] z-[70] h-[46px] w-[54px] opacity-0 ${
        leftSide ? "left-[88px]" : "right-[88px]"
      }`}
      animate={{
        opacity: isOpening ? [0, 0.2, 1, 1, 0] : 0,
        y: isOpening ? [0, -14, -48, -104, -154] : 0,
        x: isOpening
          ? [0, leftSide ? -10 : 10, leftSide ? -42 : 42, leftSide ? -108 : 108, leftSide ? -164 : 164]
          : 0,
        rotate: isOpening
          ? [0, leftSide ? -8 : 8, leftSide ? -18 : 20, leftSide ? -34 : 36, leftSide ? -46 : 48]
          : 0
      }}
      transition={{
        duration: 1.85,
        delay: leftSide ? 0.55 : 0.68
      }}
    >
      <Image
        src={gold ? "/assets/butterflies/butterfly-gold.svg" : "/assets/butterflies/butterfly-coral.svg"}
        alt=""
        fill
        className="object-contain"
        draggable={false}
      />
    </motion.span>
  );
}
