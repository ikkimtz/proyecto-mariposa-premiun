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

      {/* Sobre cerrado/base */}
      <motion.div
        className="absolute inset-0 z-20"
        animate={{
          scale: isOpening ? [1, 1.015, 1.08] : 1,
          y: isOpening ? [0, -5, -16] : 0
        }}
        transition={{ duration: 2.8, ease: [0.2, 0.8, 0.2, 1] }}
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

      {/* 
        Carta:
        No se renderiza cuando el sobre está cerrado.
        Esto evita definitivamente que aparezca fuera del sobre en reposo.
      */}
      {isOpening && (
        <motion.div
          className="absolute left-1/2 top-[22px] z-30 h-[260px] w-[310px] -translate-x-1/2"
          initial={{
            opacity: 0,
            y: 230,
            rotate: 0,
            scale: 0.98
          }}
          animate={{
            opacity: [0, 0, 0.55, 1, 1],
            y: [230, 190, 122, 34, -52],
            rotate: [0, 0, -0.5, 1.1, -1.1],
            scale: [0.98, 0.98, 1, 1.02, 1.06]
          }}
          transition={{
            duration: 2.45,
            ease: [0.2, 0.8, 0.2, 1],
            times: [0, 0.3, 0.52, 0.76, 1]
          }}
        >
          <Image
            src="/assets/envelope/letter-card.svg"
            alt="Carta de invitación"
            fill
            priority
            className="object-contain select-none"
            draggable={false}
          />
        </motion.div>
      )}

      {/* Frente del sobre encima de la carta para mantener la ilusión de salida */}
      <motion.div
        className="absolute inset-0 z-40 pointer-events-none"
        animate={{
          scale: isOpening ? [1, 1.015, 1.08] : 1,
          y: isOpening ? [0, -5, -16] : 0
        }}
        transition={{ duration: 2.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Image
          src="/assets/envelope/envelope-base.svg"
          alt=""
          fill
          priority
          className="object-contain select-none"
          draggable={false}
        />
      </motion.div>

      {/* Solapa */}
      <motion.div
        className="absolute inset-0 z-50"
        animate={{
          rotateX: isOpening ? 178 : 0,
          y: isOpening ? -8 : 0,
          opacity: isOpening ? [1, 1, 0.78] : 1
        }}
        transition={{
          duration: 1.22,
          delay: isOpening ? 0.75 : 0,
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

      {/* Sello */}
      <motion.div
        className="absolute left-1/2 top-[178px] z-[60] h-[118px] w-[118px] -translate-x-1/2"
        animate={{
          scale: isOpening ? [1, 1.08, 1, 0.72, 0.12] : [1, 1.035, 1],
          opacity: isOpening ? [1, 1, 1, 0.68, 0] : 1,
          rotate: isOpening ? [0, -6, 10, 22, 40] : 0,
          x: isOpening ? [0, 0, 18, 32, 48] : 0,
          y: isOpening ? [0, 0, -18, 16, 48] : 0
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

      <Image
        src="/assets/florals/floral-left.svg"
        alt=""
        width={145}
        height={145}
        className="pointer-events-none absolute left-[-4px] top-[20px] z-[70] select-none"
        draggable={false}
      />

      <Image
        src="/assets/florals/floral-right.svg"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute right-[-10px] top-[18px] z-[70] select-none"
        draggable={false}
      />

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
      className={`absolute top-[150px] z-[80] h-[46px] w-[54px] opacity-0 ${
        leftSide ? "left-[88px]" : "right-[88px]"
      }`}
      animate={{
        opacity: isOpening ? [0, 0, 1, 1, 0] : 0,
        y: isOpening ? [0, 0, -28, -88, -146] : 0,
        x: isOpening
          ? [0, 0, leftSide ? -22 : 22, leftSide ? -92 : 92, leftSide ? -152 : 152]
          : 0,
        rotate: isOpening
          ? [0, 0, leftSide ? -12 : 14, leftSide ? -30 : 32, leftSide ? -42 : 46]
          : 0
      }}
      transition={{
        duration: 1.85,
        delay: leftSide ? 1.1 : 1.18
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
