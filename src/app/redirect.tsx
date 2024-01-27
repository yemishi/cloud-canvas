"use server"
import { redirect } from "next/navigation";

export async function navigate(location: string) {
  if (!location) return;
  const formatted = location.toLowerCase().replace("ç", "c");
  const parseToUrl = encodeURIComponent(formatted);
  redirect(`/${parseToUrl}`);
}
