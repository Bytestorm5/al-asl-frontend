"use client";

import { motion } from "framer-motion";
import { ComponentProps, ReactNode } from "react";

export default function MotionDiv({
  children,
  className,
  ...props
}: ComponentProps<typeof motion.div>) {
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}
