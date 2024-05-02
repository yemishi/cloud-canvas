"use client";

import { WiCloudyWindy } from "react-icons/wi";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { WiCloudyGusts } from "react-icons/wi";
import { FaWater } from "react-icons/fa";
import { FaSunPlantWilt } from "react-icons/fa6";
import { formattedAirInfo } from "@/utils/formatting";
import { AirInfoType } from "@/types";
import { motion } from "framer-motion";

interface PropsType {
  airInfo: AirInfoType;
}
export default async function AirInfoMob({ airInfo }: PropsType) {
  const iconsBundle = {
    speed: WiCloudyWindy,
    humidity: WiHumidity,
    deg: FaTemperatureEmpty,
    gust: WiCloudyGusts,
    seaLevel: FaWater,
    feelsLike: FaSunPlantWilt
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col bg-white text-black border-white p-3 rounded-[35px]  border-2
       border-opacity-20 bg-opacity-50 backdrop-blur "
    >
      <span className="flex items-center p-2 gap-1 font-merriWeather font-bold">
        <TiWeatherWindyCloudy className="size-16" />
        <p>Air Quality</p>
      </span>

      <div className="grid gap-x-7 gap-y-4 p-2 grid-cols-3 w-full">
        {Object.keys(airInfo).length > 0 &&
          Object.keys(airInfo).map((key, index) => {
            const title: keyof AirInfoType = key as keyof AirInfoType;
            const element = airInfo[title];
            const Icon = iconsBundle[title];
            return (
              <div
                key={`${key}_${index}`}
                className="flex gap-1 items-center font-lato text-sm"
              >
                <span className="w-8">
                  <Icon className="w-full h-full" />
                </span>
                <span className="flex flex-col">
                  <span className="text-base font-semibold">
                    {title.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </span>
                  <span className="font-bold">
                    {element ? formattedAirInfo(title, element) : "???"}
                  </span>
                </span>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
}
