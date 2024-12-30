import { AirInfoType } from "@/types";
import { formattedAirInfo } from "@/utils/formatting";
import { motion } from "framer-motion";

export default function AirInfoDesk({ airInfo }: { airInfo: AirInfoType }) {
  return (
    <motion.div
      className="w-full flex gap-5 mt-auto justify-between text-3xl"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
      }}
    >
      {Object.keys(airInfo).length > 0 &&
        Object.keys(airInfo).map((key, index) => {
          const title: keyof AirInfoType = key as keyof AirInfoType;
          const element = airInfo[title];
          return (
            <motion.div
              key={`${key}_${index}`}
              className="bg-white text-black border-white border border-opacity-50 
              bg-opacity-50 flex flex-col gap-6 items-center font-lato w-44 py-14 rounded-lg backdrop-blur"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 + index * 0.1, ease: "easeOut" }}
              whileHover={{
                scale: 1.1,
                rotate: 2,
                backgroundColor: "rgba(255, 255, 255, 0.8)", transition: { duration: 0.4}
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="font-bold"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {element ? formattedAirInfo(title, element) : "???"}
              </motion.span>

              <motion.span
                className="font-semibold first-letter:uppercase opacity-75"
                animate={{ opacity: [0.7, 1, 0.7], color: ["#000", "#333", "#000"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {title.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </motion.span>

              <motion.div
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: [-1, 1, -1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
            </motion.div>
          );
        })}
    </motion.div>
  );
}
