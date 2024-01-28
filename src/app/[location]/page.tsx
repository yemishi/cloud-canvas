"use server";
import BubbleIcon from "../components/icon/bubbleIcon";
import { WeatherIcon } from "@/types";
import { parseLocalTime, parseToCelsius } from "@/utils/index";
import AirInfo from "./airInfo";
import MultiInfo from "./multiInfo";

type WeatherType = {
  name: string;
  weather: [
    {
      main: string;
      description: string;
      icon: WeatherIcon;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    sea_level?: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  cod: 404 | 200;
  dt: number;
  clouds: { all: number };
  timezone: number;
};

async function getData(location: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.API_KEY}&q=${decodeURIComponent(
      location
    )}&_=${Date.now()}`
  );
  const weather: WeatherType = await res.json();

  return weather;
}

export default async function Page({
  params
}: {
  params: { location: string };
}) {
  const { location } = params;
  const data = await getData(location);

  if (data.cod !== 200) return <div>Not found</div>;
  const { main, name, weather, wind, sys, dt, clouds, timezone } = data;

  const { icon, description } = weather[0];
  const { deg, gust, speed } = wind;
  const {
    feels_like,
    humidity,
    pressure,
    temp,
    temp_max,
    temp_min,

    sea_level
  } = main;
  const { country, sunrise, sunset } = sys;

  const airInfo = {
    speed,
    gust: gust || 0,
    deg,
    humidity,
    feels_like,
    sea_level: sea_level || 0
  };

  const multiInfo = {
    clouds: { value: clouds.all, enable: true },
    pressure: { value: pressure, enable: true },
    timezone: { value: timezone, enable: true },
    sunrise: { value: sunrise, enable: true },
    sunset: { value: sunset, enable: true }
  };

  return (
    <div
      style={{
        background: `url(./backgrounds/${icon.replace(/1[01]/, "09")}.jpg)`
      }}
      className={`!bg-cover !bg-center !bg-no-repeat min-h-full flex`}
    >
      <div className="w-full min-h-full pb-20 bg-black  bg-opacity-40 flex flex-col items-center gap-7 p-2 ">
        <span className="text-end font-thin self-end font-lato backdrop-blur">
          <p className="text-sm">Last update</p>
          <p className="text-lg">{parseLocalTime(dt + timezone)}</p>
        </span>

        <span className="flex w-full justify-between px-3 mb-4 items-start">
          <BubbleIcon
            description={`${parseToCelsius(feels_like)}`}
            title="feels like"
          >
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#ffff"
                d="m26 30h-4a2.0059 2.0059 0 0 1 -2-2v-7a2.0059 2.0059 0 0 1 -2-2v-6a2.9465 2.9465 0 0 1 3-3h6a2.9465 2.9465 0 0 1 3 3v6a2.0059 2.0059 0 0 1 -2 2v7a2.0059 2.0059 0 0 1 -2 2zm-5-18a.9448.9448 0 0 0 -1 1v6h2v9h4v-9h2v-6a.9448.9448 0 0 0 -1-1z"
              />
              <path
                fill="#ffff"
                d="m24 9a4 4 0 1 1 4-4 4.0118 4.0118 0 0 1 -4 4zm0-6a2 2 0 1 0 2 2 2.0059 2.0059 0 0 0 -2-2z"
              />
              <path
                fill="#ffff"
                d="m10 20.1839v-8.1839h-2v8.1839a3 3 0 1 0 2 0z"
              />
              <path
                fill="#ffff"
                d="m9 30a6.9931 6.9931 0 0 1 -5-11.8892v-11.1108a5 5 0 0 1 10 0v11.1108a6.9931 6.9931 0 0 1 -5 11.8892zm0-26a3.0033 3.0033 0 0 0 -3 3v11.9834l-.332.2983a5 5 0 1 0 6.664 0l-.332-.2983v-11.9834a3.0033 3.0033 0 0 0 -3-3z"
              />
              <path d="m0 0h32v32h-32z" fill="none" />
            </svg>
          </BubbleIcon>

          <span
            className="flex p-4 rounded-3xl    backdrop-blur  flex-col text-center font-montserrat gap-2
            "
          >
            <p className="text-white">{description}</p>

            <h1 className="text-7xl after:content-['°C']  after:font-semibold after:absolute after:text-xl">
              {parseToCelsius(temp)}
            </h1>

            <span className="flex self-center gap-4 font-lato">
              <p className={""}>H {parseToCelsius(temp_max)}°</p>
              <p className={""}>L {parseToCelsius(temp_min)}°</p>
            </span>

            <p className="text-white">
              {name} - {country}
            </p>
          </span>

          <BubbleIcon description={`${humidity}%`} title="humidity">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier"></g>
              <g id="SVGRepo_tracerCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M20 14.5714C20 18.7526 16.3364 22 12 22C7.66359 22 4 18.7526 4 14.5714C4 12 5.30472 9.45232 6.71637 7.42349C8.1468 5.36767 9.79177 3.69743 10.6777 2.85537M20 14.5714L10.6777 2.85537M20 14.5714C20 12 18.6953 9.45232 17.2836 7.42349C15.8532 5.36767 14.2082 3.69743 13.3223 2.85537C12.5778 2.14778 11.4222 2.14778 10.6777 2.85537M20 14.5714L10.6777 2.85537"
                  stroke="#ffffff"
                ></path>
                <path
                  d="M12 18C11.4747 18 10.9546 17.8965 10.4693 17.6955C9.98396 17.4945 9.54301 17.1999 9.17157 16.8284C8.80014 16.457 8.5055 16.016 8.30448 15.5307C8.10346 15.0454 8 14.5253 8 14"
                  stroke="#ffffff"
                ></path>
              </g>
            </svg>
          </BubbleIcon>
        </span>

        <AirInfo {...airInfo} />


        <MultiInfo {...multiInfo} />
      </div>
    </div>
  );
}
