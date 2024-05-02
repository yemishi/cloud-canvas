type WeatherIcon =
  | "01d"
  | "02d"
  | "03d"
  | "04d"
  | "09d"
  | "10d"
  | "11d"
  | "13d"
  | "50d"
  | "01n"
  | "02n"
  | "03n"
  | "04n"
  | "09n"
  | "10n"
  | "11n"
  | "13n"
  | "50n";

interface MultiInfoProps {
  clouds: { value: number; enable: boolean };
  pressure: { value: number; enable: boolean };
  timezone: { value: number; enable: boolean };
  sunrise: { value: number; enable: boolean };
  sunset: { value: number; enable: boolean };
}
interface AirInfoType {
  speed: number;
  deg: number;
  humidity: number;
  feelsLike: number;
  gust?: number;
  seaLevel?: number;
}
interface WeatherInfoType {
  country: string;
  description: string;
  feelsLike: string;
  temp: string;
  tempMax: string;
  tempMin: string;
  placeName: string;
  icon: WeatherIcon;
  humidity: number;
  currTime: string;
  multiInfo: MultiInfoProps;
  airInfo: AirInfoType;
}

export type { WeatherIcon, MultiInfoProps, WeatherInfoType, AirInfoType };
