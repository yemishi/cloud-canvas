const parseToCelsius = (temp: number) => {
  const result = temp - 273.15;
  return `${parseInt(String(result))}`;
};

const parseLocalTime = (value: number): string => {
  const currentTime = new Date(value);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || "00";

  const formattedTime = `${formattedHours}:${String(minutes).padStart(2, "0")}`;

  return `${formattedTime} ${period}`;
};

const formattedInfo = (element: string, value: number, timezone: number) => {
  switch (element) {
    case "clouds":
      return `${value}%`;
    case "pressure":
      return `${value} hPa`;
    case "sunset":
    case "sunrise":
      return `${parseLocalTime(value + timezone)}`;
    case "timezone":
      return `UTC: ${value / 3600}`;
    default:
      break;
  }
};

const formattedAirInfo = (element: string, value: number): string => {
  switch (element) {
    case "deg":
      return `${value}°`;

    case "feelsLike":
      return `${parseToCelsius(value)}°c`;

    case "gust":
      return `${value.toFixed(1)}m/s`;
    case "humidity":
      return `${value}%`;

    case "speed":
      return `${value.toFixed(1)}m/s`;
    case "seaLevel":
      return `${value}hPa`;
    default:
      return "";
  }
};

export { formattedInfo, parseLocalTime, parseToCelsius, formattedAirInfo };
