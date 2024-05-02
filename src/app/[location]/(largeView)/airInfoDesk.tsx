import { AirInfoType } from "@/types";
import { formattedAirInfo } from "@/utils/formatting";
import { motion } from "framer-motion";
export default function AirInfoDesk({ airInfo }: { airInfo: AirInfoType }) {
  return (
    <div className="w-full flex gap-5 mt-auto justify-between text-3xl">
      {Object.keys(airInfo).length > 0 &&
        Object.keys(airInfo).map((key, index) => {
          const title: keyof AirInfoType = key as keyof AirInfoType;
          const element = airInfo[title];
          return (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: `0.${index +1}` }}
              key={`${key}_${index}`}
              className="bg-white text-black border-white border border-opacity-50 
              bg-opacity-50 flex flex-col gap-6 items-center font-lato w-44 py-14 rounded-lg backdrop-blur"
            >
              <span className="font-bold">
                {element ? formattedAirInfo(title, element) : "???"}
              </span>
              <span className="font-semibold first-letter:uppercase opacity-75">
                {title.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </span>
            </motion.div>
          );
        })}
    </div>
  );
}
