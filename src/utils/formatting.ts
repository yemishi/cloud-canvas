export const parseToCelsius = (temp: number) => {
  const result = temp - 273.15;
  return `${parseInt(String(result))}`;
};

export const parseLocalTime = (value: number): string => {
  const currentTime = new Date(value * 1000);
  return `${currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  })}
    ${Number(currentTime.getHours()) > 12 ? "PM" : "AM"}`;
};
