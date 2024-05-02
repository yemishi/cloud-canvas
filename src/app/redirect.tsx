"use server";
import { redirect } from "next/navigation";

export async function navigate(location: string) {
  if (!location) return;
  const parseToUrl = encodeURI(location);
  redirect(`/${parseToUrl}`);
}
