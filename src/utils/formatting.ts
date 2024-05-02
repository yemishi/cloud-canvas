const parseToCelsius = (temp: number) => {
  const result = temp - 273.15;
  return `${parseInt(String(result))}`;
};

const parseLocalTime = (value: number): string => {
  const currentTime = new Date(value * 1000);
  return `${currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  })}
    ${Number(currentTime.getHours()) > 12 ? "PM" : "AM"}`;
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
