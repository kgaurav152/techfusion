import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const capitalize = (string, lower = true) =>
  (lower ? string.toLowerCase() : string).replace(
    /(?:^|\s|["'([{])+\S/g,
    (match) => match.toUpperCase()
  );

export const getBaseUrl = () => {
  let baseUrl;
  if (typeof window !== "undefined") {
    const pathname = window?.location?.href;
    const splitted1 = pathname.split("/")[0];
    const splitted2 = pathname.split("/")[2];
    baseUrl = `${splitted1}//${splitted2}`;
  }
  // const baseUrl = window?.location?.href.split("/")?.slice(0, -1)?.join("/")
  return baseUrl;
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
