
export default function BubbleIcon({
  children,
  description,
  title
}: {
  children: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center font-merriWeather text-sm">
      <span className="w-11 h-11 mb-2 backdrop-blur-md border-2 p-2 backdrop-brightness-150 rounded-full border-white border-opacity-80">
        {children}
      </span>
      <p className={!description.includes("%") ? "after:content-['°c'] relative after:absolute after:text-xs after:font-montserrat":""}> {description}</p>
      <p >{title}</p>
    </div>
  );
}
