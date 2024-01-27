import { MultiInfoProps } from "@/types";

export default class MultiInfoModel {
  #clouds: { value: number; enable: boolean };
  #pressure: { value: number; enable: boolean };
  #timezone: { value: number; enable: boolean };
  #sunrise: { value: number; enable: boolean };
  #sunset: { value: number; enable: boolean };

  constructor(infoProps: MultiInfoProps) {
    const { clouds, timezone, pressure, sunrise, sunset } = infoProps;

    this.#clouds = clouds;
    this.#timezone = timezone;
    this.#pressure = pressure;
    this.#sunrise = sunrise;
    this.#sunset = sunset;
  }
  get clouds() {
    return this.#clouds;
  }
  get pressure() {
    return this.#pressure;
  }
  get timezone() {
    return this.#timezone;
  }
  get sunrise() {
    return this.#sunrise;
  }
  get sunset() {
    return this.#sunset;
  }

  getPublicProperties() {
    return {
      clouds: this.#clouds,
      timezone: this.#timezone,
      pressure: this.#pressure,
      sunrise: this.#sunrise,
      sunset: this.#sunset
    };
  }

  private createUpdatedValues(property: string): MultiInfoProps {
    switch (property) {
      case "clouds":
        return {
          clouds: { value: this.clouds.value, enable: !this.clouds.enable },
          timezone: { value: this.timezone.value, enable: this.timezone.enable },
          pressure: {
            value: this.pressure.value,
            enable: this.pressure.enable
          },
          sunrise: { value: this.sunrise.value, enable: this.sunrise.enable },
          sunset: { value: this.sunset.value, enable: this.sunset.enable }
        };
      case "timezone":
        return {
          clouds: { value: this.clouds.value, enable: this.clouds.enable },
          timezone: { value: this.timezone.value, enable: !this.timezone.enable },
          pressure: {
            value: this.pressure.value,
            enable: this.pressure.enable
          },
          sunrise: { value: this.sunrise.value, enable: this.sunrise.enable },
          sunset: { value: this.sunset.value, enable: this.sunset.enable }
        };
      case "pressure":
        return {
          clouds: { value: this.clouds.value, enable: this.clouds.enable },
          timezone: { value: this.timezone.value, enable: this.timezone.enable },
          pressure: {
            value: this.pressure.value,
            enable: !this.pressure.enable
          },
          sunrise: { value: this.sunrise.value, enable: this.sunrise.enable },
          sunset: { value: this.sunset.value, enable: this.sunset.enable }
        };
      case "sunrise":
        return {
          clouds: { value: this.clouds.value, enable: this.clouds.enable },
          timezone: { value: this.timezone.value, enable: this.timezone.enable },
          pressure: {
            value: this.pressure.value,
            enable: this.pressure.enable
          },
          sunrise: { value: this.sunrise.value, enable: !this.sunrise.enable },
          sunset: { value: this.sunset.value, enable: this.sunset.enable }
        };
      case "sunset":
        return {
          clouds: { value: this.clouds.value, enable: this.clouds.enable },
          timezone: { value: this.timezone.value, enable: this.timezone.enable },
          pressure: {
            value: this.pressure.value,
            enable: this.pressure.enable
          },
          sunrise: { value: this.sunrise.value, enable: this.sunrise.enable },
          sunset: { value: this.sunset.value, enable: !this.sunset.enable }
        };
      default:
        return {
          clouds: { value: this.clouds.value, enable: this.clouds.enable },
          timezone: { value: this.timezone.value, enable: this.timezone.enable },
          pressure: {
            value: this.pressure.value,
            enable: this.pressure.enable
          },
          sunrise: { value: this.sunrise.value, enable: this.sunrise.enable },
          sunset: { value: this.sunset.value, enable: this.sunset.enable }
        };
    }
  }

  toggleEnable(property: "clouds" | "pressure" | "timezone" | "sunrise" | "sunset") {
    const newInfoProps = this.createUpdatedValues(property);
    const newProps = new MultiInfoModel(newInfoProps);
    return newProps;
  }

  savedPreferences(infoProps: MultiInfoProps) {
    const { clouds, timezone, pressure, sunrise, sunset } = infoProps;
    const newInfoProps = {
      clouds: { value: this.clouds.value, enable: clouds.enable },
      timezone: { value: this.timezone.value, enable: timezone.enable },
      pressure: { value: this.pressure.value, enable: pressure.enable },
      sunrise: { value: this.sunrise.value, enable: sunrise.enable },
      sunset: { value: this.sunset.value, enable: sunset.enable }
    };
    return new MultiInfoModel(newInfoProps);
  }
}
