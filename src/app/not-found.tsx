import Link from "next/link";
export default function NotFound() {
  return (
    <div className="w-full h-full flex justify-center items-center backdrop-brightness-50">
      <div className="self-center flex flex-col gap-9 p-8 text-center items-center">
        <span className=" font-semibold font-montserrat text-2xl gap-5 flex flex-col text-red-400">
          <h1 className="text-7xl font-merriWeather text-red-500">404</h1>
          <h2 className="">
            The weather information for this spot is a bit under the weather.
            Search for a different location!
          </h2>
        </span>
        <Link
          className="font-lato text-lg bg-white py-3 px-5 bg-opacity-35 font-bold rounded-lg"
          href={"/"}
        >
          Difference location
        </Link>
      </div>
    </div>
  );
}
