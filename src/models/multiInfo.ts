import { MultiInfoProps } from "@/types";

export default class MultiInfoModel {
  #properties: {
    clouds: { value: number; enable: boolean };
    pressure: { value: number; enable: boolean };
    timezone: { value: number; enable: boolean };
    sunrise: { value: number; enable: boolean };
    sunset: { value: number; enable: boolean };
  };

  constructor(infoProps: MultiInfoProps) {
    this.#properties = { ...infoProps };
  }
  get clouds() {
    return this.#properties.clouds;
  }
  get pressure() {
    return this.#properties.pressure;
  }
  get timezone() {
    return this.#properties.timezone;
  }
  get sunrise() {
    return this.#properties.sunrise;
  }
  get sunset() {
    return this.#properties.sunset;
  }

  getPublicProperties() {
    return this.#properties
  }

  toggleEnable(property: "clouds" | "pressure" | "timezone" | "sunrise" | "sunset") {
    const updatedProperties = { ...this.#properties };
    updatedProperties[property].enable = !updatedProperties[property].enable;
    return new MultiInfoModel(updatedProperties);
  }
  savePreferences() {
    const preferences = this.getPublicProperties();
    localStorage.setItem("multiInfo", JSON.stringify(preferences));
  }

  static loadPreferences() {
    const savedPreferences = localStorage.getItem("multiInfo");
    if (savedPreferences) {
      const preferences: MultiInfoProps = JSON.parse(savedPreferences);
      return new MultiInfoModel(preferences);
    }
    return null; 
  }

  static arePreferencesSaved() {
    return !!localStorage.getItem("multiInfo");
  }

}
