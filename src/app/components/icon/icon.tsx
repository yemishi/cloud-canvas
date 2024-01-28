
export default function Icon({
  children,
  title,
  description
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-1 items-center font-lato text-sm">
      <span className="w-8 fill-white"> {children}</span>
      <span className="flex flex-col">
        <p className="text-gray-300">{title}</p>
        <p >{description}</p>
      </span>
    </div>
  );
}
