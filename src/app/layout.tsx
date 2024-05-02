import type { Metadata } from "next";
import { Montserrat, Anton, Merriweather, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "700", "600", "800"],
  subsets: ["latin"],
  variable: "--font-poppins"
});

const montserrat = Montserrat({
  weight: ["300", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-montserrat"
});
const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-anton"
});
const merriWeather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriWeather"
});

export const metadata: Metadata = {
  title: "Cloud canvas",
  description: "check the current weather",
  icons: "./icons/02d.svg"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full w-full overflow-hidden ${poppins.variable} ${montserrat.variable} ${anton.variable} ${merriWeather.variable} `}
    >
      <body
        className={`overflow-x-hidden bg-no-repeat bg-cover bg-[url(/backgrounds/homeBg.jpg)]`}
      >
        {children}
      </body>
    </html>
  );
}
