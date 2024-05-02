"use client";

import { useEffect } from "react";

interface DivProps extends React.HTMLAttributes<HTMLImageElement> {
  containerClass?: string;
}
export default function LoadingPage({ containerClass, ...props }: DivProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const { className, ...rest } = props;
  const bgDefaultC =
    className?.includes("bg-") || className?.includes("backdrop-")
      ? ""
      : "backdrop-brightness-50 backdrop-blur-sm";
  const defaultSizeC =
    className?.includes("w-") || className?.includes("h-")
      ? ""
      : "w-full h-full";

  const defaultSize =
    className?.includes("w-") ||
    className?.includes("h-") ||
    className?.includes("size-")
      ? ""
      : "size-36";
  return (
    <div
      className={`${containerClass ? containerClass : ""} ${bgDefaultC} ${defaultSizeC} flex  justify-center items-center z-40`}
    >
      <span className="flex flex-col items-center rounded-full">
        <img
          {...rest}
          src={`./icons/02d.svg`}
          className={`${className ? className : ""} ${defaultSize} animate-bounce size-36`}
          alt="sun icon"
        />
      </span>
    </div>
  );
}
