"use client";
import { motion } from "framer-motion";

type PropsType = {
  children: React.ReactNode;
  icon: React.ReactNode;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  position?: "right" | "left";
  onChange?: () => void;
};

export default function DivToggle({
  position = "left",
  children,
  icon,
  setState,
  state,
  onChange
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
  const handleDiv = () => {
    setState(!state), onChange && onChange();
  };

  return (
    <motion.div 
      variants={variant}
      animate={state ? "open" : "close"}
      initial="initial"
      transition={{duration:0.2}}
      onClick={handleDiv}
      className={`fixed flex items-center justify-center overflow-hidden
      backdrop-blur-md p-2 ${!state && (isLeft ? "left-5" : "right-5")}  ${
        !state
          ? "bottom-5  hover:backdrop-brightness-200"
          : isLeft
          ? "bottom-0 left-0 z-20"
          : "bottom-0 right-0 z-20"
      } backdrop-brightness-150 border-white  border-opacity-70`}
    >
      {state ? children : icon}
    </motion.div>
  );
}
