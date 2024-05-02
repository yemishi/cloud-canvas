"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GetLocation from "./getLocation";

interface PropsType extends React.HTMLAttributes<HTMLFormElement> {
  title?: string;
}

export default function LocationForm({ title, ...props }: PropsType) {
  const { className, ...rest } = props;
  const defaultBg =
    className?.includes("backdrop-") || className?.includes("bg-")
      ? ""
      : "bg-black bg-opacity-60 shadow-lg shadow-zinc-900 ";
  const [{ error, location, message }, setResponse] = useState<{
    error?: boolean;
    message?: string;
    location?: string;
  }>({ error: false, location: "", message: "" });
  const { push } = useRouter();
  return (
    <form
      {...rest}
      onSubmit={(e) => {
        e.preventDefault(), push(encodeURI(String(location)));
      }}
      className={`${className ? className : ""} ${defaultBg} flex flex-col items-center font-poppins gap-6 p-9 lg:w-[550px] lg:gap-10 rounded-lg lg:text-xl `}
    >
      {title && (
        <span className="font-montserrat font-bold text-xl lg:text-2xl">
          {title}
        </span>
      )}
      <input
        type="text"
        name="location"
        placeholder="Somewhere"
        value={location}
        className="bg-gray-100 placeholder:text-white placeholder:text-opacity-50 bg-opacity-20 hover:bg-opacity-40 focus:bg-opacity-30 lg:w-80 
        duration-200 hover:bg-black outline-none self-center p-2 rounded-xl border border-gray-400 pl-3 w-56"
        onChange={(e) =>
          setResponse({ error: false, message: "", location: e.target.value })
        }
      />

      {error && (
        <span className="text-red-400 font-merriWeather font-semibold">
          {message}
        </span>
      )}
      <div className="flex flex-col gap-4 items-center">
        <span>or</span>
        <GetLocation setResponse={setResponse} />
      </div>
      <button
        type="submit"
        className={`text-lg duration-200 ${location ? "underline underline-offset-4" : "pointer-events-none opacity-50"}`}
      >
        See weather
      </button>
    </form>
  );
}
