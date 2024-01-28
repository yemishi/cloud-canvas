
export default function Icon({
  children,
  title,
  description
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  console.log(  children,
    title,
    description)
  return (
    <div className="flex gap-1 items-center font-lato text-sm">
  server test
    </div>
  );
}
