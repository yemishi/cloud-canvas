"use client";
import DivToggle from "@/components/ui/DivToggle";
import MultiInfoModel from "@/models/multiInfo";
import { MultiInfoProps } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

type PropsType = {
  publicProperties: MultiInfoProps;
  setState: React.Dispatch<React.SetStateAction<MultiInfoModel>>;
  state: MultiInfoModel;
};

export default function PreferencesPanel({
  publicProperties,
  setState,
  state
}: PropsType) {
  const [open, setOpen] = useState<boolean>(false);
  const updatePreferences = () => {
    localStorage.setItem("multiInfo", JSON.stringify(publicProperties));
    setOpen(!open);
  };

  return (
    <DivToggle
      className="self-end"
      lgStatic
      onChange={() => updatePreferences()}
      position="right"
      icon={
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-1 cursor-pointer w-full h-full hover:rotate-180 duration-200 "
        >
          <IoSettingsOutline className="w-full h-full" />
        </motion.span>
      }
      setState={setOpen}
      state={open}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-200 shadow-md shadow-black text-black font-poppins font-medium flex flex-col gap-6 rounded-lg p-8 lg:text-xl lg:px-11"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {Object.entries(publicProperties).map(([title, obj]) => {
          const { enable } = obj;
          const toggle = () => {
            setState(
              state.toggleEnable(
                title as
                | "clouds"
                | "pressure"
                | "timezone"
                | "sunrise"
                | "sunset"
              )
            )
            state.savePreferences()
          }

          return (
            <div key={title} className="flex gap-8 items-center">
              <p className="first-letter:uppercase">{title}</p>
              <span
                onClick={toggle}
                className={`border w-16 h-9 rounded-full ml-auto  cursor-pointer relative duration-300 after:duration-300 after:absolute 
                after:h-6 after:top-1/2 after:-translate-y-1/2 after:bg-gray-200
                  after:w-6 after:ml-1 after:rounded-full ${enable
                    ? "bg-[#f1aa14] after:left-0"
                    : "bg-gray-400 after:left-[calc(4rem_-_1.75rem_-_4px)]"
                  }`}
              />
            </div>
          );
        })}
      </motion.div>
    </DivToggle>
  );
}
