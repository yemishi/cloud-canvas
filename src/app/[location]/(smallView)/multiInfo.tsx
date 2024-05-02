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
    const savePreferences = localStorage.getItem("multiInfo");

    if (savePreferences && JSON.parse(savePreferences)) {
      const preferences = JSON.parse(savePreferences);
      const keysCheck = "clouds hPa pressure sunrise sunset timezone";

      const keys = Object.keys(preferences);
      const check = keys.map((e) => {
        if (keysCheck.includes(e)) return true;
      });
      if (check.filter((e) => e === undefined).length > 0) return;
      setInfo(info.savedPreferences(preferences));
    }
  }, []);

  if (!info) return <div>error</div>;

  const publicProperties: MultiInfoProps = info.getPublicProperties();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap justify-center gap-5 w-full lg:text-2xl">
        {publicProperties &&
          Object.entries(publicProperties).map(([title, obj], index) => {
            const { value, enable } = obj;
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: `0.${index + 5}` }}
                key={title}
                className={`${
                  !enable && "hidden"
                } bg-white text-black border-white border border-opacity-50
                 backdrop-blur-sm bg-opacity-50 font-poppins w-[150px] lg:w-[230px] lg:py-7 p-4 rounded-xl`}
              >
                <p className="first-letter:uppercase">{title}</p>
                <p className="font-semibold">
                  {formattedInfo(title, value, info.timezone.value)}
                </p>
              </motion.div>
            );
          })}
      </div>

      <DivToggle
        className="backdrop-blur-sm lg:hidden"
        icon={
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-1 w-full h-full cursor-pointer hover:rotate-180 duration-200"
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
