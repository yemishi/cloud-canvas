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
  title: "Relia cast",
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
      className={`${poppins.variable} ${montserrat.variable} ${anton.variable} ${merriWeather.variable} `}
    >
      <body className="overflow-x-hidden w-full min-h-full bg-gradient-radial from-sky-300 to-sky-600 ">
        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}
