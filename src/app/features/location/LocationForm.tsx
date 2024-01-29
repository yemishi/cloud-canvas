"use client";
import { LoadingPage } from "@/app/pages";
import { navigate } from "@/app/redirect";
import { useState } from "react";

export default function LocationForm() {
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>();

  const getLocation = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const locationName = await getLocationName(latitude, longitude);
      setLocation(locationName);
      setLoading(false);
    });

    const getLocationName = async (
      lat: number,
      lon: number
    ): Promise<string> => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
        );
        const data = await response.json();
        if (data) {
          setError(false);
          return data.address.hamlet;
        } else {
          setError(true);
          return "Unknown location";
        }
      } catch (error) {
        setError(true);
        return "Unknown location";
      }
    };
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(), navigate(location);
      }}
      className="flex flex-col items-center gap-5 justify-between font-poppins h-full"
    >
      {error && (
        <p className="text-red-400 font-merriWeather font-semibold">
          Unknown location
        </p>
      )}
      <input
        type="text"
        name="location"
        value={location}
        className="bg-gray-900 bg-opacity-20 hover:bg-opacity-40 focus:bg-opacity-30 duration-200 hover:bg-black outline-none  self-center p-2 
        rounded-xl border border-gray-700 pl-3"
        onChange={(e) => setLocation(e.target.value)}
      />

      <span className="font-semibold flex flex-col gap-6 items-center">
        <p>or</p>
        <span
          className="py-2 px-5  cursor-pointer bg-gray-900 hover:bg-opacity-30  duration-200 bg-opacity-20  border border-gray-700 rounded-full"
          onClick={getLocation}
        >
          Get by click
        </span>
      </span>
      <button
        type="submit"
        onClick={() => location && setLoading(true)}
        className={`text-lg duration-200 ${location ? "text-green-500" : ""}`}
      >
        See weather
      </button>
      {loading && (
        <div className="absolute h-screen w-screen top-0 left-0">
          <LoadingPage />
        </div>
      )}
    </form>
  );
}
