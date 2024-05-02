"use client";
import LocationForm from "../components/location/LocationForm";

export default function Home() {
  return (
    <div className="h-full bg-gray-300  bg-opacity-20 flex justify-center text-center items-center w-full ">

        <LocationForm title="Location name" />
    </div>
  );
}
