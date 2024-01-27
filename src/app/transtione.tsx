"use client"
import { motion } from "framer-motion";

export default function Transition({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full h-screen bg-white origin-bottom"
      />
      <motion.div
        className="fixed top-0 left-0 w-full h-screen  bg-black origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
