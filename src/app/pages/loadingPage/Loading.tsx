"use client"
export default function LoadingPage() {

  return (
    <div className="backdrop-brightness-50 w-full h-full flex justify-center items-center ">
      <span className="rounded-full relative w-52">
        <img
          src={`./icons/02d.svg`}
          className="animate-bounce"
          alt="sun icon"
        />
        <p className="absolute bottom-4 left-2/4 font-bold font-montserrat text-xl -translate-x-2/4">
          Loading...
        </p>
      </span>
    </div>
  );
}
