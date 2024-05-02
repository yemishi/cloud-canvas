export default function BubbleIcon({
  title,
  children,
  description
}: {
  title: string;
  children: React.ReactNode;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center font-merriWeather text-sm">
      <span
        className="bg-white text-black border-black bg-opacity-50  w-11 h-11 mb-2 backdrop-blur-md  border p-2
          rounded-full border-white border-opacity-80"
      >
        {children}
      </span>
      <p
        className={
          !description.includes("%")
            ? "after:content-['°c'] relative after:absolute after:text-xs after:font-montserrat"
            : ""
        }
      >
        {description}
      </p>
      <p>{title}</p>
    </div>
  );
}
