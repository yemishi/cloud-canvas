"use server";

import { WeatherIcon, WeatherInfoType } from "@/types";
import { parseLocalTime, parseToCelsius } from "@/utils/index";
import NotFoundLocation from "@/components/ui/NotFoundLocation";
import DeskViewPage from "./(largeView)/DeskViewPage";
import MobViewPage from "./(smallView)/MobViewPage";

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
  const weather: WeatherType = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.API_KEY}&q=${decodeURI(
      location
    )}&_=${Date.now()}`
  ).then((res) => res.json());
  return weather;
}

export default async function Page({
  params: { location }
}: {
  params: { location: string };
}) {
  const data = await getData(location);

  if (data.cod !== 200) return <NotFoundLocation />;
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
    gust,
    deg,
    humidity,
    feelsLike: feels_like,
    seaLevel: sea_level
  };

  const multiInfo = {
    clouds: { value: clouds.all, enable: true },
    pressure: { value: pressure, enable: true },
    timezone: { value: timezone, enable: true },
    sunrise: { value: sunrise, enable: true },
    sunset: { value: sunset, enable: true }
  };

  const weatherInfo: WeatherInfoType = {
    multiInfo,
    airInfo,
    description,
    feelsLike: parseToCelsius(feels_like),
    temp: parseToCelsius(temp),
    tempMax: parseToCelsius(temp_max),
    tempMin: parseToCelsius(temp_min),
    placeName: name,
    country,
    humidity,
    icon,
    currTime: parseLocalTime(dt + timezone)
  };

  return (
    <div
      style={{
        background: `url(./backgrounds/${icon}.jpg)`
      }}
      className={`!bg-cover !bg-center !bg-no-repeat min-h-full flex`}
    >
      <MobViewPage {...weatherInfo} />
      <DeskViewPage {...weatherInfo} />
    </div>
  );
}
