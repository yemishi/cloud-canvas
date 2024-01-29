"use client";
import { LoadingPage } from "@/app/pages";
import { navigate } from "@/app/redirect";
import { useState } from "react";
import { getLocationName } from "./actions";

export default function LocationForm() {
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getLocation = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "denied") {
        setError(
          "Permission to use location denied, please change in settings."
        );
        return setLoading(false);
      }
    });

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const locationName = await getLocationName(latitude, longitude, setError);
      setLocation(locationName);
      setLoading(false);
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(), navigate(location);
      }}
      className="flex flex-col items-center gap-5 justify-between font-poppins h-full"
    >
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
        {error && (
          <p className="text-red-400 font-merriWeather font-semibold">
            {error}
          </p>
        )}
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
        <div className="absolute h-full w-full top-0  left-0">
          <LoadingPage />
        </div>
      )}
    </form>
  );
}
