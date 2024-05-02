"use client";
import { motion } from "framer-motion";

interface PropsType extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  icon: React.ReactNode;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  lgStatic?: boolean;
  position?: "right" | "left";
}

export default function DivToggle({
  icon,
  state,
  position = "left",
  lgStatic,
  children,
  setState,
  ...props
}: PropsType) {
  const isLeft = position === "left";
  const variant = {
    initial: {
      translateX: isLeft ? "-100vw" : "100vw",
      width: "44px",
      height: "44px"
    },
    close: {
      translateX: 0,
      width: "50px",
      height: "50px",
      borderRadius: "50px"
    },
    open: { translateX: 0, width: "100vw", height: "100vh", margin: 0 }
  };

  const { className, onClick } = props;

  return (
    <motion.div
      variants={variant}
      animate={state ? "open" : "close"}
      initial="initial"
      transition={{ duration: 0.1 }}
      onClick={(e) => {
        setState(!state), onClick && onClick(e);
      }}
      className={` ${className ? className : ""} ${lgStatic && !state ? "lg:static" : ""} bg-white text-black border-black
       fixed flex items-center justify-center overflow-x-hidden bg-opacity-50 p-2 ${!state && (isLeft ? "left-5" : "right-5")}  ${
         !state
           ? "bottom-5 hover:bg-opacity-35 active:bg-opacity-60 border border-white cursor-pointer  lg:!size-14"
           : isLeft
             ? "bottom-0 left-0 z-20"
             : "bottom-0 right-0 z-20"
       }`}
    >
      {state ? children : icon}
    </motion.div>
  );
}
