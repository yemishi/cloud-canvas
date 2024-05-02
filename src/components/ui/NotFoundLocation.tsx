"use server";

import LocationForm from "@/components/location/LocationForm";

export default async function NotFoundLocation() {
  return (
    <div className="h-full w-full flex flex-col gap-5 justify-center items-center backdrop-brightness-50">
      <h1 className="font-merriWeather font-bold text-xl text-red-400">
        Location not found
      </h1>
      <LocationForm className="bg-zinc-900" title="Try another place" />
    </div>
  );
}
