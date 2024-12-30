"use client"
import { WeatherInfoType } from "@/types";
import { useEffect, useState } from "react";
import MobViewPage from "./(smallView)/MobViewPage";
import DeskViewPage from "./(largeView)/DeskViewPage";

export default function LocationPage({ weatherInfo }: { weatherInfo: WeatherInfoType }) {
    const [isMobile, setIsMobile] = useState<boolean>(
        (process.env.NODE_ENV === "development" || typeof window === "undefined"
            ? 0
            : window.innerWidth) <= 768
    );

    const handleSizeChange = () => setIsMobile(window.innerWidth <= 768);
    useEffect(() => {
        window.addEventListener("resize", handleSizeChange);
        return () => {
            window.removeEventListener("resize", handleSizeChange);
        };
    }, []);
    return  <MobViewPage {...weatherInfo} />
    return isMobile ? <MobViewPage {...weatherInfo} /> : <DeskViewPage {...weatherInfo} />
}