"use client";
import { motion } from "framer-motion";

const variants = {
  hidden: {  x: 100, y: 0 },
  enter: {  x: 0, y: 0 }
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      exit="hidden"
      animate="enter"
      transition={{ type: "linear", duration: 0.25 }}
      key="LandingPage"
      className="w-full h-full"
    >
      {children}
    </motion.main>
  );
}
