"use client";

import { IoLocationSharp } from "react-icons/io5";
import { fetchLocation } from "./fetchLocation";
import { useState } from "react";
import LoadingPage from "../ui/Loading";

interface PropsType extends React.HTMLAttributes<HTMLButtonElement> {
  setResponse: React.Dispatch<
    React.SetStateAction<{
      message?: string;
      error?: boolean;
      location?: string;
    }>
  >;
}

export default function GetLocation({
  setResponse,
  children,
  ...props
}: PropsType) {
  const [isLoading, setIsLoading] = useState(false);

  const { className, ...rest } = props;
  const fetchData = async () => {
    setIsLoading(true);
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "denied")
        return (
          setResponse({
            message:
              "Permission to use location denied, please change in settings.",
            error: true
          }),
          setIsLoading(false)
        );
    });

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const response = await fetchLocation(latitude, longitude);
      setResponse(response), setIsLoading(false);
    });
  };
  const defaultBg = className?.includes("bg-")
    ? ""
    : "bg-gray-100 bg-opacity-40 hover:bg-black hover:bg-opacity-20  active:bg-black active:bg-opacity-100";
  return (
    <>
      <button
        {...rest}
        className="flex flex-col gap-1 items-center"
        type="button"
        onClick={fetchData}
      >
        <span
          className={`${className ? className : ""} ${defaultBg} p-2  rounded-full duration-150`}
        >
          <IoLocationSharp className="w-full h-full" />
        </span>
        {children}
      </button>
      {isLoading && <LoadingPage containerClass="fixed top-0 left-0" />}
    </>
  );
}
