"use client";

import GetLocation from "@/components/location/getLocation";
import { WeatherInfoType } from "@/types";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import AirInfoDesk from "./airInfoDesk";
import { useRouter } from "next/navigation";
import MultiInfo from "../(smallView)/multiInfo";

export default function DeskViewPage({
  airInfo,
  country,
  currTime,
  description,
  icon,
  multiInfo,
  placeName,
  temp,
  tempMax,
  tempMin
}: WeatherInfoType) {
  const [{ error, location, message }, setLocation] = useState<{
    message?: string;
    error?: boolean;
    location?: string;
  }>({
    message: "",
    error: false,
    location: ""
  });
  const { push } = useRouter();
  return (
    <div className="flex w-full min-h-full overflow-auto bg-black bg-opacity-40 gap-16 flex-col items-center  px-10 pb-11">
      <form
        onSubmit={(e) => {
          e.preventDefault(), push(encodeURI(String(location)));
        }}
        className="w-full max-w-2xl h-14 flex items-center gap-2"
      >
        <span className="relative flex flex-col w-full h-full rounded-b-xl text-2xl">
          <input
            placeholder="Somewhere"
            type="text"
            name="location"
            value={location}
            onChange={(e) =>
              setLocation({
                error: false,
                location: e.target.value,
                message: ""
              })
            }
            className="bg-white text-white border-white bg-opacity-50 border-opacity-50  w-full h-full relative p-4 pr-12  placeholder:text-white placeholder:text-opacity-75 
             duration-200 hover:bg-opacity-40 outline-none rounded-b-lg border border-t-0  focus:border-opacity-100"
          />
          <button
            type="submit"
            className={`${location ? "cursor-pointer text-opacity-100" : "pointer-events-none text-opacity-50"} absolute top-0 right-3 h-full
            w-7 text-white hover:text-opacity-65`}
          >
            <FaMagnifyingGlass className="h-full w-full" />
          </button>
          {error && <span className="self-center text-red-400">{message}</span>}
        </span>
        <GetLocation
          className="h-14 p-2 rounded-none rounded-b-lg border border-t-0 border-white border-opacity-50 bg-white bg-opacity-50 hover:bg-opacity-40"
          setResponse={setLocation}
        />
      </form>

      <span className="absolute right-3 top-4 text-2xl font-semibold">
        {currTime}
      </span>
      <span className="absolute left-3 top-4 text-2xl font-semibold">
        {placeName}-{country}
      </span>

      <div className="self-start flex items-center gap-5 backdrop-blur mb-8">
        <img
          className="w-44 rounded-full backdrop-blur-sm"
          src={`./icons/${icon}.svg`}
          alt=""
        />

        <div className="flex flex-col gap-2  ">
          <div className="flex gap-8 text-7xl relative font-montserrat">
            <span className="after:content-['°C'] after:font-semibold after:absolute after:text-xl">
              {temp}
            </span>
            <h1 className="first-letter:uppercase">{description}</h1>
          </div>

          <span className="flex self-start gap-4 font-lato text-3xl font-bold ml-2">
            <p>H-{tempMax}°</p>
            <p>L-{tempMin}°</p>
          </span>
        </div>
      </div>
      <MultiInfo infoProps={multiInfo} />
      <AirInfoDesk airInfo={airInfo} />
    </div>
  );
}
