import sq from "./dictionaries/sq";
import en from "./dictionaries/en";
import type { Locale } from "./config";

const dictionaries = { sq, en };

export const getDictionary = (lang: Locale) => dictionaries[lang];
export type { Dictionary } from "./dictionaries/sq";
