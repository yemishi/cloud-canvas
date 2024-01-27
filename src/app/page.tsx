"use client";

import LocationForm from "./components/location/LocationForm";

export default function Home() {
  return (
    <div className="h-full flex justify-center font-lato text-center items-center w-full bg-gradient-radial from-sky-300 to-sky-800 ">
      <div className="bg-black p-5 gap-9 flex flex-col bg-opacity-30 h-80 min-w-72 ">
        <span className=" font-bold text-xl">
          <p className="font-montserrat">Location name</p>
        </span>
        <LocationForm />
      </div>
    </div>
  );
}
