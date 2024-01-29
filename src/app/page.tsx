"use client";
import LocationForm from "./features/location/LocationForm";

export default function Home() {
  return (
    <div className="h-full flex justify-center text-center items-center w-full ">
      <div className="bg-black gap-6 flex flex-col bg-opacity-30 p-7 max-w-[280px] rounded-lg ">
        <h1 className="font-montserrat font-bold text-xl">Location name</h1>
        <LocationForm />
      </div>
    </div>
  );
}
