"use server";
import { LocationForm } from "@/app/features";

export default async function NotFoundLocation() {
  return (
    <div className="h-full w-full flex flex-col gap-5 justify-center items-center backdrop-brightness-50">
      <h1 className="font-merriWeather font-bold text-xl text-red-400">
        Location not found
      </h1>
      <div className="bg-gray-300 bg-opacity-50 flex flex-col items-center p-7 rounded-lg text-center gap-7">
        <p className="font-montserrat font-bold text-xl">Try another</p>
        <LocationForm />
      </div>
    </div>
  );
}
