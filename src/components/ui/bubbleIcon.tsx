import { motion } from "framer-motion";

export default function BubbleIcon({
  title,
  children,
  description,
}: {
  title: string;
  children: React.ReactNode;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center font-merriWeather text-sm">
      <motion.span
        className="bg-white text-black bg-opacity-50 w-11 h-11 mb-2 backdrop-blur-md border p-2 rounded-full border-white border-opacity-80"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.3 },
        }}
        animate={{ scale: [1,1.05, 1] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.span>
      <motion.p
        className={`${
          !description.includes("%")
            ? "after:content-['°c'] relative after:absolute after:text-xs after:font-montserrat"
            : ""
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
      >
        {description}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1, ease: "easeInOut" }}
      >
        {title}
      </motion.p>
    </div>
  );
}
