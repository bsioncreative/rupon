import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

/* ─── Preset variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

const PRESETS = { fadeUp, fadeIn, fadeLeft, fadeRight, scaleUp } as const;

type PresetName = keyof typeof PRESETS;

/* ─── Single item wrapper ─── */
interface AnimateOnScrollProps {
  children: ReactNode;
  preset?: PresetName;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export function AnimateOnScroll({
  children,
  preset = "fadeUp",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  amount = 0.15,
}: AnimateOnScrollProps) {
  return (
    <motion.div
      variants={PRESETS[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Staggered container ─── */
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.1,
  once = true,
  amount = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger child (inherits parent animation trigger) ─── */
interface StaggerItemProps {
  children: ReactNode;
  preset?: PresetName;
  duration?: number;
  className?: string;
}

export function StaggerItem({
  children,
  preset = "fadeUp",
  duration = 0.5,
  className,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={PRESETS[preset]}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
