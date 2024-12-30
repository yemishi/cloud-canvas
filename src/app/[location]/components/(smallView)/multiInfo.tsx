"use client";

import MultiInfoModel from "@/models/multiInfo";
import { MultiInfoProps } from "@/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { FaPencilAlt } from "react-icons/fa";

import { formattedInfo } from "@/utils/formatting";
import DivToggle from "@/components/ui/DivToggle";
import LocationForm from "@/components/location/LocationForm";
import PreferencesPanel from "@/components/ui/PreferencesPanel";

interface PropsType {
  infoProps: MultiInfoProps;
}

export default function MultiInfo({ infoProps }: PropsType) {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [info, setInfo] = useState<MultiInfoModel>(
    new MultiInfoModel(infoProps)
  );

  useEffect(() => {
    const savedInfo = MultiInfoModel.loadPreferences();
    if (savedInfo) {
      setInfo(savedInfo);
    } else {
      setInfo(new MultiInfoModel(infoProps)); 
    }
  }, [infoProps]);

  const publicProperties: MultiInfoProps = info.getPublicProperties();

  return (
    <div className="flex flex-col w-full">
      <motion.div
        className="flex flex-wrap justify-center gap-5 w-full lg:text-2xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
          
        }}
      >
        {publicProperties &&
          Object.entries(publicProperties).map(([title, obj], index) => {
            const { value, enable } = obj;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3}
                }}
                transition={{ duration: 0.4 + index * 0.1, ease: "easeOut" }}
                
                key={title}
                className={`${
                  !enable && "hidden"
                } bg-white text-black cursor-default border-white border border-opacity-50
                 backdrop-blur-sm bg-opacity-50 font-poppins w-[150px] lg:w-[230px] lg:py-7 p-4 rounded-xl`}
              >
                <motion.p
                  className="first-letter:uppercase"
                  animate={{ x: [-2, 2, -2] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {title}
                </motion.p>
                <motion.p
                  className="font-semibold"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {formattedInfo(title, value, info.timezone.value)}
                </motion.p>
              </motion.div>
            );
          })}
      </motion.div>

      <DivToggle
        className="backdrop-blur-sm lg:hidden"
        icon={
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ rotate: 180, scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="p-1 w-full h-full cursor-pointer"
          >
            <FaPencilAlt className="w-full h-full" />
          </motion.span>
        }
        state={openForm}
        setState={setOpenForm}
      >
        <LocationForm
          onClick={(e) => e.stopPropagation()}
          className="bg-zinc-800 text-white"
          title="Choose a location"
        />
      </DivToggle>

      <PreferencesPanel
        state={info}
        publicProperties={publicProperties}
        setState={setInfo}
      />
    </div>
  );
}
