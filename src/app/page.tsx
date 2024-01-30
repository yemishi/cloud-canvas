"use client";
import LocationForm from "./features/location/LocationForm";
import Head from "next/head";
export default function Home() {
  return (
    <div className="h-full flex justify-center text-center items-center w-full ">
      <Head>
        <link rel="icon" type="image/svg+xml" href="./public//allinLogo.svg" />
        <meta
          name="description"
          content="compre os melhores suplementos das melhores marcas da atualidade"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Allinsuplementos|suplementos em geral</title>
      </Head>
      <div className="bg-black gap-6 flex flex-col bg-opacity-30 p-7 rounded-lg ">
        <h1 className="font-montserrat font-bold text-xl">Location name</h1>
        <LocationForm />
      </div>
    </div>
  );
}
