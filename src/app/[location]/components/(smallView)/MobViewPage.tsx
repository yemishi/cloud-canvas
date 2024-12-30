"use client";
import BubbleIcon from "@/components/ui/bubbleIcon";
import { WeatherInfoType } from "@/types";
import { IoWaterOutline } from "react-icons/io5";
import { TbTemperatureSun } from "react-icons/tb";
import MultiInfo from "./multiInfo";
import AirInfo from "./airInfoMob";

export default function MobViewPage({
  airInfo,
  country,
  description,
  feelsLike,
  humidity,
  icon,
  multiInfo,
  placeName,
  temp,
  tempMax,
  currTime,
  tempMin
}: WeatherInfoType) {
  return (
    <div className="w-full h-full overflow-auto pb-20 bg-black bg-opacity-40 flex flex-col items-center gap-7 p-2">
      <span className="text-end font-thin self-end font-lato backdrop-blur">
        <span className="text-base font-medium">{currTime}</span>
      </span>

      <span className="flex w-full justify-between px-3 mb-4 items-start">
        <BubbleIcon description={`${feelsLike}`} title="feels like">
          <TbTemperatureSun className="w-full h-full" />
        </BubbleIcon>

        <span className="flex p-4 rounded-3xl backdrop-blur flex-col text-center font-montserrat gap-2">
          <h1 className="text-white">{description}</h1>

          <span className="text-7xl after:content-['°C'] after:font-semibold after:absolute after:text-xl">
            {temp}
          </span>

          <span className="flex self-center gap-4 font-lato">
            <p>H {tempMax}°</p>
            <p>L {tempMin}°</p>
          </span>

          <p className="text-white">
            {placeName} - {country}
          </p>
        </span>

        <BubbleIcon description={`${humidity}%`} title="humidity">
          <IoWaterOutline className="w-full h-full" />
        </BubbleIcon>
      </span>

      <AirInfo airInfo={airInfo} />
      <img
        className="w-40 rounded-full backdrop-blur-sm"
        src={`./icons/${icon}.svg`}
        alt="weather icon"
      />
      <MultiInfo infoProps={multiInfo} />
    </div>
  );
}
